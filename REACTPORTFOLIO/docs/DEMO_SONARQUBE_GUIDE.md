# DEMO SonarQube - Guide Pas-a-Pas
## Groupe 5 | SNDAK11 | Projet Fil Rouge : Portfolio React + Express

---

## Pre-requis

- Docker Desktop installe et lance
- Jenkins deja configure (partie Jenkins deja faite)
- Le projet REACTPORTFOLIO clone localement
- Port 9000 disponible (SonarQube)

---

## PARTIE 1 : Installation et Lancement de SonarQube

### Etape 1.1 — Lancer SonarQube avec Docker Compose

```bash
cd C:\Users\HP\docker-REACTPORTFOLIO\REACTPORTFOLIO

# Lancer SonarQube + PostgreSQL
docker compose -f sonarqube/docker-compose.sonarqube.yml up -d
```

**Verification :**
```bash
# Attendre ~2 minutes puis verifier
docker ps | grep sonarqube

# Verifier que SonarQube est UP
curl -s http://localhost:9000/api/system/status
# Reponse attendue : {"id":"...","version":"...","status":"UP"}
```

### Etape 1.2 — Premiere connexion

1. Ouvrir le navigateur : **http://localhost:9000**
2. Login : `admin` / Mot de passe : `admin`
3. SonarQube demande de changer le mot de passe → mettre `Admin1234!`

---

## PARTIE 2 : Configuration du Projet dans SonarQube

### Etape 2.1 — Creer le projet

1. Cliquer sur **"Create Project"** (bouton bleu en haut a droite)
2. Choisir **"Manually"**
3. Remplir :
   - **Project display name** : `Portfolio React Express - Groupe 5`
   - **Project key** : `portfolio-react-express`
   - **Main branch name** : `main`
4. Cliquer **"Set Up"**

### Etape 2.2 — Generer un Token d'authentification

1. Dans la page du projet → **"Locally"**
2. Generer un token :
   - Name : `jenkins-token`
   - Type : `Project Analysis Token`
   - Expires in : `30 days`
3. Cliquer **"Generate"**
4. **COPIER LE TOKEN** (ex: `squ_abc123def456...`) — il ne sera plus affiche

### Etape 2.3 — Configurer le token dans Jenkins

1. Ouvrir Jenkins : **http://localhost:8080**
2. Aller dans **Manage Jenkins** → **Credentials** → **System** → **Global credentials**
3. Cliquer **"Add Credentials"**
4. Remplir :
   - **Kind** : Secret text
   - **Secret** : coller le token SonarQube
   - **ID** : `sonarqube-token`
   - **Description** : `Token SonarQube pour analyse du portfolio`
5. Cliquer **"Create"**

---

## PARTIE 3 : Premiere Analyse Manuelle (sans Jenkins)

### Etape 3.1 — Lancer l'analyse avec sonar-scanner via Docker

```bash
cd C:\Users\HP\docker-REACTPORTFOLIO\REACTPORTFOLIO

# Lancer le scanner (remplacer squ_VOTRE_TOKEN par votre vrai token)
docker run --rm \
  --network sonarqube-net \
  -v "$(pwd):/usr/src" \
  -w /usr/src \
  sonarsource/sonar-scanner-cli \
  -Dsonar.projectKey=portfolio-react-express \
  -Dsonar.projectName="Portfolio React Express - Groupe 5" \
  -Dsonar.sources=reactportfolio/src,"EXPRESSJS PORTFOLIO/src","EXPRESSJS PORTFOLIO/app.js" \
  -Dsonar.exclusions="**/node_modules/**,**/dist/**,**/build/**" \
  -Dsonar.host.url=http://sonarqube:9000 \
  -Dsonar.token=squ_VOTRE_TOKEN
```

**Resultat attendu dans le terminal :**
```
INFO: Scanner configuration file: /opt/sonar-scanner/conf/sonar-scanner.properties
INFO: Project root configuration file: NONE
INFO: SonarScanner 5.x.x
INFO: Communicating with SonarQube Server 10.x
INFO: ------------- Run sensors on project
INFO: Sensor JavaScript/TypeScript analysis
...
INFO: ANALYSIS SUCCESSFUL
INFO: Note that you will be able to access the updated dashboard once the server has processed the submitted analysis report
INFO: More about the report processing at http://sonarqube:9000/api/ce/task?id=...
INFO: Analysis total time: ...
INFO: EXECUTION SUCCESS
```

### Etape 3.2 — Consulter les resultats

