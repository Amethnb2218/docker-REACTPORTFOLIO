# EXPLICATION COMPLETE DU PROJET DOCKER - REACT PORTFOLIO

---

## 1. COMPOSE.YAML — Ligne par ligne

```yaml
services:
```
Declare la liste des conteneurs (services) a lancer ensemble.

---

```yaml
  frontend:
```
Nom du premier service : le frontend React.

---

```yaml
    build: ./reactportfolio
```
Dit a Docker : "Construis l'image en utilisant le Dockerfile qui se trouve dans le dossier ./reactportfolio".

---

```yaml
    container_name: portfolio-frontend
```
Donne un nom fixe au conteneur (sinon Docker genere un nom aleatoire).

---

```yaml
    ports:
      - "3000:80"
```
Redirige le port 3000 de ton PC vers le port 80 du conteneur.
Tu tapes localhost:3000 dans ton navigateur -> ca arrive sur Nginx (port 80) dans le conteneur.

---

```yaml
    depends_on:
      - backend
```
Le frontend ne demarre qu'apres le backend. Ordre de demarrage : mongo -> backend -> frontend.

---

```yaml
    networks:
      - portfolio-net
```
Place ce conteneur sur le reseau virtuel "portfolio-net" pour qu'il puisse parler aux autres.

---

```yaml
  backend:
```
Deuxieme service : l'API Express.js.

---

```yaml
    build: "./EXPRESSJS PORTFOLIO"
```
Construit l'image depuis le Dockerfile dans le dossier "EXPRESSJS PORTFOLIO".

---

```yaml
    container_name: portfolio-backend
```
Nom fixe du conteneur backend.

---

```yaml
    ports:
      - "5000:5000"
```
Port 5000 de ton PC -> port 5000 du conteneur. L'API est accessible sur localhost:5000.

---

```yaml
    environment:
      - PORT=5000
      - USE_MEMORY_DB=false
      - MONGO_URI=mongodb://mongo:27017/portfolio
```
Variables d'environnement injectees dans le conteneur :
- PORT=5000 : le serveur Express ecoute sur le port 5000
- USE_MEMORY_DB=false : desactive la base en memoire, utilise le vrai MongoDB
- MONGO_URI=mongodb://mongo:27017/portfolio : adresse du MongoDB
  - "mongo" = le nom du service MongoDB dans ce fichier (Docker le resout en adresse IP)
  - "27017" = port par defaut de MongoDB
  - "portfolio" = nom de la base de donnees

---

```yaml
    depends_on:
      - mongo
```
Le backend attend que MongoDB soit lance avant de demarrer.

---

```yaml
    networks:
      - portfolio-net
```
Meme reseau que les autres pour communiquer.

---

```yaml
  mongo:
```
Troisieme service : la base de donnees MongoDB.

---

```yaml
    image: mongo:7
```
Pas de Dockerfile ici ! On utilise directement l'image officielle MongoDB version 7 depuis Docker Hub.

---

```yaml
    container_name: portfolio-mongo
```
Nom fixe du conteneur MongoDB.

---

```yaml
    ports:
      - "27017:27017"
```
Port 27017 de ton PC -> port 27017 du conteneur. Permet d'acceder a MongoDB depuis ton PC (avec Compass par exemple).

---

```yaml
    volumes:
      - mongo-data:/data/db
```
Monte le volume "mongo-data" sur le dossier /data/db du conteneur.
/data/db = la ou MongoDB stocke ses fichiers.
Le volume est persistant = les donnees survivent meme si le conteneur est supprime.

---

```yaml
    networks:
      - portfolio-net
```
Meme reseau.

---

```yaml
volumes:
  mongo-data:
```
Declaration du volume "mongo-data". Docker le cree et le gere automatiquement.

---

```yaml
networks:
  portfolio-net:
```
Declaration du reseau prive. Les 3 conteneurs sont dessus et se trouvent par nom (frontend, backend, mongo).

---
---

## 2. DOCKERFILE BACKEND — Ligne par ligne

```dockerfile
FROM node:20-slim
```
Point de depart : image Linux legere avec Node.js 20. "slim" = version allege sans outils inutiles.

---

