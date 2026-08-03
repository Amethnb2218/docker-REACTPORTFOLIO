import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function CountUp({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = parseInt(value)
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, value, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1]
      }}
      whileHover={{ scale: 1.05, y: -8 }}
    >
      <motion.div
        className="stat-number"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.1 + 0.3,
          ease: [0.76, 0, 0.24, 1]
        }}
      >
        <CountUp value={stat.value} suffix={stat.suffix} />
      </motion.div>
      <div className="stat-label">{stat.label}</div>
    </motion.div>
  )
}

function SkillCategoryCard({ category, skills, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const icons = {
    'Frontend': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    'Backend': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <path d="M6 6h.01M6 18h.01" />
      </svg>
    ),
    'Database': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    'Cloud & DevOps': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    )
  }

  return (
    <motion.div
      ref={ref}
      className="skill-category-card"
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <motion.div
        className="skill-icon"
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          duration: 0.8,
          delay: index * 0.1 + 0.2,
          ease: [0.76, 0, 0.24, 1]
        }}
      >
        {icons[category]}
      </motion.div>
      <h4 className="skill-category-title">{category}</h4>
      <div className="skill-items">
        {skills.map((skill, skillIndex) => (
          <motion.span
            key={skill}
            className="skill-item"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: index * 0.1 + skillIndex * 0.05,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

function TimelineItem({ item, index, type = 'experience' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <motion.div
        className="timeline-dot"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.15 + 0.3,
          ease: [0.76, 0, 0.24, 1]
        }}
      />

      <motion.div
        className="timeline-card"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        whileHover={{ x: 8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="timeline-year">{item.period}</div>
        <div className="timeline-content">
          <h3 className="timeline-title">{item.title}</h3>
          <span className="timeline-company">{item.company || item.school}</span>
          {item.description && (
            <motion.p
              className="timeline-desc"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {item.description}
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function CertificationCard({ cert, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const getBrandColor = (cert) => {
    if (cert.includes('AWS')) return '#FF9900'
    if (cert.includes('Google')) return '#4285F4'
    if (cert.includes('IBM')) return '#0062FF'
    return '#c87941'
  }

  return (
    <motion.div
      ref={ref}
      className="cert-card"
      style={{ '--brand-color': getBrandColor(cert) }}
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1]
      }}
      whileHover={{ scale: 1.05, y: -8 }}
    >
      <div className="cert-badge">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div className="cert-name">{cert}</div>
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

  const stats = [
    { value: '10', suffix: '+', label: 'Projets' },
    { value: '2', suffix: '+', label: 'Ans d\'expérience' },
    { value: '5', suffix: '', label: 'Certifications' },
    { value: '30', suffix: '+', label: 'Repos GitHub' }
  ]

  const experience = [
    {
      period: '2026 - Present',
      title: 'Fondateur & Dev Full Stack',
      company: 'Jolof\'Era',
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
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .about-bg-shape {
          position: fixed;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200, 121, 65, 0.03), transparent);
          pointer-events: none;
          z-index: -1;
        }
        .about-bg-shape-1 {
          width: 600px;
          height: 600px;
          top: -200px;
          right: -200px;
        }
        .about-bg-shape-2 {
          width: 400px;
          height: 400px;
          bottom: -100px;
          left: -100px;
        }
        .about-bg-line {
          position: fixed;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200, 121, 65, 0.1), transparent);
          width: 100%;
          pointer-events: none;
          z-index: -1;
        }
        .about-hero {
          margin-bottom: 6rem;
        }
        .about-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 400;
          font-style: italic;
          color: #e8e8e8;
          letter-spacing: -0.02em;
          line-height: 1.3;
          margin-bottom: 2rem;
          position: relative;
          padding-left: 3rem;
        }
        .about-quote::before {
          content: '"';
          position: absolute;
          left: 0;
          top: -1rem;
          font-size: 6rem;
          color: #c87941;
          opacity: 0.3;
          font-family: Georgia, serif;
        }
        .about-intro {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: #8a8a8a;
          line-height: 1.8;
          max-width: 700px;
          margin-left: 3rem;
        }
        .about-section {
          margin-bottom: 6rem;
        }
        .about-section-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200, 121, 65, 0.3), transparent);
          margin: 4rem 0;
        }
        .about-section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #e8e8e8;
          letter-spacing: -0.03em;
          margin-bottom: 3rem;
          position: relative;
          display: inline-block;
        }
        .about-section-title::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #c87941, #d4956a);
          border-radius: 2px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .stat-card {
          background: #141414;
          border: 2px solid rgba(200, 121, 65, 0.2);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(200, 121, 65, 0.05), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .stat-card:hover::before {
          opacity: 1;
        }
        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          font-weight: 700;
          color: #c87941;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #8a8a8a;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .skill-category-card {
          background: linear-gradient(135deg, #141414, #1a1a1a);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 2.5rem;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .skill-category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, rgba(200, 121, 65, 0.5), rgba(212, 149, 106, 0.3));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .skill-category-card:hover::before {
          transform: scaleX(1);
        }
        .skill-category-card:hover {
          border-color: rgba(200, 121, 65, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }
        .skill-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: rgba(200, 121, 65, 0.1);
          border: 1px solid rgba(200, 121, 65, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c87941;
          margin-bottom: 1.5rem;
        }
        .skill-category-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #e8e8e8;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .skill-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .skill-item {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #8a8a8a;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          transition: all 0.3s ease;
        }
        .skill-item:hover {
          color: #e8e8e8;
          padding-left: 0.5rem;
        }
        .timeline {
          position: relative;
          padding-left: 3rem;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 4px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: linear-gradient(180deg, rgba(200, 121, 65, 0.5), rgba(200, 121, 65, 0.1));
        }
        .timeline-item {
          position: relative;
          padding-bottom: 3rem;
        }
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        .timeline-dot {
          position: absolute;
          left: -3rem;
          top: 8px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #c87941;
          box-shadow: 0 0 20px rgba(200, 121, 65, 0.6);
          animation: timelinePulse 2s ease-in-out infinite;
        }
        @keyframes timelinePulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(200, 121, 65, 0.6); }
          50% { transform: scale(1.2); box-shadow: 0 0 30px rgba(200, 121, 65, 0.8); }
        }
        .timeline-card {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 2rem;
          align-items: start;
        }
        .timeline-card:hover {
          border-color: rgba(200, 121, 65, 0.3);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }
        .timeline-year {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.1rem;
          font-weight: 700;
          color: #c87941;
          letter-spacing: -0.01em;
        }
        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .timeline-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #e8e8e8;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }
        .timeline-company {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #d4956a;
          font-weight: 500;
        }
        .timeline-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #8a8a8a;
          line-height: 1.6;
          margin-top: 0.5rem;
          overflow: hidden;
        }
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .cert-card {
          background: linear-gradient(135deg, #141414, #1a1a1a);
          border: 2px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
          perspective: 1000px;
        }
        .cert-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--brand-color);
          opacity: 0.8;
        }
        .cert-card:hover {
          border-color: var(--brand-color);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px var(--brand-color);
          transform: translateY(-8px);
        }
        .cert-badge {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-color);
          margin-bottom: 1.5rem;
        }
        .cert-name {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #e8e8e8;
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .about-page {
            padding: 7rem 1.5rem 3rem;
          }
          .about-quote {
            font-size: 1.8rem;
            padding-left: 2rem;
          }
          .about-intro {
            margin-left: 2rem;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .skills-grid {
            grid-template-columns: 1fr;
          }
          .timeline {
            padding-left: 2rem;
          }
          .timeline-dot {
            left: -2rem;
          }
          .timeline-card {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .certs-grid {
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
        <motion.div
          className="about-bg-shape about-bg-shape-1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="about-bg-shape about-bg-shape-2"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4
          }}
        />
        <motion.div
          className="about-bg-line"
          style={{ top: '30%' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.div
          className="about-bg-line"
          style={{ top: '70%' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />

        <div className="about-hero">
          <motion.blockquote
            className="about-quote"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Je construis des solutions qui comptent
          </motion.blockquote>
          <motion.p
            className="about-intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Développeur Full Stack passionné basé à Dakar, Sénégal. Je conçois des applications
            robustes avec un focus sur la performance, la qualité du code et l'expérience utilisateur.
            Fondateur de Jolof'Era, ancien Pilote Production B2B chez Sonatel (Orange Sénégal),
            certifié AWS Cloud Practitioner et AWS re/Start Graduate.
          </motion.p>
        </div>

        <motion.div
          className="about-section-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="about-section">
          <motion.h2
            className="about-section-title"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            En chiffres
          </motion.h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          className="about-section-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="about-section">
          <motion.h2
            className="about-section-title"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Compétences techniques
          </motion.h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items], index) => (
              <SkillCategoryCard
                key={category}
                category={category}
                skills={items}
                index={index}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="about-section-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="about-section">
          <motion.h2
            className="about-section-title"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Expérience professionnelle
          </motion.h2>
          <div className="timeline">
            {experience.map((exp, index) => (
              <TimelineItem key={index} item={exp} index={index} type="experience" />
            ))}
          </div>
        </div>

        <motion.div
          className="about-section-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="about-section">
          <motion.h2
            className="about-section-title"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Formation académique
          </motion.h2>
          <div className="timeline">
            {education.map((edu, index) => (
              <TimelineItem key={index} item={edu} index={index} type="education" />
            ))}
          </div>
        </div>

        <motion.div
          className="about-section-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="about-section">
          <motion.h2
            className="about-section-title"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Certifications
          </motion.h2>
          <div className="certs-grid">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </motion.main>
    </>
  )
}

export default About
