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
    number: '01',
    mtcorporate: true
  },
  {
    slug: 'teranga-ai',
    title: 'Teranga AI',
    subtitle: "Aide à la décision agricole par IA - 9 langues supportées dont le wolof",
    description: "Système d'aide à la décision agricole propulsé par l'IA pour les agriculteurs ouest-africains. Prédiction de rendement par Machine Learning. Support multilingue innovant avec 9 langues africaines.",
    technologies: ['Python', 'Machine Learning', 'NLP', 'React', 'API REST', 'Groq', 'HuggingFace'],
    liveUrl: 'https://teranga-assistant.onrender.com',
    githubUrl: 'https://github.com/Amethnb2218/teranga-ai',
    category: 'IA',
    featured: true,
    number: '02',
    mtcorporate: true
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
    number: '03',
    mtcorporate: true
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
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative' }}
    >
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: '-1rem',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 54, 46, 0.1)',
            borderRadius: '16px',
            zIndex: 0,
            boxShadow: '0 8px 32px rgba(0, 54, 46, 0.08)'
          }}
        />
      )}
      <Link
        to={`/projects/${project.slug}`}
        className="project-row-link"
        style={{
          display: 'grid',
          gridTemplateColumns: '140px 1fr auto',
          alignItems: 'center',
          gap: '2.5rem',
          padding: '2.5rem 0',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          position: 'relative',
          zIndex: 1,
          transform: isHovered ? 'scale(1.01)' : 'scale(1)',
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="project-row-number"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: project.featured ? '4.5rem' : '4rem',
            fontWeight: 700,
            color: isHovered ? '#e8a020' : '#8a8a8a',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            transition: 'all 0.4s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
          animate={{
            x: isHovered ? 10 : 0,
            rotateY: isHovered ? -10 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {project.number}
        </motion.div>

        <div className="project-row-content" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          transform: isHovered ? 'translateX(10px)' : 'translateX(0)',
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.h3
              className="project-row-title"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: project.featured ? '2.5rem' : '2rem',
                fontWeight: 700,
                color: '#00362e',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                margin: 0,
                transition: 'all 0.3s ease',
                transform: isHovered ? 'perspective(800px) rotateX(-3deg) translateZ(20px)' : 'perspective(800px) rotateX(0deg) translateZ(0px)',
                textShadow: isHovered ? '0 8px 16px rgba(0, 54, 46, 0.15)' : 'none'
              }}
            >
              {project.title}
            </motion.h3>
            {project.mtcorporate && (
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#e8a020',
                  padding: '0.35rem 0.75rem',
                  background: 'rgba(232, 160, 32, 0.1)',
                  border: '1px solid rgba(232, 160, 32, 0.3)',
                  borderRadius: '100px',
                  fontWeight: 600
                }}
              >
                MTCorporate
              </span>
            )}
          </div>

          <motion.p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: isHovered ? '#3a5450' : '#8a8a8a',
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
          className="project-row-arrow"
          animate={{ x: isHovered ? 10 : 0, opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e8a020" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </Link>
    </motion.div>
  )
}