```dockerfile
WORKDIR /app
```
Cree le dossier /app dans le conteneur et se place dedans. Tout se passe ici apres.

---

```dockerfile
COPY package.json package-lock.json ./
```
Copie les fichiers de dependances depuis ton PC vers /app dans le conteneur.

---

```dockerfile
RUN npm ci
```
Installe les dependances (express, mongoose, cors, etc.) a partir du lock file.
"npm ci" = installation propre et reproductible (mieux que npm install pour Docker).

---

```dockerfile
COPY app.js ./
COPY src/ ./src/
```
Copie le code source du backend :
- app.js = point d'entree du serveur
- src/ = contient routes, controllers, models, config

---

```dockerfile
ENV USE_MEMORY_DB=true
```
Variable d'environnement par defaut : utilise une base de donnees en memoire.
MAIS le compose.yaml ecrase cette valeur avec USE_MEMORY_DB=false (le compose a priorite).

---

```dockerfile
ENV PORT=5000
```
Le serveur ecoute sur le port 5000 par defaut.

---

```dockerfile
EXPOSE 5000
```
Declare que le conteneur utilise le port 5000. C'est informatif (documentation).

---

```dockerfile
CMD ["node", "app.js"]
```
Commande executee au demarrage : lance le serveur Express avec Node.js.

---
---

## 3. DOCKERFILE FRONTEND — Ligne par ligne

```dockerfile
FROM node:20-alpine AS build
```
Stage 1 : image Linux Alpine + Node.js. Nommee "build" pour reference.

---

```dockerfile
WORKDIR /app
```
Dossier de travail = /app.

---

```dockerfile
COPY package.json package-lock.json ./
```
Copie les fichiers de dependances.

---

```dockerfile
RUN npm ci
```
Installe React, Vite, et toutes les dependances de dev.

---

```dockerfile
COPY index.html vite.config.js styles.css ./
COPY src/ ./src/
COPY assets/ ./assets/
```
Copie tout le code source React + les assets (images, etc).

---

```dockerfile
RUN npm run build
```
Vite compile le code React en fichiers statiques dans /app/dist/ :
- JSX -> JavaScript pur
- Imports -> un seul fichier JS bundle
- CSS -> un seul fichier CSS minifie

---

```dockerfile
FROM nginx:alpine
```
Stage 2 : repart de zero avec Nginx seulement. Node.js est jete.

---

```dockerfile
COPY --from=build /app/dist /usr/share/nginx/html
```
Recupere le dossier dist/ du stage 1 et le met dans le dossier que Nginx sert au navigateur.

---

```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```
Copie la config Nginx personnalisee (proxy vers le backend).

---

```dockerfile
EXPOSE 80
```
Nginx ecoute sur le port 80.

---