1. Retourner sur **http://localhost:9000**
2. Cliquer sur le projet **"Portfolio React Express - Groupe 5"**

**Ce que vous devriez voir sur le Dashboard :**

| Metrique | Valeur attendue | Signification |
|----------|----------------|---------------|
| Bugs | 0-3 | Erreurs de logique dans le code |
| Vulnerabilities | 0-2 | Failles de securite (ex: CORS `origin: *`) |
| Code Smells | 5-20 | Problemes de maintenabilite |
| Security Hotspots | 1-5 | Points a revoir manuellement |
| Coverage | 0% | Pas de rapport de couverture envoye |
| Duplications | 0-5% | Code duplique |
| Quality Gate | Passed/Failed | Decision globale |

---

## PARTIE 4 : Integration dans le Pipeline Jenkins

### Etape 4.1 — Verifier le reseau Docker

Le Jenkinsfile a besoin que Jenkins puisse communiquer avec SonarQube via le reseau `sonarqube-net`.

```bash
# Verifier que le reseau existe
docker network ls | grep sonarqube-net

# Si Jenkins tourne dans un conteneur, le connecter au reseau
docker network connect sonarqube-net jenkins
```

### Etape 4.2 — Lancer le pipeline

1. Dans Jenkins, aller sur le job du portfolio
2. Cliquer **"Build Now"**
3. Observer les stages dans **Pipeline Stage View** :

```
✅ Checkout
✅ Install Dependencies (Frontend | Backend)
✅ Tests
✅ Build Frontend
🔍 SonarQube Analysis    ← NOUVEAU
🚦 Quality Gate          ← NOUVEAU
✅ Docker Build
✅ Deploy
✅ Health Check
```

### Etape 4.3 — Verifier les logs du stage SonarQube

Dans la console Jenkins (cliquer sur le build → Console Output), chercher :

```
[SonarQube Analysis] Running...
INFO: ANALYSIS SUCCESSFUL
...
[Quality Gate] Checking...
Quality Gate Status: OK
✅ Quality Gate PASSE !
```

---

## PARTIE 5 : Demonstration des Concepts en Action

### 5.1 — Bug : Demonstration avec une erreur volontaire

Ajouter temporairement dans `EXPRESSJS PORTFOLIO/app.js` :

```javascript
// Bug volontaire pour la demo
function demoSonarBug() {
    let result = null;
    console.log(result.length); // NullPointerException equivalent
}
```

Relancer l'analyse → SonarQube detecte un **Bug** de severite **Major**.

### 5.2 — Code Smell : Complexite cognitive

```javascript
// Code Smell : complexite cognitive elevee
function processData(data) {
    if (data) {
        if (data.items) {
            if (data.items.length > 0) {
                for (let i = 0; i < data.items.length; i++) {
                    if (data.items[i].active) {
                        if (data.items[i].value > 100) {
                            // trop de niveaux d'imbrication
                        }
                    }
                }
            }
        }
    }
}
```

### 5.3 — Vulnerability : CORS trop permissif

```javascript
// Vulnerability detectee par SonarQube
app.use(cors({ origin: '*' }));

// Correction recommandee :
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || 'http://localhost:3000' }));
```

### 5.4 — Security Hotspot : Mot de passe en dur

```javascript
// Security Hotspot
const dbPassword = "admin123";

// Correction :
const dbPassword = process.env.DB_PASSWORD;
```

### 5.5 — Quality Gate : Blocage du pipeline

Scenario complet :

1. Introduire les bugs ci-dessus
2. Push sur le depot Git
3. Jenkins declenche le pipeline automatiquement
4. Le stage **Quality Gate** echoue :

```
Quality Gate Status: ERROR
❌ Quality Gate ECHOUE ! Statut: ERROR
Consultez http://localhost:9000/dashboard?id=portfolio-react-express pour les details.
```

5. Pipeline stoppe → pas de deploy
6. Email de notification d'echec envoye

### 5.6 — Correction et succes

1. Corriger les bugs
2. Push
3. Pipeline relance → Quality Gate passe → Deploy effectue

---

## PARTIE 6 : Exploration de l'Interface SonarQube

### 6.1 — Dashboard du projet

Montrer les widgets :
- Reliability (Bugs) avec note A/B/C/D/E
- Security (Vulnerabilities) avec note
- Maintainability (Code Smells + dette technique)
- Coverage et Duplications

### 6.2 — Onglet Issues