function Projects() {
  const featuredProject = projects[0]
  const otherProjects = projects.slice(1)

  return (
    <>
      <style>{`
        .projects-page {
          min-height: 100vh;
          padding: 120px 2rem 80px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .projects-hero {
          margin-bottom: 60px;
          text-align: center;
        }
        .projects-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          color: #00362e;
          letter-spacing: '-0.04em';
          line-height: 1;
          margin-bottom: 2rem;
          background: linear-gradient(90deg, #00362e 0%, #00362e 50%, #e8a020 100%);
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textFillAnimation 1.5s ease-in-out forwards;
          text-shadow:
            1px 1px 0 rgba(0,54,46,0.1),
            2px 2px 0 rgba(0,54,46,0.08),
            3px 3px 0 rgba(0,54,46,0.06),
            4px 4px 0 rgba(0,54,46,0.04),
            5px 5px 0 rgba(0,54,46,0.02);
        }
        @keyframes textFillAnimation {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: 0 0;
          }
        }
        .projects-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.2rem;
          color: #3a5450;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto;
        }
        .projects-list {
          display: flex;
          flex-direction: column;
        }
        .projects-featured {
          margin-bottom: 4rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 54, 46, 0.1);
          border-radius: 24px;
          transition: all 0.4s ease;
        }
        .projects-featured:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 54, 46, 0.12);
        }
        .projects-featured-badge {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #e8a020;
          padding: 0.5rem 1rem;
          background: rgba(232, 160, 32, 0.1);
          border: 1px solid rgba(232, 160, 32, 0.3);
          border-radius: 100px;
          margin-bottom: 1.5rem;
        }
        .projects-featured-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #00362e;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }
        .projects-featured-desc {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: #3a5450;
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .projects-featured-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .projects-featured-tech-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 54, 46, 0.05);
          border: 1px solid rgba(0, 54, 46, 0.1);
          border-radius: 8px;
          color: #3a5450;
        }
        .projects-featured-links {
          display: flex;
          gap: 1rem;
        }
        .projects-featured-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 2rem;
          background: #e8a020;
          color: #e8efec;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.4s ease;
        }
        .projects-featured-link:hover {
          background: #e09b1a;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(232, 160, 32, 0.3);
        }
        .projects-featured-link.secondary {
          background: transparent;
          color: #e8a020;
          border: 2px solid #e8a020;
        }
        .projects-featured-link.secondary:hover {
          background: rgba(232, 160, 32, 0.1);
        }
        .projects-github-stats {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #8a8a8a;
          text-align: center;
          margin-bottom: 2rem;
        }
        .projects-github-highlight {
          color: #e8a020;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .projects-page {
            padding: 120px 1.5rem 80px;
          }
          .projects-hero {
            margin-bottom: 3rem;
          }
          .projects-title {
            font-size: clamp(2.5rem, 10vw, 3.5rem);
            margin-bottom: 1.5rem;
          }
          .projects-subtitle {
            font-size: 1rem;
          }
          .projects-github-stats {
            font-size: 0.75rem;
            margin-bottom: 1.5rem;
          }
          .projects-featured {
            padding: 2rem;
            margin-bottom: 3rem;
          }
          .projects-featured-badge {
            font-size: 0.65rem;
            padding: 0.4rem 0.9rem;
          }
          .projects-featured-title {
            font-size: clamp(2rem, 8vw, 2.5rem);
          }
          .projects-featured-desc {
            font-size: 1rem;
            line-height: 1.7;
          }
          .projects-featured-tech {
            gap: 0.6rem;
          }
          .projects-featured-tech-item {
            font-size: 0.75rem;
            padding: 0.4rem 0.8rem;
          }
          .projects-featured-links {
            flex-direction: column;
            gap: 1rem;
          }
          .projects-featured-link {
            width: 100%;
            justify-content: center;
            padding: 0.9rem 1.5rem;
          }
          .project-row-link {
            grid-template-columns: 60px 1fr !important;
            gap: 1.5rem !important;
            padding: 2rem 0 !important;
          }
          .project-row-number {
            font-size: 2.5rem !important;
          }
          .project-row-title {
            font-size: 1.5rem !important;
          }
          .project-row-arrow {
            display: none !important;
          }
          .project-row-content {
            transform: translateX(0) !important;
          }
        }
        @media (max-width: 480px) {
          .projects-page {
            padding: 100px 1rem 60px;
          }
          .projects-title {
            font-size: clamp(2rem, 12vw, 3rem);
          }
          .projects-subtitle {
            font-size: 0.95rem;
          }
          .projects-featured {
            padding: 1.5rem;
          }
          .projects-featured-title {
            font-size: clamp(1.8rem, 10vw, 2.2rem);
          }
          .project-row-link {
            grid-template-columns: 50px 1fr !important;
            gap: 1rem !important;
            padding: 1.5rem 0 !important;
          }
          .project-row-number {
            font-size: 2rem !important;
          }
          .project-row-title {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
      <motion.main
        className="projects-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
          <motion.div
            className="projects-github-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="projects-github-highlight">30+ repositories</span> sur GitHub
          </motion.div>
        </div>

        <motion.div
          className="projects-featured"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="projects-featured-badge">Projet en vedette</div>
          <h2 className="projects-featured-title">{featuredProject.title}</h2>
          <p className="projects-featured-desc">{featuredProject.description}</p>
          <div className="projects-featured-tech">
            {featuredProject.technologies.map((tech, i) => (
              <span key={i} className="projects-featured-tech-item">{tech}</span>
            ))}
          </div>
          <div className="projects-featured-links">
            <a href={featuredProject.liveUrl} target="_blank" rel="noreferrer" className="projects-featured-link">
              Voir le site
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4L4 12M12 4v6M12 4H6" />
              </svg>
            </a>
            <a href={featuredProject.githubUrl} target="_blank" rel="noreferrer" className="projects-featured-link secondary">
              Code source
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        <div className="projects-list">
          {otherProjects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </motion.main>
    </>
  )
}

export default Projects