```dockerfile
CMD ["nginx", "-g", "daemon off;"]
```
Demarre Nginx au premier plan (daemon off = reste actif, sinon le conteneur s'arrete).

---
---

## 4. NGINX.CONF — Le proxy

```nginx
server {
    listen 80;                              # ecoute sur le port 80
    server_name localhost;
    root /usr/share/nginx/html;             # sert les fichiers depuis ce dossier (dist/)
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;   # si le fichier n'existe pas, renvoie index.html
    }                                       # (necessaire pour le routing React SPA)

    location /api/ {
        proxy_pass http://backend:5000/api/;  # redirige /api/ vers le backend Express
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Double role de Nginx :
1. Servir les fichiers React (HTML, JS, CSS)
2. Faire le relai (proxy) vers l'API backend quand l'URL commence par /api/

---
---

## 5. .DOCKERIGNORE

### Frontend (.dockerignore)
```
node_modules    # on refait npm install dans le conteneur (Linux ≠ Windows)
dist            # on refait npm run build dans le conteneur
.git            # inutile dans l'image
```

### Backend (.dockerignore)
```
node_modules    # meme raison
npm-debug.log   # fichier de debug inutile
.env            # secrets, ne pas mettre dans l'image !
test            # les tests ne servent pas en production
.git            # inutile
```

---
---

## 6. ARCHITECTURE COMPLETE — Comment tout est connecte

```
NAVIGATEUR (localhost:3000)
     |
     v
NGINX (conteneur frontend, port 80)
     |
     |--- demande un fichier (.html, .js, .css)
     |         --> sert depuis /usr/share/nginx/html (dist/)
     |
     |--- demande /api/...
               --> proxy_pass http://backend:5000/api/...
                        |
                        v
               EXPRESS (conteneur backend, port 5000)
                        |
                        |--- app.js recoit la requete
                        |--- routes/projectRoutes.js choisit le bon controleur
                        |--- controllers/projectController.js execute la logique
                        |--- models/projectModel.js definit le schema
                        |
                        v
               MONGODB (conteneur mongo, port 27017)
                        |
                        |--- base "portfolio", collection "projects"
                        |--- donnees stockees dans le volume mongo-data
```

---
---

## 7. LES ROUTES API

| Methode | URL                    | Action                         |
|---------|------------------------|--------------------------------|
| GET     | /api/projects          | Lister tous les projets        |
| POST    | /api/projects          | Creer un nouveau projet        |
| GET     | /api/projects/:id      | Obtenir un projet par son ID   |
| PUT     | /api/projects/:id      | Modifier un projet             |
| DELETE  | /api/projects/:id      | Supprimer un projet            |

---
---

## 8. COMMANDES DOCKER ESSENTIELLES

```bash
# Demarrer tous les conteneurs
docker compose up --build

# Demarrer en arriere-plan
docker compose up --build -d

# Arreter
docker compose down

# Arreter + supprimer les donnees MongoDB
docker compose down -v

# Voir les conteneurs actifs
docker ps

# Voir les logs
docker logs portfolio-backend

# Entrer dans un conteneur
docker exec -it portfolio-backend bash

# Push sur Docker Hub
docker login
docker tag reactportfolio-frontend monusername/portfolio-frontend:v1
docker push monusername/portfolio-frontend:v1
```

---
---

## 9. UTILISER DELETE AVEC POSTMAN

1. D'abord recuperer un ID :
   - Methode : GET
   - URL : http://localhost:5000/api/projects
   - Cliquer Send
   - Copier le "_id" d'un projet (ex: 6650a3f2b8c1d2e3f4a5b6c7)

2. Supprimer le projet :
   - Methode : DELETE
   - URL : http://localhost:5000/api/projects/6650a3f2b8c1d2e3f4a5b6c7
   - Pas de Body necessaire
   - Cliquer Send

3. Reponse attendue :
```json
{
  "success": true,
  "message": "Projet supprime avec succes",
  "data": { "_id": "6650a3f2b8c1d2e3f4a5b6c7", "libelle": "..." }
}
```

---
---

## 10. PRIORITE DES VARIABLES D'ENVIRONNEMENT

Le compose.yaml ECRASE les valeurs du Dockerfile :

| Variable       | Dockerfile (defaut) | compose.yaml (prioritaire) | Valeur finale |
|----------------|--------------------|-----------------------------|---------------|
| USE_MEMORY_DB  | true               | false                       | false         |
| PORT           | 5000               | 5000                        | 5000          |
| MONGO_URI      | (non defini)       | mongodb://mongo:27017/...   | mongodb://... |

---
---

## 11. RESUME EN UNE PHRASE CHAQUE FICHIER

| Fichier                  | Role                                                    |
|--------------------------|---------------------------------------------------------|
| compose.yaml             | Orchestre les 3 conteneurs ensemble (front, back, BDD)  |
| Dockerfile frontend      | Recette : compile React + sert avec Nginx               |
| Dockerfile backend       | Recette : installe Node + demarre Express               |
| .dockerignore            | Exclut les fichiers inutiles du build                   |
| nginx.conf               | Sert le site React + redirige /api/ vers le backend     |
| app.js                   | Point d'entree du serveur Express                       |
| projectRoutes.js         | Associe les URLs aux fonctions du controleur            |
| projectController.js     | Logique CRUD (create, read, update, delete)             |
| projectModel.js          | Schema MongoDB (structure d'un projet)                  |
| connectdb.js             | Se connecte a MongoDB avec Mongoose                     |
| projectsApi.js (front)   | Le frontend appelle l'API avec fetch()                  |
| dist/                    | Code React compile, pret pour le navigateur             |
