import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'

const projects = [
  {
    slug: 'jolof-era',
    title: "Jolof'Era",
    subtitle: 'Plateforme SaaS de réservation',
    description: "Plateforme SaaS multi-tenant permettant aux commerçants et prestataires de gérer leurs réservations en ligne, leur catalogue produits et leurs paiements. Notifications en temps réel et gestion multi-boutiques.",
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'WebSocket', 'AWS'],
    liveUrl: 'https://jolofera.com',
    githubUrl: 'https://github.com/Amethnb2218/flashrv-react',
    category: 'Full Stack',
    featured: true
  },
  {
    slug: 'teranga-ai',
    title: 'Teranga AI',
    subtitle: "Aide à la décision agricole par IA",
    description: "Système d'aide à la décision agricole propulsé par l'IA pour les agriculteurs ouest-africains. Prédiction de rendement par Machine Learning, optimisation de calendrier cultural, évaluation des risques et support vocal multilingue en 9 langues dont le wolof, le pulaar et le sérère.",
    technologies: ['Python', 'Machine Learning', 'NLP', 'React', 'API REST', 'Groq', 'HuggingFace'],
    liveUrl: 'https://teranga-assistant.onrender.com',
    githubUrl: 'https://github.com/Amethnb2218/teranga-ai',
    category: 'IA',
    featured: true
  },
  {
    slug: 'frescoop',
    title: 'FresCOOP',
    subtitle: 'Gestion de coopératives agricoles',
    description: "Solution digitale permettant aux coopératives agricoles de gérer leurs membres, mutualiser les achats et accéder à de nouveaux marchés. Tableau de bord collaboratif et suivi en temps réel.",
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    githubUrl: 'https://github.com/Amethnb2218',
    category: 'Full Stack',
    featured: true
  },
  {
    slug: 'ligueyfemme',
    title: 'LigueyFemme',
    subtitle: "Inclusion financière féminine",
    description: "Application mobile d'inclusion financière dédiée aux femmes au Sénégal. Accès micro-crédits, tontines digitales, éducation financière et mise en réseau de femmes entrepreneures.",
    technologies: ['React Native', 'Node.js', 'AWS Lambda', 'MongoDB'],
    githubUrl: 'https://github.com/Amethnb2218',
    category: 'Mobile'
  },
  {
    slug: 'wolof-asr',
    title: 'Wolof ASR',
    subtitle: 'Transcription vocale wolof',
    description: "Service cloud de transcription automatique de la parole en wolof. API serverless sur AWS Lambda avec modèle ASR pré-inclus dans l'image Docker pour inférence rapide.",
    technologies: ['Python', 'AWS Lambda', 'Docker', 'Machine Learning'],
    githubUrl: 'https://github.com/Amethnb2218/wolof-transcribe',
    category: 'IA'
  },
  {
    slug: 'devops-pipeline',
    title: 'Pipeline DevOps',
    subtitle: 'CI/CD end-to-end',
    description: "Pipeline DevOps complète : conteneurisation Docker multi-stage, CI/CD Jenkins, analyse qualité SonarQube, orchestration Kubernetes, IaC Terraform, monitoring Prometheus/Grafana et scan sécurité Trivy.",
    technologies: ['Docker', 'Jenkins', 'Kubernetes', 'Terraform', 'SonarQube', 'Prometheus', 'Grafana', 'Trivy'],
    githubUrl: 'https://github.com/Amethnb2218/docker-REACTPORTFOLIO',
    category: 'DevOps'
  },
  {
    slug: '4ura',
    title: '4ura.tech',
    subtitle: 'Bien-être et développement personnel',
    description: "Site web dédié au bien-être et développement personnel avec interface apaisante et contenu orienté santé mentale et physique.",
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://4ura.tech',
    category: 'Full Stack'
  },
  {
    slug: 'infra-terraform',
    title: 'Infrastructure Terraform',
    subtitle: 'IaC multi-environnement',
    description: "Provisioning automatisé d'infrastructure AWS : VPC, sous-réseaux, instances EC2, load balancers et déploiement EKS. Gestion multi-environnement dev/staging/prod.",
    technologies: ['Terraform', 'AWS', 'Docker', 'CI/CD'],
    githubUrl: 'https://github.com/Amethnb2218',
    category: 'DevOps'
  }
]

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <motion.div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2rem',
          padding: '2rem'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: '#00473e' }}>
          Projet introuvable
        </h1>
        <Link to="/projects" style={{ color: '#faae2b', fontSize: '1.1rem', textDecoration: 'none' }}>
          Retour aux projets
        </Link>
      </motion.div>
    )
  }

  return (
    <>
      <style>{`
        .project-detail-page {
          min-height: 100vh;
          padding: 200px 2rem 150px;
          max-width: 900px;
          margin: 0 auto;
        }
        .project-detail-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #475d5b;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          margin-bottom: 3rem;
          transition: all 0.3s ease;
        }
        .project-detail-back:hover {
          color: #faae2b;
          gap: 0.75rem;
        }
        .project-detail-category {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #faae2b;
          margin-bottom: 2rem;
        }
        .project-detail-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 8vw, 4.5rem);
          font-weight: 700;
          color: #00473e;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .project-detail-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 500;
          color: #475d5b;
          margin-bottom: 3rem;
          letter-spacing: -0.01em;
        }
        .project-detail-divider {
          width: 100%;
          height: 1px;
          background: rgba(0, 0, 0, 0.06);
          margin: 3rem 0;
        }
        .project-detail-description {
          font-family: 'Inter', sans-serif;
          font-size: 1.15rem;
          line-height: 2.0;
          color: #475d5b;
          margin-bottom: 3rem;
        }
        .project-detail-section-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8a8a8a;
          margin-bottom: 1.5rem;
        }
        .project-detail-tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 3rem;
        }
        .project-detail-tech-tag {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #475d5b;
          transition: color 0.3s ease;
        }
        .project-detail-tech-tag:hover {
          color: #00473e;
        }
        .project-detail-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .project-detail-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 2rem;
          background: transparent;
          color: #00473e;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 100px;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .project-detail-link:hover {
          background: #faae2b;
          color: #f2f7f5;
          border-color: #faae2b;
          transform: translateY(-2px);
        }
        .project-detail-link.primary {
          background: #faae2b;
          color: #f2f7f5;
          border-color: #faae2b;
        }
        .project-detail-link.primary:hover {
          background: #e09b1a;
          border-color: #e09b1a;
        }
      `}</style>
      <motion.main
        className="project-detail-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/projects" className="project-detail-back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 12L6 8l4-4" />
            </svg>
            Retour aux projets
          </Link>
        </motion.div>

        <motion.div
          className="project-detail-category"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.category}
        </motion.div>

        <motion.h1
          className="project-detail-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.title}
        </motion.h1>

        <motion.p
          className="project-detail-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.subtitle}
        </motion.p>

        <motion.div
          className="project-detail-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          className="project-detail-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="project-detail-section-title">Technologies</div>
          <div className="project-detail-tech-list">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={tech}
                className="project-detail-tech-tag"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.03 }}
              >
                {tech}
                {index < project.technologies.length - 1 && ','}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="project-detail-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="project-detail-section-title">Liens</div>
          <div className="project-detail-links">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="project-detail-link primary"
              >
                Voir le projet
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 4L4 12M12 4v6M12 4H6" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="project-detail-link"
              >
                Code source
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      </motion.main>
    </>
  )
}

export default ProjectDetail
