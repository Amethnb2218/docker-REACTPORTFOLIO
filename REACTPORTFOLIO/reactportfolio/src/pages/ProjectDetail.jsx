import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader} />
      </div>
    )
  }

  if (!project) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={styles.main}
      >
        <div style={styles.notFound}>
          <h2 style={styles.notFoundTitle}>Projet introuvable</h2>
          <p style={styles.notFoundText}>Ce projet n'existe pas ou a ete supprime.</p>
          <Link to="/projects" style={styles.backButton}>Retour aux projets</Link>
        </div>
      </motion.main>
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
      {/* Back navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link to="/projects" style={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Retour aux projets
        </Link>
      </motion.div>

      <div style={styles.container}>
        {/* Hero Image */}
        {project.imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={styles.imageWrapper}
          >
            <img src={project.imageUrl} alt={project.title} style={styles.image} />
            <div style={styles.imageGlow} />
          </motion.div>
        )}

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={styles.infoSection}
        >
          <div style={styles.metaRow}>
            <span style={styles.metaLabel}>Projet</span>
            {project.createdAt && (
              <span style={styles.metaDate}>
                {new Date(project.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </span>
            )}
          </div>

          <h1 style={styles.title}>{project.title}</h1>

          <p style={styles.description}>{project.description}</p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div style={styles.techSection}>
              <h3 style={styles.sectionLabel}>Technologies</h3>
              <div style={styles.tags}>
                {project.technologies.map((tech) => (
                  <span key={tech} style={styles.tag}>{tech}</span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div style={styles.linksSection}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" style={styles.linkBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
                <span>Code source</span>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" style={styles.linkBtnPrimary}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                <span>Voir en ligne</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '7rem 2rem 4rem',
    maxWidth: '900px',
    margin: '0 auto'
  },
  loaderContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(108, 99, 255, 0.2)',
    borderTopColor: 'var(--accent-primary)',
    borderRadius: '50%',
    animation: 'float 1s linear infinite'
  },
  notFound: {
    textAlign: 'center',
    padding: '4rem 2rem'
  },
  notFoundTitle: {
    fontSize: '2rem',
    color: 'var(--text-primary)',
    marginBottom: '1rem'
  },
  notFoundText: {
    color: 'var(--text-secondary)',
    marginBottom: '2rem'
  },
  backButton: {
    display: 'inline-block',
    padding: '0.8rem 2rem',
    background: 'var(--accent-primary)',
    color: '#fff',
    borderRadius: '10px',
    fontWeight: '600'
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '2.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    transition: 'all 0.3s ease'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem'
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.06)'
  },
  image: {
    width: '100%',
    maxHeight: '450px',
    objectFit: 'cover',
    display: 'block'
  },
  imageGlow: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(10, 10, 15, 0.4), transparent 50%)',
    pointerEvents: 'none'
  },
  infoSection: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '20px',
    padding: '2.5rem'
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem'
  },
  metaLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: 'var(--accent-primary)',
    padding: '0.3rem 0.8rem',
    background: 'rgba(108, 99, 255, 0.1)',
    borderRadius: '6px'
  },
  metaDate: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)'
  },
  title: {
    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '1.5rem',
    letterSpacing: '-0.5px',
    lineHeight: '1.2'
  },
  description: {
    color: 'var(--text-secondary)',
    fontSize: '1.05rem',
    lineHeight: '1.9',
    marginBottom: '2rem'
  },
  techSection: {
    marginBottom: '2rem'
  },
  sectionLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: 'var(--text-muted)',
    marginBottom: '1rem'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.6rem'
  },
  tag: {
    fontSize: '0.82rem',
    fontWeight: '500',
    color: 'var(--accent-secondary)',
    backgroundColor: 'rgba(0, 212, 170, 0.08)',
    border: '1px solid rgba(0, 212, 170, 0.15)',
    padding: '0.45rem 1rem',
    borderRadius: '8px',
    fontFamily: 'var(--font-mono)'
  },
  linksSection: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
  },
  linkBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.8rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    color: 'var(--text-primary)',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  },
  linkBtnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.8rem 1.5rem',
    background: 'linear-gradient(135deg, #6c63ff, #5a52e0)',
    border: '1px solid transparent',
    borderRadius: '10px',
    color: '#fff',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(108, 99, 255, 0.25)'
  }
}

export default ProjectDetail
