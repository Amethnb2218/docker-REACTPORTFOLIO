import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function CountUpStat({ end, duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime
    let animationFrame

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

function About() {
  const skills = {
    'FRONTEND': ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    'BACKEND': ['Node.js', 'Express.js', 'Prisma ORM', 'REST API', 'WebSocket'],
    'CLOUD & DEVOPS': ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'CI/CD', 'Linux', 'SonarQube', 'Prometheus', 'Grafana', 'Trivy'],
    'DATA': ['PostgreSQL', 'MySQL', 'MongoDB']
  }

  const stats = [
    { value: '8', label: 'Projets livrés' },
    { value: '2', label: 'Années d\'expérience' },
    { value: '5', label: 'Certifications AWS & Cloud' }
  ]

  const experience = [
    { period: '2024 — Présent', title: 'Co-Fondateur', company: 'MTCorporate', description: 'Startup de services numériques : développement web, architecture cloud, pipelines CI/CD et déploiement. Conception et livraison de Jolof\'Era, Teranga AI, FresCOOP et autres solutions.' },
    { period: '2026 — Présent', title: 'Fondateur & Dev Full Stack', company: 'Jolof\'Era' },
    { period: '2024 — 2025', title: 'Pilote Production B2B', company: 'Sonatel (Orange)' },
    { period: '2024', title: 'Stagiaire Réseaux', company: 'Sonatel' }
  ]

  const education = [
    { period: '2025 — 2026 (en cours)', title: 'Ingénieur en Génie Logiciel', school: 'École Supérieure Polytechnique (ESP) Dakar' },
    { period: '2025 — 2026', title: 'Formation AWS Cloud', school: 'Orange Digital Center' },
    { period: '2022 — 2024', title: 'DTS Télécommunications et Réseaux', school: 'École Supérieure Polytechnique (ESP) Dakar' }
  ]

  const certifications = [
    { name: 'AWS Certified Cloud Practitioner (CLF-C02)', issuer: 'Amazon Web Services' },
    { name: 'AWS re/Start Graduate', issuer: 'Amazon Web Services' },
    { name: 'Foundations of Project Management', issuer: 'Google' },
    { name: 'Introduction to Data Engineering', issuer: 'IBM' }
  ]

  const availability = ['CDI', 'Freelance', 'Mission', 'Collaboration']

  return (
    <>
      <style>{`
        .about-page {
          min-height: 100vh;
          padding: 200px 2rem 150px;
          max-width: 900px;
          margin: 0 auto;
        }
        .about-intro-statement {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 400;
          font-style: italic;
          color: #00362e;
          letter-spacing: -0.02em;
          line-height: 1.4;
          margin-bottom: 2rem;
        }
        .about-bio {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          color: #3a5450;
          line-height: 2.0;
          margin-bottom: 3rem;
        }
        .about-divider {
          width: 100%;
          height: 1px;
          background: rgba(0, 0, 0, 0.06);
          margin: 3rem 0;
        }
        .about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          margin: 3rem 0;
        }
        .about-stat {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 54, 46, 0.1);
          border-radius: 16px;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .about-stat:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 54, 46, 0.12);
          background: rgba(255, 255, 255, 0.5);
        }
        .about-stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          font-weight: 700;
          color: #e8a020;
          line-height: 1;
          margin-bottom: 0.5rem;
          text-shadow:
            1px 1px 0 rgba(232, 160, 32, 0.3),
            2px 2px 0 rgba(232, 160, 32, 0.25),
            3px 3px 0 rgba(232, 160, 32, 0.2),
            4px 4px 0 rgba(232, 160, 32, 0.15),
            5px 5px 0 rgba(232, 160, 32, 0.1),
            6px 6px 0 rgba(232, 160, 32, 0.05),
            0 8px 16px rgba(232, 160, 32, 0.2);
          transform: perspective(400px);
        }
        .about-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #8a8a8a;
          line-height: 1.5;
        }
        .about-skills-section {
          margin: 3rem 0;
        }
        .about-skill-category {
          margin-bottom: 2rem;
        }
        .about-skill-category-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8a8a8a;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }
        .about-skill-category:hover .about-skill-category-title {
          transform: perspective(600px) rotateX(2deg) translateZ(5px);
          color: #e8a020;
        }
        .about-skill-items {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #3a5450;
          line-height: 1.8;
        }
        .about-timeline-item {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 2rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }
        .about-timeline-item:hover {
          padding-left: 1rem;
        }
        .about-timeline-period {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: #e8a020;
          font-weight: 600;
        }
        .about-timeline-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #00362e;
          line-height: 1.4;
          margin-bottom: 0.25rem;
        }
        .about-timeline-company {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #3a5450;
        }
        .about-timeline-description {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #8a8a8a;
          line-height: 1.6;
          margin-top: 0.5rem;
        }
        .about-cert-list {
          list-style: none;
          padding: 0;
        }
        .about-cert-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #3a5450;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        .about-cert-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e8a020;
          flex-shrink: 0;
        }
        .about-cert-issuer {
          font-size: 0.85rem;
          color: #e8a020;
          font-weight: 600;
          margin-top: 0.25rem;
        }
        .about-cv-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2.5rem;
          background: #e8a020;
          color: #e8efec;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          margin: 2rem 0;
        }
        .about-cv-button:hover {
          background: #e09b1a;
          transform: translateY(-3px) translateZ(10px);
          box-shadow: 0 12px 32px rgba(232, 160, 32, 0.3);
        }
        .about-availability-section {
          margin: 2rem 0;
        }
        .about-availability-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8a8a8a;
          margin-bottom: 1rem;
        }
        .about-availability-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .about-availability-tag {
          padding: 0.6rem 1.2rem;
          background: rgba(232, 160, 32, 0.1);
          border: 1px solid rgba(232, 160, 32, 0.3);
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: #e8a020;
          transition: all 0.3s ease;
        }
        .about-availability-tag:hover {
          background: rgba(232, 160, 32, 0.15);
          border-color: rgba(232, 160, 32, 0.5);
          transform: translateY(-2px);
        }
        .about-location {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          color: #3a5450;
          margin: 2rem 0;
          padding: 1.5rem;
          background: rgba(157, 216, 216, 0.1);
          border-left: 3px solid #9dd8d8;
          border-radius: 8px;
        }
        .about-location-highlight {
          color: #e8a020;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .about-page {
            padding: 160px 1.5rem 100px;
          }
          .about-stats {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .about-timeline-item {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }
      `}</style>
      <motion.main
        className="about-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="about-intro-statement"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Développeur Full Stack et DevOps passionné, basé à Dakar.
        </motion.p>

        <motion.p
          className="about-bio"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Co-fondateur de MTCorporate, startup spécialisée en développement web, cloud et déploiement CI/CD. À travers MTCorporate, j'ai conçu et livré des solutions comme Jolof'Era, Teranga AI et FresCOOP. Ancien Pilote Production B2B chez Sonatel, je combine expertise technique et vision entrepreneuriale pour créer des produits qui ont un impact réel.
        </motion.p>

        <motion.a
          href="#"
          className="about-cv-button"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          Télécharger mon CV
        </motion.a>

        <motion.div
          className="about-availability-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-availability-title">Disponible pour</div>
          <div className="about-availability-tags">
            {availability.map((type, index) => (
              <div key={index} className="about-availability-tag">{type}</div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about-location"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Dakar, Sénégal - <span className="about-location-highlight">Ouvert à la mobilité internationale</span>
        </motion.div>

        <motion.div
          className="about-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="about-stat"
              initial={{ opacity: 0, y: 30, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="about-stat-value">
                <CountUpStat end={parseInt(stat.value)} />+
              </div>
              <div className="about-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="about-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div className="about-skills-section">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              className="about-skill-category"
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="about-skill-category-title">{category}</div>
              <div className="about-skill-items">{items.join(', ')}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="about-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <div>
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className="about-timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="about-timeline-period">{exp.period}</div>
              <div>
                <div className="about-timeline-title">{exp.title}</div>
                <div className="about-timeline-company">{exp.company}</div>
                {exp.description && (
                  <div className="about-timeline-description">{exp.description}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="about-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <div>
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="about-timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="about-timeline-period">{edu.period}</div>
              <div>
                <div className="about-timeline-title">{edu.title}</div>
                <div className="about-timeline-company">{edu.school}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="about-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.ul
          className="about-cert-list"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {certifications.map((cert, index) => (
            <li key={index} className="about-cert-item">
              <div className="about-cert-dot" />
              <div>
                <div>{cert.name}</div>
                <div className="about-cert-issuer">{cert.issuer}</div>
              </div>
            </li>
          ))}
        </motion.ul>
      </motion.main>
    </>
  )
}

export default About