- Filtrer par Type : Bug, Vulnerability, Code Smell
- Filtrer par Severite : Blocker, Critical, Major, Minor, Info
- Filtrer par Statut : Open, Confirmed, Resolved, Closed

### 6.3 — Onglet Security Hotspots

- Categorie de risque (Authentication, Encryption, etc.)
- Statut : To Review, Acknowledged, Fixed, Safe

### 6.4 — Onglet Measures

- Reliability → bugs count, rating
- Security → vulnerabilities, hotspots
- Maintainability → code smells, dette technique
- Coverage → lines/branches to cover
- Duplications → % et blocs dupliques
- Size → lines of code, files, functions

### 6.5 — Onglet Activity

- Historique des analyses
- Graphiques d'evolution dans le temps
- Events (Quality Gate changes)

### 6.6 — Quality Gates (Administration)

- Conditions du Quality Gate "Sonar way" :
  - Coverage on New Code >= 80%
  - Duplicated Lines on New Code <= 3%
  - Maintainability Rating on New Code is A
  - Reliability Rating on New Code is A
  - Security Rating on New Code is A
  - Security Hotspots Reviewed on New Code >= 100%

### 6.7 — Quality Profiles (Administration)

- Profil actif pour JavaScript/TypeScript : **Sonar way**
- Nombre de regles actives
- Possibilite de creer un profil personnalise

---

## PARTIE 7 : Commandes Utiles pour la Demo

```bash
# === GESTION SONARQUBE ===

# Voir les logs en temps reel
docker logs sonarqube -f

# Verifier le statut
curl -s http://localhost:9000/api/system/status | python -m json.tool

# Verifier la sante
curl -s -u admin:Admin1234! http://localhost:9000/api/system/health | python -m json.tool

# === GESTION DES PROJETS ===

# Lister les projets
curl -s -u admin:Admin1234! "http://localhost:9000/api/projects/search" | python -m json.tool

# Voir le statut du Quality Gate
curl -s -u admin:Admin1234! \
  "http://localhost:9000/api/qualitygates/project_status?projectKey=portfolio-react-express" \
  | python -m json.tool

# Voir les issues du projet
curl -s -u admin:Admin1234! \
  "http://localhost:9000/api/issues/search?projectKeys=portfolio-react-express&types=BUG" \
  | python -m json.tool

# Voir les metriques
curl -s -u admin:Admin1234! \
  "http://localhost:9000/api/measures/component?component=portfolio-react-express&metricKeys=bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density" \
  | python -m json.tool

# === ARRET / RELANCE ===

# Arreter SonarQube
docker compose -f sonarqube/docker-compose.sonarqube.yml down

# Relancer (les donnees persistent grace aux volumes)
docker compose -f sonarqube/docker-compose.sonarqube.yml up -d
```

---

## PARTIE 8 : Resume du Flux Complet

```
┌─────────────┐    ┌──────────┐    ┌────────────────┐    ┌──────────────┐
│  Developer  │───▶│   Git    │───▶│    Jenkins     │───▶│  SonarQube   │
│  (Push)     │    │  (Repo)  │    │  (Pipeline)    │    │  (Analyse)   │
└─────────────┘    └──────────┘    └────────────────┘    └──────────────┘
                                           │                      │
                                           │                      ▼
                                           │              ┌──────────────┐
                                           │              │ Quality Gate │
                                           │              │  OK / ERROR  │
                                           │              └──────────────┘
                                           │                      │
                                           ▼                      ▼
                                   ┌──────────────┐      ┌──────────────┐
                                   │    Deploy    │◀─OK──│   Decision   │
                                   │  (Docker)    │      │              │
                                   └──────────────┘      └──────────────┘
                                                                  │
                                                          ERROR   │
                                                                  ▼
                                                         ┌──────────────┐
                                                         │  Email Stop  │
                                                         │  (No Deploy) │
                                                         └──────────────┘
```

---

## Checklist de la Demo (pour le presentateur)

- [ ] Docker Desktop lance
- [ ] SonarQube accessible sur http://localhost:9000
- [ ] Projet cree dans SonarQube
- [ ] Token genere et configure dans Jenkins
- [ ] Premiere analyse manuelle reussie
- [ ] Resultats visibles dans le dashboard
- [ ] Pipeline Jenkins avec SonarQube fonctionne
- [ ] Demo du Quality Gate qui bloque (avec bug volontaire)
- [ ] Demo de la correction et du succes
- [ ] Navigation dans l'interface SonarQube montree

---

*Document de demo | Groupe 5 - SNDAK11 | Juin 2026*
