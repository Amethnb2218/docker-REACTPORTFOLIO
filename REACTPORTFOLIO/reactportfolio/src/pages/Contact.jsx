import { motion } from 'framer-motion'

function Contact() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={styles.main}
    >
      <h1 style={styles.heading}>Contact</h1>
      <p style={styles.subtitle}>
        N'hésitez pas à me contacter pour discuter d'un projet ou d'une opportunité.
      </p>
      <a href="mailto:mouhamed.sall@email.com" style={styles.button}>
        Me contacter
      </a>
    </motion.main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    textAlign: 'center'
  },
  heading: {
    fontSize: '2.5rem',
    color: '#ccd6f6',
    marginBottom: '1.5rem'
  },
  subtitle: {
    color: '#8892b0',
    fontSize: '1.1rem',
    maxWidth: '500px',
    marginBottom: '2.5rem',
    lineHeight: '1.8'
  },
  button: {
    display: 'inline-block',
    padding: '1rem 2.5rem',
    border: '1px solid #64ffda',
    color: '#64ffda',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'all 0.3s'
  }
}

export default Contact
