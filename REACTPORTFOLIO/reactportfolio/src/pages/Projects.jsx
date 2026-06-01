import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
          { _id: '3', title: 'Infrastructure Docker', description: 'Conteneurisation multi-services avec orchestration Docker Compose et reverse proxy Nginx.', technologies: ['Docker', 'Docker Compose', 'Nginx'], imageUrl: '' }
        ])
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}>
          <div style={styles.loaderDot} />
          <div style={{ ...styles.loaderDot, animationDelay: '0.2s' }} />
          <div style={{ ...styles.loaderDot, animationDelay: '0.4s' }} />
        </div>
      </div>
    )
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.main}
    >
      <div style={styles.header}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={styles.headerLabel}
        >
          Portfolio
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={styles.heading}
        >
          Mes Projets
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={styles.subtitle}
        >
          Une selection de projets qui illustrent mes competences en developpement full stack,
          DevOps et architecture logicielle.
        </motion.p>
      </div>

      {projects.length === 0 && <p style={styles.empty}>Aucun projet pour le moment.</p>}

      <div style={styles.grid}>
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.4, duration: 0.6 }}
          >
            <Link to={`/projects/${project._id}`} style={styles.cardLink}>
              <div style={styles.card}>
                {/* Image section */}
                <div style={styles.cardImageWrapper}>
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} style={styles.cardImage} />
                  ) : (
                    <div style={styles.cardImagePlaceholder}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(108, 99, 255, 0.5)" strokeWidth="1.5">
                        <rect x="2" y="2" width="20" height="20" rx="4"/>
                        <path d="m9 10 3 3 3-3"/>
                        <circle cx="8" cy="8" r="1.5"/>
                      </svg>
                    </div>
                  )}
                  <div style={styles.cardImageOverlay} />
                </div>

                {/* Content section */}
                <div style={styles.cardContent}>
                  <div style={styles.cardTop}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3h7l2 2h9v15H3z"/>
                    </svg>
                    <span style={styles.cardDate}>
                      {project.createdAt ? new Date(project.createdAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }) : ''}
                    </span>
                  </div>

                  <h3 style={styles.cardTitle}>{project.title}</h3>
                  <p style={styles.cardDesc}>{project.description}</p>

                  <div style={styles.tags}>
                    {project.technologies && project.technologies.map((tech) => (
                      <span key={tech} style={styles.tag}>{tech}</span>
                    ))}
                  </div>

                  <div style={styles.cardFooter}>
                    <span style={styles.viewMore}>
                      Voir le projet
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '6px' }}>
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '8rem 2rem 4rem'
  },
  loaderContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    display: 'flex',
    gap: '8px'
  },
  loaderDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'var(--accent-primary)',
    animation: 'float 1.5s ease-in-out infinite'
  },
  header: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 4rem'
  },
  headerLabel: {
    display: 'inline-block',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--accent-primary)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '1rem'
  },
  heading: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '1.2rem',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '1.05rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.8'
  },
  empty: {
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontSize: '1.2rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  cardLink: {
    textDecoration: 'none',
    display: 'block'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative'
  },
  cardImageWrapper: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.05), rgba(0, 212, 170, 0.05))'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.08), rgba(0, 212, 170, 0.05))'
  },
  cardImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: 'linear-gradient(to top, rgba(10, 10, 15, 1), transparent)',
    pointerEvents: 'none'
  },
  cardContent: {
    padding: '1.5rem 1.75rem 1.75rem'
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.75rem'
  },
  cardDate: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: '500'
  },
  cardTitle: {
    color: 'var(--text-primary)',
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
    letterSpacing: '-0.3px',
    lineHeight: '1.3'
  },
  cardDesc: {
    color: 'var(--text-secondary)',
    marginBottom: '1.25rem',
    lineHeight: '1.7',
    fontSize: '0.92rem'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.25rem'
  },
  tag: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: 'var(--accent-secondary)',
    backgroundColor: 'rgba(0, 212, 170, 0.08)',
    border: '1px solid rgba(0, 212, 170, 0.15)',
    padding: '0.3rem 0.75rem',
    borderRadius: '6px',
    fontFamily: 'var(--font-mono)'
  },
  cardFooter: {
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
  },
  viewMore: {
    color: 'var(--accent-primary)',
    fontSize: '0.88rem',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.3s ease'
  }
}

export default Projects
