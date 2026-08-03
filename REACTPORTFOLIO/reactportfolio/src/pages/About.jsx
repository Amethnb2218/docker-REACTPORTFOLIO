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
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function About() {
  const skills = {
    'Frontend': ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    'Backend': ['Node.js', 'Express.js', 'Prisma ORM', 'REST API', 'WebSocket'],
    'Database': ['PostgreSQL', 'MySQL', 'MongoDB'],
    'Cloud & DevOps': ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Git', 'GitHub Actions', 'CI/CD', 'Linux', 'SonarQube', 'Prometheus', 'Grafana', 'Trivy']
  }

  const experience = [
    {
      period: '2026 - Present',
      title: 'Fondateur & Dev Full Stack',
      company: 'Jolofera',
      description: 'Plateforme SaaS multi-tenant avec système de réservation et e-commerce. React + Node.js + PostgreSQL + Prisma, WebSocket realtime, paiement intégré.'
    },
    {
      period: 'Nov 2024 - Dec 2025',
      title: 'Pilote Production B2B',
      company: 'Sonatel (Groupe Orange)',
      description: 'Supervision services B2B fibre FTTH/FTTO et ADSL pour clients entreprises. Management équipes, gestion incidents, suivi QoS.'
    },
    {
      period: 'Juin - Nov 2024',
      title: 'Stagiaire Reseaux',
      company: 'Sonatel',
      description: 'Déploiement FTTO, configuration réseau, installation équipements télécoms.'
    }
  ]

  const education = [
    {
      period: '2025 - 2026 (en cours)',
      title: 'Ingénieur en Génie Logiciel',
      school: 'École Supérieure Polytechnique (ESP) Dakar'
    },
    {
      period: '2025 - 2026',
      title: 'Formation AWS Cloud',
      school: 'Orange Digital Center'
    },
    {
      period: '2022 - 2024',
      title: 'DTS Télécommunications et Réseaux',
      school: 'École Supérieure Polytechnique (ESP) Dakar'
    }
  ]

  const certifications = [
    'AWS Certified Cloud Practitioner (CLF-C02)',
    'AWS re/Start Graduate',
    'Foundations of Project Management (Google)',
    'Introduction to Data Engineering (IBM)'
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
          margin-bottom: 4rem;
        }
        .about-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #e8e8e8;
          letter-spacing: -0.03em;
          margin-bottom: 0.5rem;
        }
        .about-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          color: #8a8a8a;
          font-weight: 400;
        }
        .about-bio {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          font-weight: 400;
          color: #8a8a8a;
          line-height: 1.8;
          margin-bottom: 4rem;
          padding-left: 1.5rem;
          border-left: 2px solid rgba(200, 121, 65, 0.3);
        }
        .about-section {
          margin-bottom: 4rem;
        }
        .about-section-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #e8e8e8;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
        }
        .about-skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .about-skill-category {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .about-skill-category:hover {
          border-color: rgba(200, 121, 65, 0.2);
          transform: translateY(-2px);
        }
        .about-skill-category-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          color: #c87941;
        }
        .about-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .about-skill-chip {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          color: #8a8a8a;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.2s ease;
        }
        .about-skill-chip:hover {
          color: #e8e8e8;
          border-color: rgba(200, 121, 65, 0.2);
          background: rgba(200, 121, 65, 0.05);
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
          background: linear-gradient(180deg, rgba(200, 121, 65, 0.3), rgba(200, 121, 65, 0.05));
        }
        .about-timeline-item {
          position: relative;
          padding-bottom: 2.5rem;
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
          background: #c87941;
          box-shadow: 0 0 8px rgba(200, 121, 65, 0.4);
          transform: translateX(0.5px);
        }
        .about-timeline-card {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .about-timeline-card:hover {
          border-color: rgba(200, 121, 65, 0.2);
          transform: translateX(4px);
        }
        .about-timeline-period {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: #c87941;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .about-timeline-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #e8e8e8;
          margin: 0.5rem 0 0.25rem;
          line-height: 1.3;
        }
        .about-timeline-company {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #8a8a8a;
          font-weight: 500;
          display: block;
          margin-bottom: 0.5rem;
        }
        .about-timeline-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #8a8a8a;
          line-height: 1.6;
        }
        .about-certifications {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .about-cert-item {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #8a8a8a;
          padding: 1rem 1.5rem;
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .about-cert-item:hover {
          color: #e8e8e8;
          border-color: rgba(200, 121, 65, 0.2);
          transform: translateX(4px);
        }
        @media (max-width: 640px) {
          .about-page {
            padding: 7rem 1.5rem 3rem;
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
            Full Stack Developer & DevOps Engineer
          </motion.p>
        </div>

        <AnimatedSection>
          <p className="about-bio">
            Développeur Full Stack passionné basé à Dakar, Sénégal. Je conçois des applications
            robustes avec un focus sur la performance, la qualité du code et l'expérience utilisateur.
            Fondateur de Jolofera, ancien Pilote Production B2B chez Sonatel (Orange Sénégal),
            certifié AWS Cloud Practitioner et AWS re/Start Graduate.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="about-section">
            <h2 className="about-section-title">Compétences</h2>
            <div className="about-skills-grid">
              {Object.entries(skills).map(([category, items], catIndex) => (
                <motion.div
                  key={category}
                  className="about-skill-category"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                >
                  <h4 className="about-skill-category-title">{category}</h4>
                  <div className="about-skills-list">
                    {items.map((skill) => (
                      <span key={skill} className="about-skill-chip">{skill}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

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

        <AnimatedSection delay={0.1}>
          <div className="about-section">
            <h2 className="about-section-title">Formation</h2>
            <div className="about-timeline">
              {education.map((edu, index) => (
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
                    <span className="about-timeline-period">{edu.period}</span>
                    <h3 className="about-timeline-title">{edu.title}</h3>
                    <span className="about-timeline-company">{edu.school}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="about-section">
            <h2 className="about-section-title">Certifications</h2>
            <div className="about-certifications">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="about-cert-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  {cert}
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </motion.main>
    </>
  )
}

export default About
