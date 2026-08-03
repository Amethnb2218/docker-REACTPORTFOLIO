# mouhamedsall.vercel.app

Portfolio professionnel de Mouhamed Sall - Full Stack Developer, DevOps Engineer & Co-Founder @ MTCorporate.

**Live :** https://mouhamedsall.vercel.app

---

## Stack technique

- **Frontend :** React 19, Framer Motion, Three.js (React Three Fiber)
- **3D :** TorusKnot wireframe, formes flottantes, parallax souris
- **Animations :** Transitions de pages, text reveal, glassmorphism, scroll-triggered
- **Styling :** CSS-in-JS inline, palette Baobab & Gold
- **Backend :** Node.js, Express.js, MongoDB, Prisma ORM
- **Infra :** Docker (multi-stage), Jenkins, Kubernetes, Terraform
- **CI/CD :** GitHub Actions, Jenkins pipelines, SonarQube, Trivy
- **Monitoring :** Prometheus, Grafana
- **Cloud :** AWS (EC2, S3, Lambda, IAM, VPC, EKS)
- **Deploiement :** Vercel (frontend), Docker Hub (images)

## Architecture

```
reactportfolio/          Frontend React + Three.js + Framer Motion
EXPRESSJS PORTFOLIO/     API REST Express.js + MongoDB
compose.yaml             Docker Compose (frontend + backend + mongo)
Jenkinsfile              Pipeline CI/CD Jenkins
kubernetes/              Manifests K8s (deployment, service, ingress)
terraform/               IaC AWS (VPC, EC2, EKS)
sonarqube/               Config analyse qualite
```

## Fonctionnalites

- Scene 3D interactive (TorusKnot dore, formes flottantes, suivi souris)
- Animations Motion avancees (text split, magnetic button, scroll reveal, 3D tilt)
- Glassmorphism (navbar, formulaire contact, hover effects)
- Page detail par projet avec transitions animees
- Formulaire de contact fonctionnel (Formspree)
- Design editorial avec palette Baobab & Gold (vert foret + or ambre)
- Responsive mobile
- Loading screen anime
- Typing effect (roles professionnels)
- CV telechargeable

## DevOps Pipeline

Ce projet sert aussi de demo DevOps complete :

1. **Docker** - Build multi-stage (Node + Nginx)
2. **Jenkins** - Pipeline CI/CD automatisee
3. **SonarQube** - Analyse qualite du code
4. **Kubernetes** - Deploiement sur cluster K8s
5. **Terraform** - Provisioning AWS (VPC, EC2, EKS)
6. **Prometheus/Grafana** - Monitoring continu
7. **Trivy** - Scan de securite des images

## Lancement local

```bash
# Frontend seul
cd REACTPORTFOLIO/reactportfolio
npm install
npm run dev

# Stack complete avec Docker
cd REACTPORTFOLIO
docker compose up --build
```

## Auteur

**Mouhamed Sall**
- Portfolio : https://mouhamedsall.vercel.app
- LinkedIn : https://linkedin.com/in/mouhamed-sall-b35637293
- GitHub : https://github.com/Amethnb2218
- Email : amethsl2218@gmail.com
- MTCorporate : Co-Founder

---

Certifie AWS Cloud Practitioner | AWS re/Start Graduate | ESP Dakar - Genie Logiciel
