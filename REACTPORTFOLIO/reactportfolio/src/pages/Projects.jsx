import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href={project.liveUrl || project.githubUrl || '#'}
        target={project.liveUrl || project.githubUrl ? '_blank' : '_self'}
        rel="noreferrer"
        className="project-card"
      >
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>

        <div className="project-card-tags">
          {project.technologies && project.technologies.map((tech) => (
            <span key={tech} className="project-tag">{tech}</span>
          ))}
        </div>

        <div className="project-card-footer">
          <span className="project-view-link">
            {project.liveUrl ? 'Voir en ligne' : 'En savoir plus'}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </a>
    </motion.div>
  )
}

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const defaultProjects = [
    {
      _id: '1',
      title: 'Jolofera',
      description: 'Plateforme SaaS multi-tenant avec système de réservation et e-commerce. React + Node.js + PostgreSQL + Prisma ORM avec WebSocket realtime et paiement intégré.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'WebSocket', 'AWS'],
      liveUrl: 'https://jolofera.com',
      githubUrl: 'https://github.com/Amethnb2218'
    },
    {
      _id: '2',
      title: 'Teranga AI',
      description: 'Plateforme d\'intelligence artificielle avec Machine Learning pour l\'analyse de données. Modèles prédictifs et traitement du langage naturel.',
      technologies: ['Python', 'Machine Learning', 'NLP', 'React', 'API REST'],
      githubUrl: 'https://github.com/Amethnb2218'
    },
    {
      _id: '3',
      title: 'FresCOOP',
      description: 'Application sélectionnée à deux hackathons. Solution coopérative digitale pour la gestion et la mise en réseau de coopératives agricoles.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      githubUrl: 'https://github.com/Amethnb2218'
    },
    {
      _id: '4',
      title: 'LigueyFemme',
      description: 'Application mobile d\'inclusion financière pour femmes au Sénégal. Backend Node.js avec AWS Lambda et base de données distribuée.',
      technologies: ['React Native', 'Node.js', 'AWS Lambda', 'MongoDB'],
      githubUrl: 'https://github.com/Amethnb2218'
    },
    {
      _id: '5',
      title: 'Wolof ASR Lambda',
      description: 'Service de reconnaissance vocale wolof déployé sur AWS Lambda avec Docker. Modèle ASR pré-inclus dans l\'image Docker pour inférence rapide.',
      technologies: ['Python', 'AWS Lambda', 'Docker', 'Machine Learning'],
      githubUrl: 'https://github.com/Amethnb2218'
    },
    {
      _id: '6',
      title: 'Docker React Portfolio',
      description: 'Ce portfolio avec infrastructure Docker complète. Pipeline CI/CD avec Jenkins, déploiement Kubernetes et Infrastructure as Code avec Terraform.',
      technologies: ['React', 'Docker', 'Jenkins', 'Kubernetes', 'Terraform'],
      githubUrl: 'https://github.com/Amethnb2218/docker-REACTPORTFOLIO'
    },
    {
      _id: '7',
      title: 'API Portfolio Express',
      description: 'API REST complète avec Express.js, MongoDB, authentification JWT, upload de fichiers avec Multer et suite de tests automatisés.',
      technologies: ['Express.js', 'MongoDB', 'JWT', 'Multer', 'Tests'],
      githubUrl: 'https://github.com/Amethnb2218'
    },
    {
      _id: '8',
      title: 'Infrastructure Terraform',
      description: 'Infrastructure as Code pour déploiement cloud multi-environnement. Provisioning AWS avec Terraform, configuration automatisée et monitoring.',
      technologies: ['Terraform', 'AWS', 'Docker', 'CI/CD'],
      githubUrl: 'https://github.com/Amethnb2218'
    },
    {
      _id: '9',
      title: '4ura.tech',
      description: 'Site web de bien-être et développement personnel. Design soigné, expérience utilisateur fluide et contenu orienté santé mentale et physique.',
      technologies: ['React', 'Tailwind CSS', 'Vite'],
      liveUrl: 'https://4ura.tech'
    }
  ]

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    fetch('/api/projects', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeout)
        if (data.length > 0) {
          setProjects(data)
        } else {
          setProjects(defaultProjects)
        }
        setLoading(false)
      })
      .catch(() => {
        clearTimeout(timeout)
        setProjects(defaultProjects)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{ width: 32, height: 32, border: '2px solid rgba(200,121,65,0.1)', borderTopColor: '#c87941', borderRadius: '50%' }}
        />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: '#555', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}
        >
          CHARGEMENT...
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .projects-page {
          min-height: 100vh;
          padding: 8rem 2rem 4rem;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .projects-header {
          margin-bottom: 4rem;
        }
        .projects-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #e8e8e8;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }
        .projects-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          color: #8a8a8a;
          line-height: 1.7;
          max-width: 600px;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .project-card {
          display: block;
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 2rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .project-card:hover {
          transform: translateY(-2px);
          border-color: rgba(200, 121, 65, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        .project-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #e8e8e8;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .project-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #8a8a8a;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .project-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .project-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          color: #9e5e30;
          background: rgba(200, 121, 65, 0.08);
          border: 1px solid rgba(200, 121, 65, 0.15);
          padding: 0.3rem 0.7rem;
          border-radius: 6px;
          letter-spacing: -0.01em;
        }
        .project-card-footer {
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .project-view-link {
          color: #c87941;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.3s ease;
        }
        .project-card:hover .project-view-link {
          gap: 10px;
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .projects-page {
            padding: 7rem 1.5rem 3rem;
          }
        }
      `}</style>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="projects-page"
      >
        <div className="projects-header">
          <motion.h1
            className="projects-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Projets
          </motion.h1>
          <motion.p
            className="projects-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Une sélection de projets qui illustrent mes compétences en développement full stack,
            DevOps et architecture logicielle.
          </motion.p>
        </div>

        {projects.length === 0 && (
          <p style={{ textAlign: 'center', color: '#8a8a8a', fontSize: '1rem' }}>
            Aucun projet pour le moment.
          </p>
        )}

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </motion.main>
    </>
  )
}

export default Projects
