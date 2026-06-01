# EXPLICATION COMPLETE DE TOUS LES FICHIERS DU PROJET
## Projet Fil Rouge : Portfolio React + Express | Groupe 5

---

# TABLE DES MATIERES

1. [Jenkinsfile](#1-jenkinsfile)
2. [Dockerfile Frontend (React)](#2-dockerfile-frontend-react)
3. [Dockerfile Backend (Express)](#3-dockerfile-backend-express)
4. [Dockerfile Jenkins](#4-dockerfile-jenkins)
5. [docker-compose.yml (App principale)](#5-composeyaml-application-principale)
6. [docker-compose.jenkins.yml](#6-docker-composejenkins)
7. [docker-compose.sonarqube.yml](#7-docker-composesonarqube)
8. [nginx.conf (Reverse Proxy)](#8-nginxconf-reverse-proxy)
9. [vite.config.js (Config Frontend)](#9-viteconfigjs)
10. [app.js (Serveur Backend)](#10-appjs-serveur-backend)
11. [Routes Backend (projectRoutes.js)](#11-routes-backend)
12. [App.jsx (Frontend React)](#12-appjsx-frontend-react)
13. [sonar-project.properties](#13-sonar-projectproperties)
14. [Schema Global d'Architecture](#14-schema-global-darchitecture)

---

# 1. JENKINSFILE

Le Jenkinsfile definit le **pipeline CI/CD** — c'est la recette automatisee qui se lance a chaque push Git.

```groovy
pipeline {
    // ══════════════════════════════════════════════════════════════════
    // "agent any" = Jenkins peut executer ce pipeline sur n'importe quel
    // noeud (machine) disponible. Dans notre cas, on n'a qu'un seul noeud
    // (le conteneur Jenkins lui-meme).
    // ══════════════════════════════════════════════════════════════════
    agent any

    environment {
        // ══════════════════════════════════════════════════════════════
        // Variables d'environnement accessibles dans tout le pipeline.
        // Elles evitent de repeter les chemins partout.
        // ══════════════════════════════════════════════════════════════
        FRONTEND_DIR = 'REACTPORTFOLIO/reactportfolio'    // Chemin vers le code React
        BACKEND_DIR = 'REACTPORTFOLIO/EXPRESSJS PORTFOLIO' // Chemin vers le code Express
        EMAIL_RECIPIENTS = 'amethsl2218@gmail.com'         // Email pour les notifications
        SONAR_HOST_URL = 'http://sonarqube:9000'           // URL de SonarQube (nom DNS Docker)
        SONAR_PROJECT_KEY = 'portfolio-react-express'       // Identifiant du projet dans SonarQube
    }

    triggers {
        // ══════════════════════════════════════════════════════════════
        // githubPush() = le pipeline se declenche automatiquement quand
        // un push est detecte sur le depot GitHub. C'est le webhook GitHub
        // qui notifie Jenkins.
        // ══════════════════════════════════════════════════════════════
        githubPush()
    }

    stages {

        // ── STAGE 1 : CHECKOUT ──────────────────────────────────────
        // Recupere le code source depuis le depot Git configure dans Jenkins.
        // "checkout scm" utilise la config du job (URL du repo, branche, credentials).
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ── STAGE 2 : INSTALL DEPENDENCIES ──────────────────────────
        // Installe les paquets npm pour le frontend ET le backend.
        // "parallel" = les deux s'executent EN MEME TEMPS pour gagner du temps.
        stage('Install Dependencies') {
            parallel {
                stage('Frontend Dependencies') {
                    steps {
                        dir("${env.FRONTEND_DIR}") {
                            // dir() = se deplacer dans ce dossier
                            // npm install = lire package.json et telecharger les paquets
                            sh 'npm install'
                        }
                    }
                }
                stage('Backend Dependencies') {
                    steps {
                        dir("${env.BACKEND_DIR}") {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        // ── STAGE 3 : TESTS ─────────────────────────────────────────
        // Lance les tests unitaires du backend.
        // --coverage = genere un rapport de couverture (utile pour SonarQube).
        // MONGO_URI pointe vers le conteneur mongo-test (voir docker-compose.jenkins.yml).
        stage('Tests') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    sh 'MONGO_URI=mongodb://mongo-test:27017/portfolio-test npm test -- --coverage'
                }
            }
        }

        // ── STAGE 4 : BUILD FRONTEND ────────────────────────────────
        // Compile le code React (JSX) en fichiers HTML/CSS/JS statiques
        // optimises pour la production. Le resultat va dans /dist.
        stage('Build Frontend') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        // ── STAGE 5 : SONARQUBE ANALYSIS ────────────────────────────
        // Analyse statique du code : bugs, vulnerabilites, code smells.
        // On lance le sonar-scanner via Docker (pas besoin de l'installer).
        // withCredentials = injecte le token de maniere securisee (pas visible dans les logs).
        stage('SonarQube Analysis') {
            steps {
                dir('REACTPORTFOLIO') {
                    withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                        sh '''
                            docker run --rm \
                              --network sonarqube-net \
                              -v "$(pwd):/usr/src" \
                              -w /usr/src \
                              sonarsource/sonar-scanner-cli \
                              -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                              -Dsonar.sources=reactportfolio/src,"EXPRESSJS PORTFOLIO/src","EXPRESSJS PORTFOLIO/app.js" \
                              -Dsonar.exclusions="**/node_modules/**,**/dist/**" \
                              -Dsonar.javascript.lcov.reportPaths="EXPRESSJS PORTFOLIO/coverage/lcov.info" \
                              -Dsonar.host.url=${SONAR_HOST_URL} \
                              -Dsonar.token=${SONAR_TOKEN}
                        '''
                        // --rm = supprimer le conteneur apres execution
                        // --network sonarqube-net = se connecter au reseau de SonarQube
                        // -v = monter le code local dans le conteneur du scanner
                        // -w = repertoire de travail dans le conteneur
                        // -Dsonar.* = parametres passes au scanner
                    }
                }
            }
        }

        // ── STAGE 6 : QUALITY GATE ──────────────────────────────────
        // Verifie si le code respecte les criteres qualite definis dans SonarQube.
        // Si le Quality Gate echoue (status != "OK"), le pipeline s'arrete.
        // → Pas de build Docker, pas de deploiement.
        stage('Quality Gate') {
            steps {
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    sh '''
                        sleep 30  # Attendre que SonarQube traite l'analyse

                        # Appel API pour recuperer le statut du Quality Gate
                        QUALITY_GATE_STATUS=$(curl -s -u ${SONAR_TOKEN}: \
                          "${SONAR_HOST_URL}/api/qualitygates/project_status?projectKey=${SONAR_PROJECT_KEY}" \
                          | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4)

                        # Si le statut n'est pas "OK" → echec
                        if [ "${QUALITY_GATE_STATUS}" != "OK" ]; then
                            exit 1  # Arrete le pipeline avec un code d'erreur
                        fi
                    '''
                }
            }
        }

        // ── STAGE 7 : DOCKER BUILD ──────────────────────────────────
        // Construit les images Docker pour le frontend et le backend.
        // Ces images contiennent tout le necessaire pour executer l'app.
        stage('Docker Build') {
            steps {
                dir('REACTPORTFOLIO') {
                    sh 'docker build -t portfolio-frontend ./reactportfolio'
                    // -t = nom (tag) de l'image
                    // ./reactportfolio = contexte (dossier contenant le Dockerfile)

                    sh 'docker build -t portfolio-backend "./EXPRESSJS PORTFOLIO"'
                }
            }
        }

        // ── STAGE 8 : DEPLOY ────────────────────────────────────────
        // Deploie l'application en lancant les conteneurs.
        // 1. Arrete les anciens conteneurs (|| true = ne pas echouer s'ils n'existent pas)
        // 2. Cree le reseau Docker (permet aux conteneurs de communiquer par nom)
        // 3. Lance MongoDB, puis le backend, puis le frontend
        stage('Deploy') {
            steps {
                sh '''
                    docker stop portfolio-frontend portfolio-backend portfolio-mongo || true
                    docker rm portfolio-frontend portfolio-backend portfolio-mongo || true
                    docker network create portfolio-net || true

                    # MongoDB : base de donnees
                    docker run -d --name portfolio-mongo \
                      --network portfolio-net --network-alias mongo \
                      mongo:4.4
                    sleep 5

                    # Backend : API Express sur le port 5000
                    docker run -d --name portfolio-backend \
                      --network portfolio-net --network-alias backend \
                      -p 5000:5000 \
                      -e PORT=5000 \
                      -e MONGO_URI=mongodb://mongo:27017/portfolio \
                      -e USE_MEMORY_DB=false \
                      portfolio-backend
                    sleep 3

                    # Frontend : Nginx servant le React sur le port 3000 (externe) → 80 (interne)
                    docker run -d --name portfolio-frontend \
                      --network portfolio-net --network-alias frontend \
                      -p 3000:80 \
                      portfolio-frontend
                '''
            }
        }

        // ── STAGE 9 : HEALTH CHECK ──────────────────────────────────
        // Verifie que les services repondent correctement apres le deploiement.
        stage('Health Check') {
            steps {
                sh '''
                    sleep 10
                    # Verifie que Nginx repond (frontend)
                    docker exec portfolio-frontend wget -qO- http://127.0.0.1:80 > /dev/null || exit 1

                    # Verifie que Express repond (backend)
                    docker exec portfolio-backend node -e \
                      "fetch('http://127.0.0.1:5000/api/projects').then(r=>{if(!r.ok)process.exit(1);process.exit(0)}).catch(()=>process.exit(1))"
                '''
            }
        }
    }

    // ══════════════════════════════════════════════════════════════════
    // POST : Actions executees APRES tous les stages, selon le resultat.
    // ══════════════════════════════════════════════════════════════════
    post {
        success {
            // Pipeline reussi → envoyer email de succes
            mail to: "${env.EMAIL_RECIPIENTS}",
                 subject: "Jenkins - Build REUSSI - ${env.JOB_NAME}",
                 body: "Le pipeline s'est termine avec succes. SonarQube: ${env.SONAR_HOST_URL}"
        }
        failure {
            // Pipeline echoue → nettoyer les conteneurs + email d'echec
            sh 'docker stop portfolio-frontend portfolio-backend portfolio-mongo || true'
            sh 'docker rm portfolio-frontend portfolio-backend portfolio-mongo || true'
            mail to: "${env.EMAIL_RECIPIENTS}",
                 subject: "Jenkins - Build ECHOUE - ${env.JOB_NAME}",
                 body: "Le pipeline a echoue. Consultez les logs Jenkins."
        }
        always {
            // Toujours nettoyer le workspace Jenkins (liberer l'espace disque)
            cleanWs()
        }
    }
}
```

---

# 2. DOCKERFILE FRONTEND (React)

Fichier : `reactportfolio/Dockerfile`

```dockerfile
# ══════════════════════════════════════════════════════════════════
# ETAPE 1 : BUILD (Multi-stage build)
# On utilise une image Node.js pour compiler le code React.
# "AS build" donne un nom a cette etape pour la referencer plus tard.
# alpine = version ultra-legere de Linux (~5 Mo).
# ══════════════════════════════════════════════════════════════════
FROM node:20-alpine AS build

# Definit le repertoire de travail DANS le conteneur.
# Toutes les commandes suivantes s'executeront depuis /app.
WORKDIR /app

# Copie UNIQUEMENT package.json et package-lock.json d'abord.
# Pourquoi ? Docker met en cache cette couche. Si ces fichiers ne changent pas,
# le "npm ci" suivant est skippe (gain de temps enorme).
COPY package.json package-lock.json ./

# npm ci = installe les dependances EXACTES du lock file (plus fiable que npm install).
RUN npm ci

# Copie le reste du code source.
COPY index.html vite.config.js styles.css ./
COPY src/ ./src/
COPY assets/ ./assets/

# Compile le React en fichiers statiques optimises → /app/dist/
RUN npm run build

# ══════════════════════════════════════════════════════════════════
# ETAPE 2 : PRODUCTION
# On utilise Nginx (serveur web ultra-leger) pour servir les fichiers.
# L'image finale ne contient PAS Node.js, pas de node_modules,
# juste Nginx + les fichiers HTML/CSS/JS compiles → image tres petite (~30 Mo).
# ══════════════════════════════════════════════════════════════════
FROM nginx:alpine

# Copie les fichiers compiles depuis l'etape "build" vers le dossier de Nginx.
COPY --from=build /app/dist /usr/share/nginx/html

# Copie notre configuration Nginx personnalisee (voir section nginx.conf).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Documente que le conteneur ecoute sur le port 80.
# (C'est informatif, ne fait rien techniquement, mais c'est une bonne pratique.)
EXPOSE 80

# Commande lancee au demarrage du conteneur.
# "daemon off" = Nginx reste au premier plan (obligatoire dans Docker).
CMD ["nginx", "-g", "daemon off;"]
```

**Resume du flux :**
```
Code React (JSX) → npm run build → fichiers statiques (dist/) → Nginx les sert sur le port 80
```

---

# 3. DOCKERFILE BACKEND (Express)

Fichier : `EXPRESSJS PORTFOLIO/Dockerfile`

```dockerfile
# ══════════════════════════════════════════════════════════════════
# Image de base : Node.js 20 version "slim" (plus legere que la full,
# mais a les outils necessaires contrairement a "alpine" qui peut poser
# des problemes avec certains paquets npm natifs).
# ══════════════════════════════════════════════════════════════════
FROM node:20-slim

# Repertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers de dependances d'abord (cache Docker)
COPY package.json package-lock.json ./

# Installe les dependances (ci = clean install, utilise le lock file)
RUN npm ci

# Copie le code de l'application
COPY app.js ./          # Fichier principal du serveur
COPY src/ ./src/        # Dossier avec les routes et modeles

# Cree le dossier uploads (pour les images uploadees via multer)
RUN mkdir -p uploads

# Variables d'environnement par defaut :
# USE_MEMORY_DB=true → utilise une base MongoDB en memoire (pour dev/test)
# PORT=5000 → le serveur Express ecoute sur le port 5000
ENV USE_MEMORY_DB=true
ENV PORT=5000

# Documente le port expose
EXPOSE 5000

# Commande de demarrage : lance le serveur Node.js
CMD ["node", "app.js"]
```

**Resume :**
```
Code Express (app.js + routes) → Node.js → API REST sur le port 5000
```

---

# 4. DOCKERFILE JENKINS

Fichier : `Dockerfile.jenkins`

```dockerfile
# ══════════════════════════════════════════════════════════════════
# Image de base : Jenkins LTS (Long Term Support) = version stable.
# Inclut Jenkins + Java (Jenkins est ecrit en Java).
# ══════════════════════════════════════════════════════════════════
FROM jenkins/jenkins:lts

# Passe en utilisateur root pour pouvoir installer des paquets.
USER root

# ══════════════════════════════════════════════════════════════════
# Installe Node.js 20 dans Jenkins.
# Pourquoi ? Jenkins doit pouvoir executer "npm install" et "npm run build"
# pendant le pipeline. Sans Node.js, les stages frontend/backend echoueraient.
# ══════════════════════════════════════════════════════════════════
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# ══════════════════════════════════════════════════════════════════
# Installe le Docker CLI dans Jenkins.
# Pourquoi ? Jenkins doit pouvoir executer "docker build" et "docker run"
# pendant le pipeline. Il utilise le Docker du HOST via le socket monte
# (voir docker-compose.jenkins.yml : /var/run/docker.sock).
# ══════════════════════════════════════════════════════════════════
RUN apt-get install -y docker.io

# Autorise Git a fonctionner dans tous les repertoires.
# Necessaire car Jenkins clone le repo en tant que root.
RUN git config --global --add safe.directory '*'
```

**Resume :**
```
Jenkins (Java) + Node.js 20 (pour npm) + Docker CLI (pour build/deploy)
```

---

# 5. COMPOSE.YAML (Application Principale)

Fichier : `compose.yaml` — Lance toute l'application en une commande.

```yaml
services:

  # ══════════════════════════════════════════════════════════════════
  # FRONTEND : Application React servie par Nginx
  # ══════════════════════════════════════════════════════════════════
  frontend:
    build: ./reactportfolio          # Construit l'image depuis le Dockerfile dans ce dossier
    container_name: portfolio-frontend  # Nom fixe du conteneur (pour le referencer facilement)
    ports:
      - "3000:80"                    # Port 3000 sur ta machine → Port 80 dans le conteneur
                                     # Tu accedes au site via http://localhost:3000
    depends_on:
      - backend                      # Attend que le backend soit lance d'abord
    networks:
      - portfolio-net                # Connecte au reseau interne (pour communiquer avec backend)

  # ══════════════════════════════════════════════════════════════════
  # BACKEND : API Express.js
  # ══════════════════════════════════════════════════════════════════
  backend:
    build: "./EXPRESSJS PORTFOLIO"   # Construit depuis le Dockerfile du backend
    container_name: portfolio-backend
    ports:
      - "5000:5000"                  # Port 5000 → Port 5000
                                     # API accessible via http://localhost:5000/api/projects
    environment:
      - PORT=5000                    # Port interne du serveur Express
      - USE_MEMORY_DB=false          # false = utilise le vrai MongoDB (pas en memoire)
      - MONGO_URI=mongodb://mongo:27017/portfolio
        # ↑ Connexion MongoDB :
        # "mongo" = nom DNS du service MongoDB (Docker le resout automatiquement)
        # "27017" = port par defaut de MongoDB
        # "/portfolio" = nom de la base de donnees
    depends_on:
      - mongo                        # Attend que MongoDB soit pret
    networks:
      - portfolio-net

  # ══════════════════════════════════════════════════════════════════
  # MONGO : Base de donnees MongoDB
  # ══════════════════════════════════════════════════════════════════
  mongo:
    image: mongo:7                   # Image officielle MongoDB version 7
    container_name: portfolio-mongo
    ports:
      - "27017:27017"                # Expose le port pour debug (MongoDB Compass)
    volumes:
      - mongo-data:/data/db          # Volume nomme : les donnees persistent meme si
                                     # le conteneur est supprime et recree.
                                     # /data/db = dossier ou MongoDB stocke ses fichiers.
    networks:
      - portfolio-net

# ══════════════════════════════════════════════════════════════════
# VOLUMES : Stockage persistant (survit aux redemarrages)
# ══════════════════════════════════════════════════════════════════
volumes:
  mongo-data:                        # Docker gere l'emplacement reel sur le disque

# ══════════════════════════════════════════════════════════════════
# NETWORKS : Reseau virtuel prive pour les conteneurs
# Les conteneurs sur le meme reseau peuvent se parler par leur nom :
# - "mongo" → conteneur MongoDB
# - "portfolio-backend" → conteneur Express
# - "portfolio-frontend" → conteneur Nginx
# ══════════════════════════════════════════════════════════════════
networks:
  portfolio-net:
```

**Schema des ports :**
```
TON NAVIGATEUR
     │
     ├── http://localhost:3000 ──→ [Nginx :80] ──→ sert les fichiers React
     │                                    │
     │                                    ├── /api/* ──→ [Express :5000] (proxy)
     │                                    └── /uploads/* ──→ [Express :5000] (proxy)
     │
     └── http://localhost:5000 ──→ [Express :5000] ──→ [MongoDB :27017]
```

---

# 6. DOCKER-COMPOSE.JENKINS

Fichier : `docker-compose.jenkins.yml` — Infrastructure CI/CD.

```yaml
services:

  # ══════════════════════════════════════════════════════════════════
  # JENKINS : Serveur d'integration continue
  # ══════════════════════════════════════════════════════════════════
  jenkins:
    build:
      context: .                     # Contexte de build = dossier courant
      dockerfile: Dockerfile.jenkins # Utilise notre Dockerfile personnalise
    container_name: jenkins-server
    ports:
      - "8080:8080"                  # Interface web Jenkins → http://localhost:8080
      - "50000:50000"                # Port pour les agents Jenkins distants (JNLP)
                                     # (non utilise ici mais necessaire si on ajoute des workers)
    user: root                       # Root pour pouvoir utiliser Docker
    volumes:
      - jenkins_home:/var/jenkins_home  
        # ↑ Persiste TOUT Jenkins : jobs, plugins, configuration, historique.
        # Sans ce volume, tout serait perdu a chaque redemarrage.

      - /var/run/docker.sock:/var/run/docker.sock
        # ↑ CRUCIAL : Monte le socket Docker du HOST dans Jenkins.
        # Permet a Jenkins d'executer des commandes Docker (build, run)
        # en utilisant le Docker Engine de ta machine.
        # C'est la technique "Docker-in-Docker" (DinD) simplifiee.
    environment:
      - JAVA_OPTS=-Djenkins.install.runSetupWizard=true
        # ↑ Active l'assistant de configuration au premier lancement
        # (creation du compte admin, installation des plugins).
    restart: unless-stopped          # Redemarre automatiquement sauf si arrete manuellement

  # ══════════════════════════════════════════════════════════════════
  # MONGO-TEST : MongoDB pour les tests unitaires
  # ══════════════════════════════════════════════════════════════════
  mongo-test:
    image: mongo:4.4                 # Version 4.4 pour compatibilite avec les tests
    container_name: mongo-test
    restart: unless-stopped
    # Pas de "ports:" → accessible uniquement depuis le reseau Docker interne
    # Pas de "volumes:" → donnees temporaires (normal pour les tests)

volumes:
  jenkins_home:                      # Stockage persistant de Jenkins
```

**Acces :**
```
http://localhost:8080 → Interface Jenkins (pipelines, jobs, configuration)
```

---

# 7. DOCKER-COMPOSE.SONARQUBE

Fichier : `sonarqube/docker-compose.sonarqube.yml` — Analyse de code.

```yaml
services:

  # ══════════════════════════════════════════════════════════════════
  # SONARQUBE : Plateforme d'analyse de qualite du code
  # Detecte bugs, vulnerabilites, code smells, mesure la couverture.
  # ══════════════════════════════════════════════════════════════════
  sonarqube:
    image: sonarqube:community       # Edition gratuite (Community)
    container_name: sonarqube
    depends_on:
      - sonarqube-db                 # Attend que PostgreSQL soit pret
    ports:
      - "9000:9000"                  # Interface web → http://localhost:9000
    environment:
      - SONAR_JDBC_URL=jdbc:postgresql://sonarqube-db:5432/sonarqube
        # ↑ URL de connexion a la base PostgreSQL :
        # "sonarqube-db" = nom DNS du conteneur PostgreSQL
        # "5432" = port par defaut de PostgreSQL
        # "/sonarqube" = nom de la base de donnees
      - SONAR_JDBC_USERNAME=sonar    # Utilisateur PostgreSQL
      - SONAR_JDBC_PASSWORD=sonar    # Mot de passe PostgreSQL
    volumes:
      - sonarqube_data:/opt/sonarqube/data           # Donnees de SonarQube
      - sonarqube_extensions:/opt/sonarqube/extensions # Plugins installes
      - sonarqube_logs:/opt/sonarqube/logs            # Logs
    networks:
      - sonarqube-net

  # ══════════════════════════════════════════════════════════════════
  # POSTGRESQL : Base de donnees utilisee par SonarQube
  # SonarQube a besoin d'une BDD pour stocker les resultats d'analyse,
  # les projets, les regles, les Quality Gates, etc.
  # ══════════════════════════════════════════════════════════════════
  sonarqube-db:
    image: postgres:15               # PostgreSQL version 15
    container_name: sonarqube-db
    environment:
      - POSTGRES_USER=sonar          # Cree l'utilisateur "sonar"
      - POSTGRES_PASSWORD=sonar      # Avec le mot de passe "sonar"
      - POSTGRES_DB=sonarqube        # Cree la base "sonarqube" automatiquement
    volumes:
      - postgresql_data:/var/lib/postgresql/data  # Persiste les donnees
    networks:
      - sonarqube-net

volumes:
  sonarqube_data:
  sonarqube_extensions:
  sonarqube_logs:
  postgresql_data:

# ══════════════════════════════════════════════════════════════════
# RESEAU sonarqube-net :
# Les conteneurs sur ce reseau peuvent se parler par nom :
# "sonarqube" → le serveur SonarQube
# "sonarqube-db" → la base PostgreSQL
# Le sonar-scanner doit aussi etre sur ce reseau pour envoyer ses resultats.
# ══════════════════════════════════════════════════════════════════
networks:
  sonarqube-net:
```

**Schema :**
```
sonar-scanner ──analyse──→ [SonarQube :9000] ──stocke──→ [PostgreSQL :5432]
                                 ↑
                    http://localhost:9000 (navigateur)
```

---

# 8. NGINX.CONF (Reverse Proxy)

Fichier : `reactportfolio/nginx.conf` — Configure comment Nginx sert le frontend et redirige les appels API.

```nginx
# ══════════════════════════════════════════════════════════════════
# resolver = Utilise le DNS interne de Docker pour resoudre les noms
# des conteneurs. "127.0.0.11" est le serveur DNS integre de Docker.
# "valid=10s" = cache la resolution pendant 10 secondes.
# ══════════════════════════════════════════════════════════════════
resolver 127.0.0.11 valid=10s;

server {
    listen 80;                       # Ecoute sur le port 80 (HTTP)
    server_name localhost;
    root /usr/share/nginx/html;      # Dossier contenant les fichiers React compiles
    index index.html;
    client_max_body_size 10M;        # Taille max d'upload (pour les images)

    # ══════════════════════════════════════════════════════════════
    # ROUTE PRINCIPALE : sert les fichiers React
    # try_files :
    #   1. Cherche le fichier exact demande ($uri)
    #   2. Cherche un dossier ($uri/)
    #   3. Si rien trouve → renvoie index.html (React Router gere la route)
    # C'est ESSENTIEL pour une SPA (Single Page Application) :
    # sans ca, /projects ou /about donneraient une erreur 404.
    # ══════════════════════════════════════════════════════════════
    location / {
        try_files $uri $uri/ /index.html;
    }

    # ══════════════════════════════════════════════════════════════
    # PROXY API : redirige /api/* vers le backend Express
    # Quand le navigateur appelle http://localhost:3000/api/projects,
    # Nginx intercepte et forward vers http://portfolio-backend:5000/api/projects.
    # Le navigateur ne sait pas que le backend existe — c'est transparent.
    # ══════════════════════════════════════════════════════════════
    location /api {
        set $backend_url http://portfolio-backend:5000;
        # ↑ "portfolio-backend" = nom du conteneur backend dans Docker
        # Docker resout ce nom en adresse IP via le DNS interne.
        proxy_pass $backend_url;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;    # Support WebSocket
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;               # Transmet le Host original
        proxy_cache_bypass $http_upgrade;
    }

    # ══════════════════════════════════════════════════════════════
    # PROXY UPLOADS : redirige /uploads/* vers le backend
    # Les images uploadees sont stockees sur le backend (dossier /uploads).
    # Cette route permet au frontend d'afficher les images.
    # ══════════════════════════════════════════════════════════════
    location /uploads {
        set $backend_url http://portfolio-backend:5000;
        proxy_pass $backend_url;
        proxy_set_header Host $host;
    }
}
```

**Schema du flux HTTP :**
```
Navigateur → http://localhost:3000/
                     │
                     ▼
              [Nginx :80]
                     │
     ┌───────────────┼───────────────┐
     │               │               │
     ▼               ▼               ▼
  /index.html     /api/*          /uploads/*
  /assets/*       (proxy)         (proxy)
  (fichiers       │               │
   statiques)     ▼               ▼
              [Express :5000] [Express :5000]
                     │
                     ▼
              [MongoDB :27017]
```

---

# 9. VITE.CONFIG.JS

Fichier : `reactportfolio/vite.config.js` — Configuration du bundler Vite (uniquement pour le dev local).

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],     // Active le support JSX/React

  server: {
    proxy: {
      '/api': 'http://localhost:5000'
      // ↑ EN DEVELOPPEMENT UNIQUEMENT :
      // Quand tu fais "npm run dev", Vite lance un serveur sur http://localhost:5173.
      // Les appels a /api/* sont rediriges vers le backend Express sur le port 5000.
      //
      // EN PRODUCTION (Docker) :
      // Ce proxy n'est PAS utilise. C'est Nginx qui fait le proxy (voir nginx.conf).
      //
      // Pourquoi ? En dev, le frontend tourne sur le port 5173 et le backend sur 5000.
      // Sans ce proxy, le navigateur bloquerait les appels (CORS - origins differentes).
    }
  }
})
```

---

# 10. APP.JS (Serveur Backend)

Fichier : `EXPRESSJS PORTFOLIO/app.js`

```javascript
// ══════════════════════════════════════════════════════════════════
// IMPORTS DES MODULES
// ══════════════════════════════════════════════════════════════════
const express = require('express')   // Framework web pour Node.js (gere les routes HTTP)
const cors = require('cors')         // Middleware qui autorise les requetes cross-origin
                                     // (permet au frontend sur un autre port d'appeler l'API)
const mongoose = require('mongoose') // ODM (Object Document Mapper) pour MongoDB
                                     // Permet d'interagir avec MongoDB via des modeles JavaScript
const dotenv = require('dotenv')     // Charge les variables d'environnement depuis un fichier .env
const path = require('path')         // Module Node.js pour manipuler les chemins de fichiers
const fs = require('fs')             // Module Node.js pour le systeme de fichiers
const multer = require('multer')     // Middleware pour gerer l'upload de fichiers (multipart/form-data)

dotenv.config()                      // Charge le .env (s'il existe) dans process.env

// ══════════════════════════════════════════════════════════════════
// CREATION DE L'APPLICATION EXPRESS
// ══════════════════════════════════════════════════════════════════
const app = express()
const PORT = process.env.PORT || 5000  // Utilise le port de l'env, sinon 5000 par defaut

// ══════════════════════════════════════════════════════════════════
// CONFIGURATION UPLOAD (Multer)
// ══════════════════════════════════════════════════════════════════
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)  // Cree /uploads si n'existe pas

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  // ↑ Ou stocker les fichiers : dans le dossier /uploads
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'))
  // ↑ Nom du fichier : timestamp + nom original (espaces remplaces par _)
  // Exemple : "1717200000-photo_profil.jpg"
})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })
// ↑ Limite : 5 Mo max par fichier

// ══════════════════════════════════════════════════════════════════
// MIDDLEWARES GLOBAUX
// ══════════════════════════════════════════════════════════════════
app.use(cors())               // Autorise TOUTES les origines (en prod, a restreindre !)
app.use(express.json())       // Parse automatiquement le JSON des requetes (req.body)
app.use('/uploads', express.static(uploadsDir))
// ↑ Sert les fichiers du dossier /uploads en statique
// → http://localhost:5000/uploads/1717200000-photo.jpg

// ══════════════════════════════════════════════════════════════════
// ROUTE D'UPLOAD
// ══════════════════════════════════════════════════════════════════
app.post('/api/upload', upload.single('image'), (req, res) => {
  // upload.single('image') = accepte UN fichier dans le champ "image" du formulaire
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  res.json({ imageUrl: `/uploads/${req.file.filename}` })
  // ↑ Retourne l'URL relative de l'image uploadee
})

// ══════════════════════════════════════════════════════════════════
// ROUTES PROJECTS (CRUD complet)
// ══════════════════════════════════════════════════════════════════
const projectRoutes = require('./src/routes/projectRoutes')
app.use('/api/projects', projectRoutes)
// ↑ Toutes les requetes commencant par /api/projects sont gerees
//   par le fichier projectRoutes.js (GET, POST, PUT, DELETE)

// ══════════════════════════════════════════════════════════════════
// ROUTE RACINE (test rapide)
// ══════════════════════════════════════════════════════════════════
app.get('/', (req, res) => {
  res.json({ message: 'API Portfolio - Mouhamed Sall' })
})

// ══════════════════════════════════════════════════════════════════
// FONCTION DE DEMARRAGE DU SERVEUR
// ══════════════════════════════════════════════════════════════════
async function startServer() {
  try {
    const useMemoryDB = process.env.USE_MEMORY_DB === 'true'

    if (useMemoryDB) {
      // MODE MEMOIRE : utilise mongodb-memory-server (pour les tests/dev sans MongoDB reel)
      const { MongoMemoryServer } = require('mongodb-memory-server')
      const mongoServer = await MongoMemoryServer.create()
      const uri = mongoServer.getUri()
      await mongoose.connect(uri)
      console.log('Connected to in-memory MongoDB')
    } else {
      // MODE PRODUCTION : se connecte au vrai MongoDB
      const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio'
      // ↑ En Docker : MONGO_URI=mongodb://mongo:27017/portfolio (voir compose.yaml)
      // "mongo" est le nom du conteneur MongoDB sur le reseau Docker
      await mongoose.connect(mongoUri)
      console.log('Connected to MongoDB')
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)  // Arrete le processus avec un code d'erreur
  }
}

// Lance le serveur uniquement si ce fichier est execute directement
// (pas quand il est importe par les tests)
if (require.main === module) {
  startServer()
}

module.exports = app  // Exporte pour les tests
```

---

# 11. ROUTES BACKEND

Fichier : `EXPRESSJS PORTFOLIO/src/routes/projectRoutes.js`

```javascript
const express = require('express')
const router = express.Router()       // Cree un mini-routeur Express
const Project = require('../models/Project')  // Le modele Mongoose (schema MongoDB)

// ══════════════════════════════════════════════════════════════════
// GET /api/projects — Liste tous les projets
// Trie par date de creation decroissante (le plus recent en premier)
// ══════════════════════════════════════════════════════════════════
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)               // Retourne un tableau JSON de projets
  } catch (error) {
    res.status(500).json({ message: error.message })  // Erreur serveur
  }
})

// ══════════════════════════════════════════════════════════════════
// GET /api/projects/:id — Recupere UN projet par son ID MongoDB
// :id est un parametre dynamique (ex: /api/projects/665a1234abcd5678)
// ══════════════════════════════════════════════════════════════════
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })  // 404 si pas trouve
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ══════════════════════════════════════════════════════════════════
// POST /api/projects — Cree un nouveau projet
// Le body de la requete contient les donnees du projet (title, description, etc.)
// ══════════════════════════════════════════════════════════════════
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body)  // Cree une instance du modele avec les donnees
    const savedProject = await project.save()  // Sauvegarde en base
    res.status(201).json(savedProject)     // 201 = Created
  } catch (error) {
    res.status(400).json({ message: error.message })  // 400 = donnees invalides
  }
})

