// Source unique des projets : consommee par la liste (Projects) et le detail (ProjectDetail)
export const projects = [
  {
    slug: 'jolof-era',
    title: "Jolof'Era",
    subtitle: 'Plateforme SaaS de réservation',
    description: "Plateforme SaaS multi-tenant permettant aux commerçants et prestataires de gérer leurs réservations en ligne, leur catalogue produits et leurs paiements.",
    longDescription: "Plateforme SaaS multi-tenant permettant aux commerçants et prestataires de gérer leurs réservations en ligne, leur catalogue produits et leurs paiements. Notifications en temps réel et gestion multi-boutiques.",
    highlights: [
      "Conception et développement d'une plateforme SaaS multi-tenant",
      "API REST Node.js / Express",
      "Données applicatives sous PostgreSQL et Prisma ORM",
      "Intégration du paiement et des notifications temps réel",
      "Déploiement et maintenance de l'environnement de production"
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'WebSocket', 'AWS'],
    liveUrl: 'https://jolofera.com',
    githubUrl: 'https://github.com/Amethnb2218/flashrv-react',
    category: 'Full Stack',
    period: '2026 — Présent',
    featured: true,
    number: '01',
    mtcorporate: true
  },
  {
    slug: 'devops-pipeline',
    title: 'Pipeline CI/CD DevOps',
    subtitle: 'Chaîne DevOps de bout en bout',
    description: "Pipeline DevOps complet : conteneurisation Docker multi-stage, CI/CD Jenkins, analyse qualité SonarQube, scan sécurité Trivy, orchestration Kubernetes et supervision Prometheus/Grafana.",
    longDescription: "Conception et mise en œuvre d'une chaîne DevOps de bout en bout : builds Docker multi-étapes, automatisation Jenkins, orchestration Kubernetes, Infrastructure as Code Terraform, qualité de code SonarQube, scan de vulnérabilités Trivy et observabilité Prometheus / Grafana.",
    highlights: [
      "Pipeline CI/CD de bout en bout avec Jenkins et Git",
      "Images Docker multi-étapes pour optimiser les builds",
      "Automatisation de la livraison applicative",
      "Orchestration des workloads conteneurisés avec Kubernetes",
      "Provisionnement de l'infrastructure avec Terraform (IaC)",
      "Analyse automatisée de la qualité du code avec SonarQube",
      "Scan de sécurité et analyse des vulnérabilités des conteneurs avec Trivy",
      "Supervision et observabilité avec Prometheus et Grafana"
    ],
    technologies: ['Docker', 'Jenkins', 'Kubernetes', 'Terraform', 'SonarQube', 'Trivy', 'Prometheus', 'Grafana'],
    githubUrl: 'https://github.com/Amethnb2218/docker-REACTPORTFOLIO',
    category: 'DevOps',
    period: '2026',
    number: '02'
  },
  {
    slug: 'teranga-ai',
    title: 'Teranga AI',
    subtitle: "Aide à la décision agricole par IA - 9 langues supportées dont le wolof",
    description: "Système d'aide à la décision agricole propulsé par l'IA pour les agriculteurs ouest-africains. Prédiction de rendement par Machine Learning. Support multilingue innovant avec 9 langues africaines.",
    longDescription: "Système d'aide à la décision agricole propulsé par l'IA pour les agriculteurs ouest-africains. Prédiction de rendement par Machine Learning, optimisation de calendrier cultural, évaluation des risques et support vocal multilingue en 9 langues dont le wolof, le pulaar et le sérère.",
    technologies: ['Python', 'Machine Learning', 'NLP', 'React', 'API REST', 'Groq', 'HuggingFace'],
    liveUrl: 'https://teranga-assistant.onrender.com',
    githubUrl: 'https://github.com/Amethnb2218/teranga-ai',
    category: 'IA',
    period: '2026',
    featured: true,
    number: '03',
    mtcorporate: true
  },
  {
    slug: 'frescoop',
    title: 'FresCOOP',
    subtitle: 'Gestion de coopératives agricoles',
    description: "Solution digitale permettant aux coopératives agricoles de gérer leurs membres, mutualiser les achats et accéder à de nouveaux marchés.",
    longDescription: "Solution digitale permettant aux coopératives agricoles de gérer leurs membres, mutualiser les achats et accéder à de nouveaux marchés. Tableau de bord collaboratif, suivi en temps réel et volet FRESCOOP AI dédié à la visibilité économique et à l'accès au financement des producteurs agricoles. Projet finaliste du POESAM 2026 (Orange).",
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    githubUrl: 'https://github.com/Amethnb2218',
    category: 'Full Stack',
    period: '2026',
    featured: true,
    number: '04',
    mtcorporate: true
  },
  {
    slug: 'aws-migration-bancaire',
    title: 'Architecture Cloud AWS',
    subtitle: 'Scénario de migration bancaire',
    description: "Conception d'une architecture cible AWS VPC dans le cadre d'un scénario de migration bancaire : segmentation réseau, contrôles de sécurité et flux de données.",
    longDescription: "Conception d'une architecture cible AWS dans le cadre d'un scénario de migration bancaire. Découpage VPC, sous-réseaux et segmentation réseau, définition des contrôles de sécurité et des flux de données, en appliquant les principes du AWS Well-Architected Framework.",
    highlights: [
      "Architecture cible AWS VPC pour un scénario de migration bancaire",
      "Conception des sous-réseaux et de la segmentation réseau",
      "Définition des contrôles de sécurité et des flux de données",
      "Application des principes du AWS Well-Architected Framework",
      "Modélisation et visualisation de l'infrastructure cible"
    ],
    technologies: ['AWS', 'VPC', 'IAM', 'EC2', 'RDS', 'CloudFormation', 'Well-Architected'],
    category: 'Cloud',
    period: '2026',
    number: '05'
  },
  {
    slug: 'monitoring-observabilite',
    title: 'Supervision Cloud',
    subtitle: 'Prometheus, Grafana et Alertmanager',
    description: "Stack d'observabilité déployée avec Docker Compose : collecte de métriques d'infrastructure, requêtes PromQL, tableaux de bord Grafana et alerting.",
    longDescription: "Déploiement d'une stack de supervision complète avec Docker Compose : Prometheus pour la collecte des métriques d'infrastructure, requêtes PromQL, tableaux de bord Grafana et mécanismes d'alerte via Alertmanager.",
    highlights: [
      "Déploiement de Prometheus, Grafana et Alertmanager avec Docker Compose",
      "Configuration de la collecte des métriques d'infrastructure",
      "Création et utilisation de requêtes PromQL",
      "Tableaux de bord Grafana pour la supervision de l'infrastructure",
      "Configuration des mécanismes d'alerte avec Alertmanager"
    ],
    technologies: ['Prometheus', 'Grafana', 'Alertmanager', 'PromQL', 'Docker Compose', 'Linux'],
    category: 'DevOps',
    period: '2026',
    number: '06'
  },
  {
    slug: 'wolof-asr',
    title: 'Wolof ASR',
    subtitle: 'Transcription vocale wolof serverless',
    description: "Service cloud de transcription automatique de la parole en wolof. API serverless sur AWS Lambda avec modèle ASR pré-inclus dans l'image Docker.",
    longDescription: "Service cloud de reconnaissance automatique de la parole et de transcription en wolof. API serverless déployée sur AWS Lambda, modèle ASR packagé dans une image Docker pour une inférence rapide en production.",
    highlights: [
      "Service cloud de reconnaissance automatique de la parole en wolof",
      "API serverless déployée sur AWS Lambda",
      "Packaging du modèle ASR dans une image Docker pour l'inférence cloud"
    ],
    technologies: ['Python', 'AWS Lambda', 'Docker', 'Machine Learning'],
    githubUrl: 'https://github.com/Amethnb2218/wolof-transcribe',
    category: 'IA',
    period: '2026',
    number: '07'
  },
  {
    slug: 'ligueyfemme',
    title: 'LigueyFemme',
    subtitle: "Inclusion financière féminine",
    description: "Application mobile d'inclusion financière dédiée aux femmes au Sénégal. Accès micro-crédits, tontines digitales, éducation financière.",
    longDescription: "Application mobile d'inclusion financière dédiée aux femmes au Sénégal. Accès aux micro-crédits, tontines digitales, éducation financière et mise en réseau de femmes entrepreneures.",
    technologies: ['React Native', 'Node.js', 'AWS Lambda', 'MongoDB'],
    githubUrl: 'https://github.com/Amethnb2218',
    category: 'Mobile',
    period: '2026',
    number: '08'
  },
  {
    slug: 'infra-terraform',
    title: 'Infrastructure Terraform',
    subtitle: 'IaC multi-environnement',
    description: "Provisioning automatisé d'infrastructure AWS : VPC, sous-réseaux, instances EC2, load balancers et déploiement EKS.",
    longDescription: "Provisioning automatisé d'infrastructure AWS avec Terraform : VPC, sous-réseaux, instances EC2, load balancers et déploiement EKS. Gestion multi-environnement dev / staging / prod.",
    technologies: ['Terraform', 'AWS', 'Docker', 'CI/CD'],
    githubUrl: 'https://github.com/Amethnb2218',
    category: 'DevOps',
    period: '2026',
    number: '09'
  },
  {
    slug: 'owasp-zap-audit',
    title: 'Audit sécurité Web',
    subtitle: 'Analyse de vulnérabilités avec OWASP ZAP',
    description: "Analyses de sécurité d'applications web avec OWASP ZAP : détection et interprétation des vulnérabilités, restitution technique complète.",
    longDescription: "Réalisation d'analyses de sécurité d'applications web avec OWASP ZAP. Analyse des vulnérabilités et des résultats détectés, présentation de l'architecture de l'application, de la méthodologie d'analyse et démonstration technique.",
    highlights: [
      "Analyses de sécurité applicative avec OWASP ZAP",
      "Analyse des vulnérabilités et des résultats de sécurité détectés",
      "Présentation de l'architecture et de la méthodologie d'analyse",
      "Démonstration technique des scénarios de test"
    ],
    technologies: ['OWASP ZAP', 'Sécurité applicative', 'Linux', 'Rapport de vulnérabilités'],
    category: 'Sécurité',
    period: '2026',
    number: '10'
  },
  {
    slug: 'mail-server',
    title: 'Serveur de messagerie',
    subtitle: 'Exchange, Roundcube, DNS / SMTP / IMAP',
    description: "Installation et configuration d'un environnement de messagerie complet : services DNS, SMTP et IMAP, accès webmail via Roundcube et Exchange.",
    longDescription: "Installation et configuration d'un environnement de serveur de messagerie : mise en place des services DNS, SMTP et IMAP, puis configuration de l'accès aux boîtes via Roundcube et Exchange.",
    highlights: [
      "Installation et configuration d'un serveur de messagerie",
      "Configuration des services DNS, SMTP et IMAP",
      "Accès aux messageries via Roundcube et Exchange"
    ],
    technologies: ['Exchange', 'Roundcube', 'DNS', 'SMTP', 'IMAP', 'Linux'],
    category: 'Systèmes & Réseaux',
    period: '2024 — 2025',
    number: '11'
  },
  {
    slug: 'voip-asterisk',
    title: 'Système VoIP Asterisk',
    subtitle: 'Téléphonie sur IP',
    description: "Installation et configuration d'un système de téléphonie sur IP basé sur Asterisk : extensions et communications internes.",
    longDescription: "Installation et configuration d'un système VoIP basé sur Asterisk : création des extensions, mise en place des communications internes et tests de bon fonctionnement.",
    highlights: [
      "Installation et configuration d'un système VoIP Asterisk",
      "Configuration des extensions et des communications internes"
    ],
    technologies: ['Asterisk', 'VoIP', 'SIP', 'Linux', 'Réseaux IP'],
    category: 'Systèmes & Réseaux',
    period: '2024 — 2025',
    number: '12'
  },
  {
    slug: '4ura',
    title: '4ura.tech',
    subtitle: 'Bien-être et développement personnel',
    description: "Site web dédié au bien-être et développement personnel avec interface apaisante et contenu orienté santé mentale et physique.",
    longDescription: "Site web dédié au bien-être et au développement personnel, avec une interface apaisante et un contenu orienté santé mentale et physique.",
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://4ura.tech',
    category: 'Full Stack',
    period: '2026',
    number: '13'
  }
]

export default projects
