import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={styles.main}
    >
      <section style={styles.hero}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={styles.greeting}
        >
          Bonjour, je suis
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={styles.name}
        >
          Mouhamed Sall
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={styles.title}
        >
          Développeur Full Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={styles.description}
        >
          Passionné par le développement web, je crée des applications modernes
          et performantes avec React, Node.js et les technologies cloud.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link to="/projects" style={styles.cta}>
            Voir mes projets
          </Link>
        </motion.div>
      </section>
    </motion.main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hero: {
    maxWidth: '800px',
    padding: '0 2rem'
  },
  greeting: {
    color: '#64ffda',
    fontSize: '1.1rem',
    marginBottom: '1rem'
  },
  name: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#ccd6f6',
    marginBottom: '0.5rem'
  },
  title: {
    fontSize: '3rem',
    color: '#8892b0',
    marginBottom: '1.5rem'
  },
  description: {
    fontSize: '1.1rem',
    color: '#8892b0',
    maxWidth: '540px',
    marginBottom: '2rem',
    lineHeight: '1.8'
  },
  cta: {
    display: 'inline-block',
    padding: '1rem 2rem',
    border: '1px solid #64ffda',
    color: '#64ffda',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'all 0.3s',
    backgroundColor: 'transparent'
  }
}

export default Home
