import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

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
          { _id: '1', title: 'Portfolio React', description: 'Application SPA avec React et Vite', technologies: ['React', 'Vite', 'Framer Motion'] },
          { _id: '2', title: 'API Express', description: 'API REST avec Express.js et MongoDB', technologies: ['Node.js', 'Express', 'MongoDB'] },
          { _id: '3', title: 'Docker Compose', description: 'Conteneurisation multi-services', technologies: ['Docker', 'Docker Compose', 'Nginx'] }
        ])
        setLoading(false)
      })
  }, [])

  if (loading) return <p style={{ textAlign: 'center', marginTop: '5rem' }}>Chargement...</p>

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={styles.main}
    >
      <h1 style={styles.heading}>Mes Projets</h1>
      <div style={styles.grid}>
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={styles.card}
          >
            <h3 style={styles.cardTitle}>{project.title}</h3>
            <p style={styles.cardDesc}>{project.description}</p>
            <div style={styles.tags}>
              {project.technologies && project.technologies.map((tech) => (
                <span key={tech} style={styles.tag}>{tech}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    paddingTop: '6rem',
    padding: '6rem 2rem 2rem'
  },
  heading: {
    fontSize: '2.5rem',
    color: '#ccd6f6',
    marginBottom: '3rem',
    textAlign: 'center'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: '#112240',
    borderRadius: '8px',
    padding: '2rem',
    transition: 'transform 0.3s'
  },
  cardTitle: {
    color: '#ccd6f6',
    fontSize: '1.3rem',
    marginBottom: '0.8rem'
  },
  cardDesc: {
    color: '#8892b0',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  tag: {
    fontSize: '0.8rem',
    color: '#64ffda',
    backgroundColor: 'rgba(100, 255, 218, 0.1)',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px'
  }
}

export default Projects
