import { motion } from 'framer-motion'

function About() {
  const skills = [
    'JavaScript', 'React', 'Node.js', 'Express',
    'MongoDB', 'Docker', 'Git', 'HTML/CSS',
    'Vite', 'REST API', 'Linux', 'CI/CD'
  ]

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={styles.main}
    >
      <h1 style={styles.heading}>À propos de moi</h1>
      <div style={styles.content}>
        <div style={styles.text}>
          <p style={styles.paragraph}>
            Je suis Mouhamed Sall, développeur Full Stack passionné par la création
            d'applications web modernes et performantes.
          </p>
          <p style={styles.paragraph}>
            Mon parcours m'a permis de maîtriser les technologies front-end et back-end,
            de la conception d'interfaces utilisateur réactives à la mise en place
            d'architectures serveur robustes.
          </p>
          <p style={styles.paragraph}>
            Je m'intéresse particulièrement à la conteneurisation avec Docker,
            l'intégration continue et le déploiement automatisé.
          </p>
        </div>
        <div>
          <h3 style={styles.skillsTitle}>Compétences</h3>
          <div style={styles.skills}>
            {skills.map((skill) => (
              <span key={skill} style={styles.skill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '6rem 2rem 2rem',
    maxWidth: '900px',
    margin: '0 auto'
  },
  heading: {
    fontSize: '2.5rem',
    color: '#ccd6f6',
    marginBottom: '3rem',
    textAlign: 'center'
  },
  content: {
    display: 'grid',
    gap: '3rem'
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  paragraph: {
    color: '#8892b0',
    fontSize: '1.1rem',
    lineHeight: '1.8'
  },
  skillsTitle: {
    color: '#ccd6f6',
    marginBottom: '1.5rem',
    fontSize: '1.3rem'
  },
  skills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.8rem'
  },
  skill: {
    color: '#64ffda',
    backgroundColor: 'rgba(100, 255, 218, 0.1)',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.9rem'
  }
}

export default About
