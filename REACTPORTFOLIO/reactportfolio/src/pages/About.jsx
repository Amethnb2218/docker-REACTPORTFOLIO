import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function AnimatedSection({ children, delay = 0, parallax = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], parallax ? [50, -50] : [0, 0])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ y: parallax ? y : 0 }}
    >
      {children}
    </motion.div>
  )
}

function TimelineLine() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="about-timeline-line"
      initial={{ scaleY: 0 }}
      animate={isInView ? { scaleY: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    />
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
          position: relative;
          display: inline-block;
        }
        .about-section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #c87941, transparent);
          width: 0;
          animation: underlineSlide 0.8s ease forwards;
        }
        @keyframes underlineSlide {
          to { width: 100%; }
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
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .about-skill-chip:hover {
          color: #e8e8e8;
          border-color: rgba(200, 121, 65, 0.3);
          background: rgba(200, 121, 65, 0.08);
          transform: translateY(-2px);
        }
        .about-timeline {
          position: relative;
          padding-left: 2rem;
        }
        .about-timeline-line {
          position: absolute;
          left: 4px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: linear-gradient(180deg, rgba(200, 121, 65, 0.4), rgba(200, 121, 65, 0.05));
          transform-origin: top;
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
          box-shadow: 0 0 12px rgba(200, 121, 65, 0.6);
          transform: translateX(0.5px);
          animation: timelinePulse 2s ease-in-out infinite;
        }
        @keyframes timelinePulse {
          0%, 100% { transform: translateX(0.5px) scale(1); box-shadow: 0 0 12px rgba(200, 121, 65, 0.6); }
          50% { transform: translateX(0.5px) scale(1.1); box-shadow: 0 0 20px rgba(200, 121, 65, 0.8); }
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
          overflow: hidden;
          position: relative;
          padding: 1rem 0;
        }
        .about-certifications-track {
          display: flex;
          gap: 1rem;
          animation: marqueeScroll 30s linear infinite;
          width: max-content;
        }
        .about-certifications-track:hover {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .about-cert-item {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #8a8a8a;
          padding: 1rem 1.5rem;
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          transition: all 0.3s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .about-cert-item:hover {
          color: #e8e8e8;
          border-color: rgba(200, 121, 65, 0.3);
          transform: scale(1.05);
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

        <AnimatedSection delay={0.1} parallax={true}>
          <div className="about-section">
            <motion.h2
              className="about-section-title"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Compétences
            </motion.h2>
            <div className="about-skills-grid">
              {Object.entries(skills).map(([category, items], catIndex) => (
                <motion.div
                  key={category}
                  className="about-skill-category"
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.15, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                >
                  <h4 className="about-skill-category-title">{category}</h4>
                  <div className="about-skills-list">
                    {items.map((skill, skillIndex) => {
                      const angle = (skillIndex % 2 === 0 ? -1 : 1) * (20 + skillIndex * 5)
                      return (
                        <motion.span
                          key={skill}
                          className="about-skill-chip"
                          initial={{ opacity: 0, x: angle, y: -20, scale: 0.8 }}
                          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: catIndex * 0.15 + skillIndex * 0.05,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        >
                          {skill}
                        </motion.span>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="about-section">
            <motion.h2
              className="about-section-title"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Parcours
            </motion.h2>
            <div className="about-timeline">
              <TimelineLine />
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="about-timeline-item"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="about-timeline-dot"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  />
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

        <AnimatedSection delay={0.1} parallax={true}>
          <div className="about-section">
            <motion.h2
              className="about-section-title"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Formation
            </motion.h2>
            <div className="about-timeline">
              <TimelineLine />
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="about-timeline-item"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="about-timeline-dot"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  />
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
            <motion.h2
              className="about-section-title"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Certifications
            </motion.h2>
            <div className="about-certifications">
              <div className="about-certifications-track">
                {[...certifications, ...certifications].map((cert, index) => (
                  <div key={index} className="about-cert-item">
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </motion.main>
    </>
  )
}

export default About
