import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const projects = [
  {
    slug: 'jolof-era',
    title: "Jolof'Era",
    subtitle: 'Plateforme SaaS de réservation',
    description: "Plateforme SaaS multi-tenant permettant aux commerçants et prestataires de gérer leurs réservations en ligne, leur catalogue produits et leurs paiements.",
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'WebSocket', 'AWS'],
    liveUrl: 'https://jolofera.com',
    githubUrl: 'https://github.com/Amethnb2218/flashrv-react',
    category: 'Full Stack',
    featured: true,
    number: '01'
  },
  {
    slug: 'teranga-ai',
    title: 'Teranga AI',
    subtitle: "Aide à la décision agricole par IA",
    description: "Système d'aide à la décision agricole propulsé par l'IA pour les agriculteurs ouest-africains. Prédiction de rendement par Machine Learning.",
    technologies: ['Python', 'Machine Learning', 'NLP', 'React', 'API REST', 'Groq', 'HuggingFace'],
    liveUrl: 'https://teranga-assistant.onrender.com',
    githubUrl: 'https://github.com/Amethnb2218/teranga-ai',
    category: 'IA',
    featured: true,
    number: '02'
  },
  {
    slug: 'frescoop',
    title: 'FresCOOP',
    subtitle: 'Gestion de coopératives agricoles',
    description: "Solution digitale permettant aux coopératives agricoles de gérer leurs membres, mutualiser les achats et accéder à de nouveaux marchés.",
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    githubUrl: 'https://github.com/Amethnb2218',
    category: 'Full Stack',
    featured: true,
    number: '03'
  },
  {
    slug: 'ligueyfemme',
    title: 'LigueyFemme',
    subtitle: "Inclusion financière féminine",
    description: "Application mobile d'inclusion financière dédiée aux femmes au Sénégal. Accès micro-crédits, tontines digitales, éducation financière.",
    technologies: ['React Native', 'Node.js', 'AWS Lambda', 'MongoDB'],
    githubUrl: 'https://github.com/Amethnb2218',
    category: 'Mobile',
    number: '04'
  },
  {
    slug: 'wolof-asr',
    title: 'Wolof ASR',
    subtitle: 'Transcription vocale wolof',
    description: "Service cloud de transcription automatique de la parole en wolof. API serverless sur AWS Lambda avec modèle ASR pré-inclus dans l'image Docker.",
    technologies: ['Python', 'AWS Lambda', 'Docker', 'Machine Learning'],
    githubUrl: 'https://github.com/Amethnb2218/wolof-transcribe',
    category: 'IA',
    number: '05'
  },
  {
    slug: 'devops-pipeline',
    title: 'Pipeline DevOps',
    subtitle: 'CI/CD end-to-end',
    description: "Pipeline DevOps complète : conteneurisation Docker multi-stage, CI/CD Jenkins, analyse qualité SonarQube, orchestration Kubernetes.",
    technologies: ['Docker', 'Jenkins', 'Kubernetes', 'Terraform', 'SonarQube', 'Prometheus', 'Grafana', 'Trivy'],
    githubUrl: 'https://github.com/Amethnb2218/docker-REACTPORTFOLIO',
    category: 'DevOps',
    number: '06'
  },
  {
    slug: '4ura',
    title: '4ura.tech',
    subtitle: 'Bien-être et développement personnel',
    description: "Site web dédié au bien-être et développement personnel avec interface apaisante et contenu orienté santé mentale et physique.",
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://4ura.tech',
    category: 'Full Stack',
    number: '07'
  },
  {
    slug: 'infra-terraform',
    title: 'Infrastructure Terraform',
    subtitle: 'IaC multi-environnement',
    description: "Provisioning automatisé d'infrastructure AWS : VPC, sous-réseaux, instances EC2, load balancers et déploiement EKS.",
    technologies: ['Terraform', 'AWS', 'Docker', 'CI/CD'],
    githubUrl: 'https://github.com/Amethnb2218',
    category: 'DevOps',
    number: '08'
  }
]

function ProjectRow({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/projects/${project.slug}`}
        style={{
          display: 'grid',
          gridTemplateColumns: '140px 1fr auto',
          alignItems: 'center',
          gap: '2.5rem',
          padding: '2.5rem 0',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: project.featured ? '4.5rem' : '4rem',
            fontWeight: 700,
            color: isHovered ? '#faae2b' : '#8a8a8a',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            transition: 'color 0.4s ease'
          }}
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.number}
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <motion.h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: project.featured ? '2.5rem' : '2rem',
              fontWeight: 700,
              color: '#00473e',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              margin: 0,
              transition: 'color 0.3s ease'
            }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: isHovered ? '#475d5b' : '#8a8a8a',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '600px',
              transition: 'color 0.3s ease'
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {project.subtitle}
          </motion.p>

          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: isHovered ? '0.5rem' : 0,
              transition: 'margin-top 0.3s ease'
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {project.technologies.slice(0, 4).map(tech => (
              <span
                key={tech}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: '#8a8a8a',
                  letterSpacing: '0.02em'
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: '#8a8a8a'
                }}
              >
                +{project.technologies.length - 4}
              </span>
            )}
          </motion.div>
        </div>

        <motion.div
          animate={{ x: isHovered ? 10 : 0, opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#faae2b" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </Link>
    </motion.div>
  )
}

function Projects() {
  return (
    <>
      <style>{`
        .projects-page {
          min-height: 100vh;
          padding: 200px 2rem 150px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .projects-hero {
          margin-bottom: 150px;
          text-align: center;
        }
        .projects-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(4rem, 10vw, 7rem);
          font-weight: 700;
          color: #00473e;
          letter-spacing: '-0.04em';
          line-height: 1;
          margin-bottom: 2rem;
        }
        .projects-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.2rem;
          color: #475d5b;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto;
        }
        .projects-list {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 768px) {
          .projects-page {
            padding: 160px 1.5rem 100px;
          }
          .projects-hero {
            margin-bottom: 100px;
          }
        }
      `}</style>
      <motion.main
        className="projects-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="projects-hero">
          <motion.h1
            className="projects-title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Projets
          </motion.h1>
          <motion.p
            className="projects-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Une sélection de solutions Full Stack, DevOps, Mobile et IA qui illustrent mon expertise technique et ma passion pour l'innovation.
          </motion.p>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </motion.main>
    </>
  )
}

export default Projects
