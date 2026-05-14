# Guide Complet : Créer un compte Docker Hub et Pousser des Images

## Étape 1 : Créer un compte Docker Hub

1. Aller sur **https://hub.docker.com**
2. Cliquer sur **"Sign Up"**
3. Choisir **"Continue with GitHub"** (ou créer avec email/mot de passe)
4. Autoriser Docker à accéder à votre compte GitHub
5. Compléter le formulaire (choisir un username, ex: `momoprvt`)
6. Valider l'email de confirmation si demandé

---

## Étape 2 : Créer un Personal Access Token (PAT)

> Un token est nécessaire pour se connecter en ligne de commande (surtout si le compte a été créé via GitHub).

1. Se connecter sur **https://hub.docker.com**
2. Cliquer sur votre **avatar** (en haut à droite)
3. Aller dans **Account Settings**
4. Dans le menu de gauche, cliquer sur **Personal access tokens**
5. Cliquer sur **"Generate new token"**
6. Remplir :
   - **Description** : `cli-access` (ou ce que vous voulez)
   - **Permissions** : **Read, Write, Delete** (IMPORTANT pour pouvoir push)
7. Cliquer sur **"Generate"**
8. **COPIER LE TOKEN** immédiatement (il ne sera plus affiché après)

---

## Étape 3 : Se connecter à Docker Hub en ligne de commande

Ouvrir un terminal (PowerShell, CMD, ou Git Bash) :

```bash
docker login -u momoprvt
```

Quand le mot de passe est demandé : **coller le token** (pas un mot de passe classique).

Résultat attendu :
```
Login Succeeded
```

> Si vous avez une erreur "insufficient scopes", c'est que le token n'a pas les bonnes permissions. Recréez-en un avec Read+Write+Delete.

---

## Étape 4 : Construire les images Docker

### Image 1 : React Portfolio (frontend)

```bash
cd "C:\Users\khadjia\Desktop\docker\REACTPORTFOLIO\reactportfolio"
docker build -t momoprvt/reactportfolio .
```

Cette commande :
- Lit le `Dockerfile` dans le dossier
- Installe les dépendances npm
- Build l'application React avec Vite
- Crée une image Nginx qui sert le site statique

### Image 2 : Express.js Portfolio (backend/API)

```bash
cd "C:\Users\khadjia\Desktop\docker\REACTPORTFOLIO\EXPRESSJS PORTFOLIO"
docker build -t momoprvt/expressjs-portfolio .
```

Cette commande :
- Lit le `Dockerfile` dans le dossier
- Installe les dépendances npm
- Crée une image Node.js qui lance l'API Express

---

## Étape 5 : Pousser (Push) les images sur Docker Hub

```bash
docker push momoprvt/reactportfolio
docker push momoprvt/expressjs-portfolio
```

Résultat attendu :
```
The push refers to repository [docker.io/momoprvt/reactportfolio]
...
latest: digest: sha256:xxxxx size: xxxx
```

---

## Étape 6 : Vérifier sur Docker Hub

1. Aller sur **https://hub.docker.com**
2. Cliquer sur **"Repositories"**
3. Vous devriez voir :
   - `momoprvt/reactportfolio`
   - `momoprvt/expressjs-portfolio`

---

## Résumé des commandes

```bash
# Se connecter
docker login -u momoprvt

# Build des images
docker build -t momoprvt/reactportfolio "C:\Users\khadjia\Desktop\docker\REACTPORTFOLIO\reactportfolio"
docker build -t momoprvt/expressjs-portfolio "C:\Users\khadjia\Desktop\docker\REACTPORTFOLIO\EXPRESSJS PORTFOLIO"

# Push sur Docker Hub
docker push momoprvt/reactportfolio
docker push momoprvt/expressjs-portfolio
```

---

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `docker images` | Lister les images locales |
| `docker pull momoprvt/reactportfolio` | Télécharger l'image depuis Docker Hub |
| `docker run -p 8080:80 momoprvt/reactportfolio` | Lancer le frontend sur localhost:8080 |
| `docker run -p 5000:5000 momoprvt/expressjs-portfolio` | Lancer le backend sur localhost:5000 |
| `docker logout` | Se déconnecter |

---

## En cas de problème

| Erreur | Solution |
|--------|----------|
| `authentication required` | Refaire `docker login` avec un token valide |
| `insufficient scopes` | Recréer le token avec permissions Read+Write+Delete |
| `denied: requested access to the resource is denied` | Vérifier que le username dans le tag correspond à votre compte |
| `Cannot perform an interactive login from a non TTY device` | Utiliser un vrai terminal (PowerShell/CMD), pas un terminal intégré |
