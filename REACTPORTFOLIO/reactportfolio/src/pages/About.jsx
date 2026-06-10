import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

function About() {
  const skills = {
    'Frontend': ['JavaScript', 'React', 'Next.js', 'HTML/CSS', 'Tailwind'],
    'Backend & DB': ['Node.js', 'Express', 'REST API', 'PostgreSQL', 'MySQL', 'MongoDB'],
    'DevOps & Cloud': ['Docker', 'Jenkins', 'AWS', 'CI/CD', 'Git/GitHub', 'Linux'],
    'Other': ['Agile/Scrum', 'Data Engineering', 'React Native']
  }

  const categoryColors = {
    'Frontend': '#3b82f6',
    'Backend & DB': '#10b981',
    'DevOps & Cloud': '#f59e0b',
    'Other': '#8b5cf6'
  }

  const experience = [
    {
      period: '2025 - 2026',
      title: 'Ingénieur Génie Logiciel',
      company: 'ESP Dakar (École Supérieure Polytechnique)',
      description: 'Formation en génie logiciel, systèmes d\'information, bases de données, réseaux et architectures distribuées.'
    },
    {
      period: 'Nov 2024 - Déc 2025',
      title: 'Pilote Production B2B',
      company: 'Sonatel (Orange Sénégal)',
      description: 'Supervision des services Fibre (FTTH/FTTO) et ADSL pour les clients entreprises. Monitoring, résolution d\'incidents et amélioration continue.'
    },
    {
      period: 'Juin 2024 - Nov 2024',
      title: 'Formation Cloud AWS',
      company: 'Orange Digital Center',
      description: 'Programme intensif sur les services AWS, architecture cloud, et bonnes pratiques de déploiement et sécurité.'
    },
    {
      period: 'Mai 2024 - Juin 2024',
      title: 'Stagiaire Cybersécurité',
      company: 'Atech Cybersecurity',
      description: 'Initiation aux audits de sécurité, tests de pénétration et mise en place de politiques de sécurité informatique.'
    }
  ]

  const stats = [
    { number: '3+', label: 'Ans' },
    { number: '10+', label: 'Projets' },
    { number: '3', label: 'Certifs' }
  ]

  return (
    <>
      <style>{`
        .about-page {
          min-height: 100vh;
          padding: 8rem 2rem 4rem;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .about-header {
          margin-bottom: 3.5rem;
        }
        .about-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
          margin-bottom: 0.5rem;
        }
        .about-subtitle {
          font-size: 1.05rem;
          color: #a1a1aa;
          font-weight: 400;
        }
        .about-quote {
          font-size: clamp(1.2rem, 2.5vw, 1.6rem);
          font-weight: 400;
          color: #ffffff;
          line-height: 1.7;
          margin-bottom: 3rem;
          padding-left: 1.5rem;
          border-left: 2px solid rgba(59, 130, 246, 0.3);
        }
        .about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 4rem;
        }
        .about-stat {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        .about-stat:hover {
          border-color: rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }
        .about-stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          color: #3b82f6;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .about-stat-label {
          font-size: 0.82rem;
          color: #71717a;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .about-section {
          margin-bottom: 4rem;
        }
        .about-section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #f5f5f5;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
        }
        .about-timeline {
          position: relative;
          padding-left: 2rem;
        }
        .about-timeline::before {
          content: '';
          position: absolute;
          left: 4px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: linear-gradient(180deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.05));
        }
        .about-timeline-item {
          position: relative;
          padding-bottom: 2rem;
        }
        .about-timeline-item:last-child {
          padding-bottom: 0;
        }
        .about-timeline-dot {
          position: absolute;
          left: -2rem;
          top: 8px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
          transform: translateX(0.5px);
        }
        .about-timeline-card {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        .about-timeline-card:hover {
          border-color: rgba(255, 255, 255, 0.1);
        }
        .about-timeline-period {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: 600;
          color: #3b82f6;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .about-timeline-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0.4rem 0 0.25rem;
          line-height: 1.3;
        }
        .about-timeline-company {
          font-size: 0.85rem;
          color: #d4d4d8;
          font-weight: 500;
          display: block;
          margin-bottom: 0.5rem;
        }
        .about-timeline-desc {
          font-size: 0.85rem;
          color: #d4d4d8;
          line-height: 1.6;
        }
        .about-skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        .about-skill-category {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        .about-skill-category:hover {
          border-color: rgba(255, 255, 255, 0.1);
        }
        .about-skill-category-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }
        .about-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .about-skill-chip {
          font-size: 0.78rem;
          font-weight: 500;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          border: 1px solid;
          transition: all 0.2s ease;
        }
        .about-skill-chip:hover {
          transform: translateY(-1px);
        }
        @media (max-width: 640px) {
          .about-page {
            padding: 7rem 1.5rem 3rem;
          }
          .about-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .about-skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <motion.main
        className="about-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="about-header">
          <motion.h1
            className="about-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            A propos
          </motion.h1>
          <motion.p
            className="about-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Full Stack Developer & Software Engineering Student
          </motion.p>
        </div>

        {/* Bio Quote */}
        <AnimatedSection>
          <blockquote className="about-quote">
            Développeur Full Stack passionné basé à Dakar, Sénégal. Je conçois des applications robustes avec un focus sur la
            performance, la qualité du code et l'expérience utilisateur. Ancien Pilote Production B2B chez Sonatel,
            certifié IBM, Microsoft & AWS.
          </blockquote>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.1}>
          <div className="about-stats">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="about-stat"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
              >
                <span className="about-stat-number">{stat.number}</span>
                <span className="about-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Experience Timeline */}
        <AnimatedSection delay={0.1}>
          <div className="about-section">
            <h2 className="about-section-title">Parcours</h2>
            <div className="about-timeline">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="about-timeline-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="about-timeline-dot" />
                  <div className="about-timeline-card">
                    <span className="about-timeline-period">{exp.period}</span>
                    <h3 className="about-timeline-title">{exp.title}</h3>
                    <span className="about-timeline-company">{exp.company}</span>
                    <p className="about-timeline-desc">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Grid */}
        <AnimatedSection delay={0.1}>
          <div className="about-section">
            <h2 className="about-section-title">Compétences</h2>
            <div className="about-skills-grid">
              {Object.entries(skills).map(([category, items], catIndex) => {
                const color = categoryColors[category] || '#3b82f6'
                return (
                  <motion.div
                    key={category}
                    className="about-skill-category"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                  >
                    <h4
                      className="about-skill-category-title"
                      style={{ color }}
                    >
                      {category}
                    </h4>
                    <div className="about-skills-list">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="about-skill-chip"
                          style={{
                            color,
                            borderColor: `${color}22`,
                            background: `${color}08`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </AnimatedSection>
      </motion.main>
    </>
  )
}

export default About
