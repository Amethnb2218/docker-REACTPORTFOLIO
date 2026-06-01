import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -8, y: x * 8 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link
        to={`/projects/${project._id}`}
        className="project-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1)`,
        }}
      >
        {/* Image / Gradient placeholder */}
        <div className="project-card-image">
          {project.imageUrl ? (
            <img src={project.imageUrl} alt={project.title} />
          ) : (
            <div className="project-card-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3b82f6', opacity: 0.5 }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="project-card-content">
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.description}</p>

          <div className="project-card-tags">
            {project.technologies && project.technologies.map((tech) => (
              <span key={tech} className="project-tag">{tech}</span>
            ))}
          </div>

          <div className="project-card-footer">
            <span className="project-view-link">
              Voir
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => {
        setProjects([
          { _id: '1', title: 'Portfolio React', description: 'Application SPA moderne avec React, Vite et animations fluides. Architecture composants reutilisables.', technologies: ['React', 'Vite', 'Framer Motion'], imageUrl: '' },
          { _id: '2', title: 'API REST Express', description: 'Backend robuste avec Express.js, MongoDB et authentification JWT. Documentation Swagger integree.', technologies: ['Node.js', 'Express', 'MongoDB'], imageUrl: '' },
          { _id: '3', title: 'Infrastructure Docker', description: 'Conteneurisation multi-services avec orchestration Docker Compose et reverse proxy Nginx.', technologies: ['Docker', 'Docker Compose', 'Nginx'], imageUrl: '' },
          { _id: '4', title: 'LigueyFemme', description: 'Application mobile React Native pour l\'inclusion financiere des femmes au Senegal. Microfinance et formations.', technologies: ['React Native', 'Node.js', 'MongoDB'], imageUrl: '' },
          { _id: '5', title: 'Pipeline CI/CD', description: 'Automatisation complète du deploiement avec Jenkins, Docker et AWS. Tests automatises et monitoring.', technologies: ['Jenkins', 'AWS', 'Docker', 'Bash'], imageUrl: '' },
          { _id: '6', title: 'Dashboard Analytics', description: 'Tableau de bord temps reel avec visualisations interactives pour le suivi des KPI entreprise.', technologies: ['React', 'D3.js', 'PostgreSQL'], imageUrl: '' },
          { _id: '7', title: 'Microservices Architecture', description: 'Architecture distribuee avec communication asynchrone et service discovery integre.', technologies: ['Node.js', 'RabbitMQ', 'Docker'], imageUrl: '' },
          { _id: '8', title: 'Cloud Migration AWS', description: 'Migration infrastructure on-premise vers AWS avec optimisation des couts et haute disponibilite.', technologies: ['AWS', 'Terraform', 'Linux'], imageUrl: '' }
        ])
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: '#71717a', fontSize: '0.9rem', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Chargement...
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
          margin-bottom: 3.5rem;
        }
        .projects-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .projects-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          padding: 0.3rem 0.7rem;
          border-radius: 100px;
        }
        .projects-subtitle {
          font-size: 1rem;
          color: #71717a;
          line-height: 1.7;
          max-width: 550px;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .project-card {
          display: block;
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        .project-card:hover {
          transform: perspective(800px) scale(1.02) !important;
          border-color: rgba(59, 130, 246, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.05);
        }
        .project-card-image {
          width: 100%;
          height: 180px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(135deg, #1a1a2e 0%, #0f0f0f 100%);
        }
        .project-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-card:hover .project-card-image img {
          transform: scale(1.05);
        }
        .project-card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(16, 185, 129, 0.03) 100%);
        }
        .project-card-content {
          padding: 1.5rem;
        }
        .project-card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f5f5f5;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .project-card-desc {
          font-size: 0.85rem;
          color: #71717a;
          line-height: 1.6;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }
        .project-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 500;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.15);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          letter-spacing: -0.01em;
        }
        .project-card-footer {
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }
        .project-view-link {
          color: #3b82f6;
          font-size: 0.82rem;
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
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Projets
            <span className="projects-count">{projects.length}</span>
          </motion.h1>
          <motion.p
            className="projects-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            Une selection de projets qui illustrent mes competences en developpement full stack,
            DevOps et architecture logicielle.
          </motion.p>
        </div>

        {projects.length === 0 && (
          <p style={{ textAlign: 'center', color: '#71717a', fontSize: '1rem' }}>
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