// ══════════════════════════════════════════════════════════════════
// PUT /api/projects/:id — Met a jour un projet existant
// { new: true } = retourne le document APRES modification (pas avant)
// { runValidators: true } = verifie les contraintes du schema Mongoose
// ══════════════════════════════════════════════════════════════════
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    res.json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// ══════════════════════════════════════════════════════════════════
// DELETE /api/projects/:id — Supprime un projet
// ══════════════════════════════════════════════════════════════════
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    res.json({ message: 'Project deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router  // Exporte le routeur (utilise dans app.js)
```

**Resume des endpoints API :**
```
GET    /api/projects      → Liste tous les projets
GET    /api/projects/:id  → Un projet specifique
POST   /api/projects      → Creer un projet
PUT    /api/projects/:id  → Modifier un projet
DELETE /api/projects/:id  → Supprimer un projet
POST   /api/upload        → Uploader une image
```

---

# 12. APP.JSX (Frontend React)

Fichier : `reactportfolio/src/App.jsx`

```jsx
// ══════════════════════════════════════════════════════════════════
// IMPORTS
// ══════════════════════════════════════════════════════════════════
import { Routes, Route, useLocation } from 'react-router-dom'
// ↑ React Router : gere la navigation cote client (SPA)
// Routes = conteneur de routes
// Route = une route individuelle (chemin → composant)
// useLocation = hook pour connaitre l'URL actuelle

import { AnimatePresence } from 'framer-motion'
// ↑ Framer Motion : librairie d'animations
// AnimatePresence = detecte quand un composant entre/sort du DOM
//   et joue une animation de transition entre les pages.

import Navbar from './components/Navbar.jsx'     // Barre de navigation (presente sur toutes les pages)
import Home from './pages/Home.jsx'              // Page d'accueil
import Projects from './pages/Projects.jsx'      // Liste des projets
import ProjectDetail from './pages/ProjectDetail.jsx'  // Detail d'un projet
import About from './pages/About.jsx'            // Page "A propos"
import Contact from './pages/Contact.jsx'        // Page contact
import Admin from './pages/Admin.jsx'            // Page admin (CRUD projets)

function App() {
  const location = useLocation()
  // ↑ Recupere l'URL actuelle. Change a chaque navigation.
  // Utilise comme "key" pour que AnimatePresence detecte le changement de page.

  return (
    <>
      <Navbar />
      {/* ↑ Toujours visible, quel que soit la page */}

      <AnimatePresence mode="wait">
        {/* mode="wait" = attend que la page sortante finisse son animation
            avant d'afficher la nouvelle page */}

        <Routes location={location} key={location.pathname}>
          {/* key={location.pathname} = force React a "detruire et recreer" le composant
              quand l'URL change → declenche les animations enter/exit */}

          <Route path="/" element={<Home />} />
          {/* URL "/" → affiche le composant Home */}

          <Route path="/projects" element={<Projects />} />
          {/* URL "/projects" → liste des projets (appelle GET /api/projects) */}

          <Route path="/projects/:id" element={<ProjectDetail />} />
          {/* URL "/projects/665a..." → detail d'un projet (appelle GET /api/projects/:id) */}

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          {/* URL "/admin" → interface d'administration (POST, PUT, DELETE) */}
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
```

---

# 13. SONAR-PROJECT.PROPERTIES

Fichier : `sonar-project.properties` — Configuration du scanner SonarQube.

```properties
# Identifiant unique du projet dans SonarQube
sonar.projectKey=portfolio-react-express

# Nom affiche dans l'interface SonarQube
sonar.projectName=Portfolio React Express - Groupe 5

# Version du projet (affichee dans l'historique des analyses)
sonar.projectVersion=1.0

# Dossiers contenant le code source a analyser
# SonarQube va scanner ces fichiers pour trouver bugs, vulnerabilites, etc.
sonar.sources=reactportfolio/src,EXPRESSJS PORTFOLIO/src,EXPRESSJS PORTFOLIO/app.js

# Fichiers/dossiers a EXCLURE de l'analyse
# node_modules = librairies externes (pas notre code)
# dist/build = fichiers generes (pas du code source)
sonar.exclusions=**/node_modules/**,**/dist/**,**/build/**,**/coverage/**

# Chemin vers le rapport de couverture de tests (genere par Jest avec --coverage)
sonar.javascript.lcov.reportPaths=EXPRESSJS PORTFOLIO/coverage/lcov.info

# Encodage des fichiers sources
sonar.sourceEncoding=UTF-8

# URL du serveur SonarQube (nom Docker ou localhost)
sonar.host.url=http://sonarqube:9000
```

---

# 14. SCHEMA GLOBAL D'ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MACHINE LOCALE (Docker Desktop)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────── portfolio-net ───────────────────┐                    │
│  │                                                      │                    │
│  │  ┌──────────────┐   ┌──────────────┐   ┌─────────┐ │                    │
│  │  │   NGINX      │   │   EXPRESS    │   │  MONGO  │ │                    │
│  │  │  (Frontend)  │──→│  (Backend)   │──→│  (BDD)  │ │                    │
│  │  │  Port 80     │   │  Port 5000   │   │  27017  │ │                    │
│  │  └──────────────┘   └──────────────┘   └─────────┘ │                    │
│  │       ↑ :3000            ↑ :5000                     │                    │
│  └───────┼──────────────────┼───────────────────────────┘                    │
│          │                  │                                                │
│  ┌───────┼──────────────────┼──── CI/CD ────────────────────┐               │
│  │       │                  │                                │               │
│  │  ┌────┴─────┐     ┌─────┴──────────┐                    │               │
│  │  │ JENKINS  │────→│ SONAR-SCANNER  │                    │               │
│  │  │ Port 8080│     │  (temporaire)  │                    │               │
│  │  └──────────┘     └────────────────┘                    │               │
│  │                          │                               │               │
│  │  ┌─────────── sonarqube-net ──────────────┐             │               │
│  │  │                                         │             │               │
│  │  │  ┌──────────────┐   ┌──────────────┐  │             │               │
│  │  │  │  SONARQUBE   │   │  POSTGRESQL  │  │             │               │
│  │  │  │  Port 9000   │──→│  Port 5432   │  │             │               │
│  │  │  └──────────────┘   └──────────────┘  │             │               │
│  │  │       ↑ :9000                          │             │               │
│  │  └───────┼────────────────────────────────┘             │               │
│  │          │                                               │               │
│  └──────────┼───────────────────────────────────────────────┘               │
│             │                                                                │
└─────────────┼────────────────────────────────────────────────────────────────┘
              │
         NAVIGATEUR
    http://localhost:3000 → Portfolio (frontend)
    http://localhost:5000 → API directe (backend)
    http://localhost:8080 → Jenkins (CI/CD)
    http://localhost:9000 → SonarQube (qualite)
```

---

# RESUME DES PORTS

| Service | Port Externe | Port Interne | URL d'acces |
|---------|-------------|-------------|-------------|
| Frontend (Nginx) | 3000 | 80 | http://localhost:3000 |
| Backend (Express) | 5000 | 5000 | http://localhost:5000/api/projects |
| MongoDB | 27017 | 27017 | mongodb://localhost:27017 |
| Jenkins | 8080 | 8080 | http://localhost:8080 |
| Jenkins Agent | 50000 | 50000 | (interne) |
| SonarQube | 9000 | 9000 | http://localhost:9000 |
| PostgreSQL (SonarQube) | - | 5432 | (interne uniquement) |

---

# RESUME DES CONNEXIONS ENTRE SERVICES

| De | Vers | Comment | Pourquoi |
|----|------|---------|----------|
| Navigateur | Nginx (:3000) | HTTP direct | Afficher le site |
| Nginx | Express (:5000) | Proxy reverse (location /api) | Les appels API du frontend |
| Express | MongoDB (:27017) | Mongoose (MONGO_URI) | Stocker/lire les donnees |
| Jenkins | Git (GitHub) | Webhook + SSH/HTTPS | Recuperer le code source |
| Jenkins | Docker Engine | Socket (/var/run/docker.sock) | Build et deploy des conteneurs |
| Jenkins | SonarQube (:9000) | sonar-scanner via reseau Docker | Envoyer les resultats d'analyse |
| SonarQube | PostgreSQL (:5432) | JDBC | Stocker les metriques et resultats |
| Vite (dev) | Express (:5000) | Proxy dans vite.config.js | Dev local sans Docker |

---

*Document complet | Groupe 5 - SNDAK11 | Juin 2026*
