import { motion } from 'framer-motion'

function About() {
  const skills = [
    { name: 'JavaScript', category: 'frontend' },
    { name: 'React', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'HTML/CSS', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'Express', category: 'backend' },
    { name: 'REST API', category: 'backend' },
    { name: 'PostgreSQL', category: 'backend' },
    { name: 'MySQL', category: 'backend' },
    { name: 'MongoDB', category: 'backend' },
    { name: 'Docker', category: 'devops' },
    { name: 'Jenkins', category: 'devops' },
    { name: 'AWS', category: 'devops' },
    { name: 'CI/CD', category: 'devops' },
    { name: 'Git/GitHub', category: 'devops' },
    { name: 'Linux', category: 'devops' },
    { name: 'Agile/Scrum', category: 'other' },
    { name: 'Data Engineering', category: 'other' }
  ]

  const experience = [
    {
      period: '2023 - Present',
      title: 'Etudiant Ingenieur Genie Logiciel',
      company: 'ESP Dakar (Ecole Superieure Polytechnique)',
      description: 'Formation en genie logiciel, systemes d\'information, bases de donnees, reseaux et architectures distribuees.'
    },
    {
      period: '2023',
      title: 'Pilote Production B2B',
      company: 'Sonatel (Orange Senegal)',
      description: 'Supervision des services Fibre (FTTH/FTTO) et ADSL pour les clients entreprises. Monitoring, resolution d\'incidents et amelioration continue.'
    },
    {
      period: '2023',
      title: 'Certifications',
      company: 'IBM & Microsoft',
      description: 'IBM Data Engineering Professional Certificate. Microsoft Foundational C# Certification. AWS Cloud Practitioner.'
    }
  ]

  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend & DB',
    devops: 'DevOps & Cloud',
    other: 'Methodologies'
  }

  const categoryColors = {
    frontend: { bg: 'rgba(108, 99, 255, 0.08)', border: 'rgba(108, 99, 255, 0.2)', text: '#8b83ff' },
    backend: { bg: 'rgba(0, 212, 170, 0.08)', border: 'rgba(0, 212, 170, 0.2)', text: '#00d4aa' },
    devops: { bg: 'rgba(255, 170, 50, 0.08)', border: 'rgba(255, 170, 50, 0.2)', text: '#ffaa32' },
    other: { bg: 'rgba(255, 100, 150, 0.08)', border: 'rgba(255, 100, 150, 0.2)', text: '#ff6496' }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.main}
    >
      {/* Header */}
      <div style={styles.header}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={styles.headerLabel}
        >
          A propos
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={styles.heading}
        >
          Mouhamed Sall
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={styles.subtitle}
        >
          Full Stack Developer & Software Engineering Student
        </motion.p>
      </div>

      {/* Bio Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={styles.bioCard}
      >
        <div style={styles.bioContent}>
          <p style={styles.paragraph}>
            Developeur Full Stack passionne base a Dakar, Senegal. Je concois et developpe des
            applications web robustes avec un focus sur la qualite du code, la performance et
            l'experience utilisateur.
          </p>
          <p style={styles.paragraph}>
            Ancien Pilote Production B2B chez Sonatel, j'ai acquis une experience solide en
            gestion d'infrastructures telecom et en resolution de problemes complexes en
            environnement de production.
          </p>
          <p style={styles.paragraph}>
            Je m'interesse particulierement aux architectures scalables, au DevOps, a
            l'ingenierie des donnees et au cloud computing. Certifie IBM (Data Engineering)
            et Microsoft (Foundational C#).
          </p>
        </div>
        <div style={styles.bioStats}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>3+</span>
            <span style={styles.statLabel}>Annees d'experience</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>10+</span>
            <span style={styles.statLabel}>Projets realises</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>3</span>
            <span style={styles.statLabel}>Certifications</span>
          </div>
        </div>
      </motion.div>

      {/* Experience Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={styles.section}
      >
        <h2 style={styles.sectionTitle}>Parcours</h2>
        <div style={styles.timeline}>
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.15 }}
              style={styles.timelineItem}
            >
              <div style={styles.timelineDot} />
              {index < experience.length - 1 && <div style={styles.timelineLine} />}
              <div style={styles.timelineContent}>
                <span style={styles.timelinePeriod}>{exp.period}</span>
                <h3 style={styles.timelineTitle}>{exp.title}</h3>
                <span style={styles.timelineCompany}>{exp.company}</span>
                <p style={styles.timelineDesc}>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={styles.section}
      >
        <h2 style={styles.sectionTitle}>Competences</h2>
        <div style={styles.skillsGrid}>
          {Object.keys(categoryLabels).map((category) => (
            <div key={category} style={styles.skillCategory}>
              <h4 style={{
                ...styles.skillCategoryTitle,
                color: categoryColors[category].text
              }}>
                {categoryLabels[category]}
              </h4>
              <div style={styles.skillsList}>
                {skills.filter(s => s.category === category).map((skill) => (
                  <span
                    key={skill.name}
                    style={{
                      ...styles.skillChip,
                      backgroundColor: categoryColors[skill.category].bg,
                      borderColor: categoryColors[skill.category].border,
                      color: categoryColors[skill.category].text
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '8rem 2rem 4rem',
    maxWidth: '900px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem'
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
    marginBottom: '0.75rem',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-secondary)',
    fontWeight: '400'
  },
  bioCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '20px',
    padding: '2.5rem',
    marginBottom: '3rem'
  },
  bioContent: {
    marginBottom: '2rem'
  },
  paragraph: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    lineHeight: '1.9',
    marginBottom: '1rem'
  },
  bioStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
  },
  statItem: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #6c63ff, #00d4aa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  statLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: '500'
  },
  section: {
    marginBottom: '3rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '2rem',
    letterSpacing: '-0.3px'
  },
  timeline: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: '2.5rem',
    paddingBottom: '2.5rem'
  },
  timelineDot: {
    position: 'absolute',
    left: '0',
    top: '6px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6c63ff, #00d4aa)',
    boxShadow: '0 0 12px rgba(108, 99, 255, 0.4)',
    zIndex: 1
  },
  timelineLine: {
    position: 'absolute',
    left: '5px',
    top: '20px',
    bottom: '0',
    width: '2px',
    background: 'linear-gradient(180deg, rgba(108, 99, 255, 0.3), rgba(0, 212, 170, 0.1))',
    borderRadius: '1px'
  },
  timelineContent: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '14px',
    padding: '1.5rem'
  },
  timelinePeriod: {
    fontSize: '0.78rem',
    fontWeight: '600',
    color: 'var(--accent-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  timelineTitle: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    margin: '0.5rem 0 0.3rem',
    lineHeight: '1.3'
  },
  timelineCompany: {
    fontSize: '0.9rem',
    color: 'var(--accent-primary)',
    fontWeight: '500',
    display: 'block',
    marginBottom: '0.75rem'
  },
  timelineDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.7'
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem'
  },
  skillCategory: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '14px',
    padding: '1.5rem'
  },
  skillCategoryTitle: {
    fontSize: '0.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '1rem'
  },
  skillsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  skillChip: {
    fontSize: '0.78rem',
    fontWeight: '500',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    border: '1px solid',
    fontFamily: 'var(--font-mono)'
  }
}

export default About
