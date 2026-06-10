import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -8, y: x * 8 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link
        to={`/projects/${project._id}`}
        className="project-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1)`,
        }}
      >
        {/* Image / Gradient placeholder */}
        <div className="project-card-image">
          {project.imageUrl ? (
            <img src={project.imageUrl} alt={project.title} />
          ) : (
            <div className="project-card-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3b82f6', opacity: 0.5 }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="project-card-content">
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.description}</p>

          <div className="project-card-tags">
            {project.technologies && project.technologies.map((tech) => (
              <span key={tech} className="project-tag">{tech}</span>
            ))}
          </div>

          <div className="project-card-footer">
            <span className="project-view-link">
              Voir
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const defaultProjects = [
          { _id: '1', title: 'Portfolio React', description: 'Application SPA moderne avec React, Vite et animations fluides. Architecture composants réutilisables.', technologies: ['React', 'Vite', 'Framer Motion'], imageUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1e3a5f"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="600" height="360" fill="url(#g)"/><circle cx="300" cy="150" r="60" fill="none" stroke="#61dafb" stroke-width="2" opacity="0.8"/><circle cx="300" cy="150" r="8" fill="#61dafb"/><ellipse cx="300" cy="150" rx="100" ry="38" fill="none" stroke="#61dafb" stroke-width="1.5" opacity="0.6" transform="rotate(60 300 150)"/><ellipse cx="300" cy="150" rx="100" ry="38" fill="none" stroke="#61dafb" stroke-width="1.5" opacity="0.6" transform="rotate(-60 300 150)"/><ellipse cx="300" cy="150" rx="100" ry="38" fill="none" stroke="#61dafb" stroke-width="1.5" opacity="0.6"/><text x="300" y="260" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">React + Vite + Framer Motion</text></svg>') },
          { _id: '2', title: 'API REST Express', description: 'Backend robuste avec Express.js, MongoDB et authentification JWT. Documentation Swagger intégrée.', technologies: ['Node.js', 'Express', 'MongoDB'], imageUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1a2e1a"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="600" height="360" fill="url(#g)"/><rect x="150" y="80" width="300" height="30" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="1" opacity="0.7"/><text x="170" y="100" fill="#22c55e" font-family="monospace" font-size="12">GET /api/projects</text><rect x="150" y="125" width="300" height="30" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1" opacity="0.7"/><text x="170" y="145" fill="#3b82f6" font-family="monospace" font-size="12">POST /api/projects</text><rect x="150" y="170" width="300" height="30" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1" opacity="0.7"/><text x="170" y="190" fill="#f59e0b" font-family="monospace" font-size="12">PUT /api/projects/:id</text><rect x="150" y="215" width="300" height="30" rx="4" fill="#1e293b" stroke="#ef4444" stroke-width="1" opacity="0.7"/><text x="170" y="235" fill="#ef4444" font-family="monospace" font-size="12">DELETE /api/projects/:id</text><text x="300" y="300" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">Express.js + MongoDB</text></svg>') },
          { _id: '3', title: 'Infrastructure Docker', description: 'Conteneurisation multi-services avec orchestration Docker Compose et reverse proxy Nginx.', technologies: ['Docker', 'Docker Compose', 'Nginx'], imageUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1e2a3f"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="600" height="360" fill="url(#g)"/><rect x="200" y="100" width="50" height="40" rx="3" fill="#2563eb" opacity="0.8"/><rect x="260" y="100" width="50" height="40" rx="3" fill="#2563eb" opacity="0.8"/><rect x="320" y="100" width="50" height="40" rx="3" fill="#2563eb" opacity="0.8"/><rect x="200" y="150" width="50" height="40" rx="3" fill="#2563eb" opacity="0.6"/><rect x="260" y="150" width="50" height="40" rx="3" fill="#2563eb" opacity="0.6"/><rect x="320" y="150" width="50" height="40" rx="3" fill="#2563eb" opacity="0.6"/><path d="M180 210 Q300 230 420 210" fill="none" stroke="#60a5fa" stroke-width="3" opacity="0.5"/><circle cx="240" cy="220" r="4" fill="#60a5fa"/><circle cx="300" cy="225" r="4" fill="#60a5fa"/><circle cx="360" cy="220" r="4" fill="#60a5fa"/><text x="300" y="290" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">Docker + Compose + Nginx</text></svg>') },
          { _id: '4', title: 'LigueyFemme', description: 'Application mobile React Native pour l\'inclusion financière des femmes au Sénégal. Microfinance et formations.', technologies: ['React Native', 'Node.js', 'MongoDB'], imageUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#2d1b4e"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="600" height="360" fill="url(#g)"/><rect x="250" y="60" width="100" height="200" rx="12" fill="none" stroke="#a78bfa" stroke-width="2" opacity="0.8"/><rect x="260" y="75" width="80" height="160" rx="4" fill="#1e1b4b" opacity="0.6"/><circle cx="300" cy="250" r="6" fill="none" stroke="#a78bfa" stroke-width="1.5"/><rect x="275" y="95" width="50" height="30" rx="6" fill="#7c3aed" opacity="0.4"/><rect x="275" y="135" width="50" height="30" rx="6" fill="#7c3aed" opacity="0.3"/><rect x="275" y="175" width="50" height="30" rx="6" fill="#7c3aed" opacity="0.2"/><text x="300" y="310" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">React Native + Mobile</text></svg>') },
          { _id: '5', title: 'Pipeline CI/CD', description: 'Automatisation complète du déploiement avec Jenkins, Docker et AWS. Tests automatisés et monitoring.', technologies: ['Jenkins', 'AWS', 'Docker', 'Bash'], imageUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1f2937"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="600" height="360" fill="url(#g)"/><circle cx="150" cy="180" r="25" fill="none" stroke="#f59e0b" stroke-width="2"/><text x="150" y="185" text-anchor="middle" fill="#f59e0b" font-family="monospace" font-size="10">Build</text><line x1="175" y1="180" x2="225" y2="180" stroke="#475569" stroke-width="2" stroke-dasharray="4"/><circle cx="250" cy="180" r="25" fill="none" stroke="#3b82f6" stroke-width="2"/><text x="250" y="185" text-anchor="middle" fill="#3b82f6" font-family="monospace" font-size="10">Test</text><line x1="275" y1="180" x2="325" y2="180" stroke="#475569" stroke-width="2" stroke-dasharray="4"/><circle cx="350" cy="180" r="25" fill="none" stroke="#8b5cf6" stroke-width="2"/><text x="350" y="185" text-anchor="middle" fill="#8b5cf6" font-family="monospace" font-size="10">Scan</text><line x1="375" y1="180" x2="425" y2="180" stroke="#475569" stroke-width="2" stroke-dasharray="4"/><circle cx="450" cy="180" r="25" fill="none" stroke="#10b981" stroke-width="2"/><text x="450" y="185" text-anchor="middle" fill="#10b981" font-family="monospace" font-size="10">Deploy</text><text x="300" y="280" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">Jenkins + Docker + AWS</text></svg>') },
          { _id: '6', title: 'Dashboard Analytics', description: 'Tableau de bord temps réel avec visualisations interactives pour le suivi des KPI entreprise.', technologies: ['React', 'D3.js', 'PostgreSQL'], imageUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1e293b"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="600" height="360" fill="url(#g)"/><rect x="150" y="230" width="40" height="60" rx="3" fill="#3b82f6" opacity="0.7"/><rect x="210" y="190" width="40" height="100" rx="3" fill="#3b82f6" opacity="0.8"/><rect x="270" y="150" width="40" height="140" rx="3" fill="#3b82f6" opacity="0.9"/><rect x="330" y="170" width="40" height="120" rx="3" fill="#10b981" opacity="0.8"/><rect x="390" y="120" width="40" height="170" rx="3" fill="#10b981" opacity="0.9"/><line x1="140" y1="290" x2="450" y2="290" stroke="#334155" stroke-width="1"/><line x1="140" y1="100" x2="140" y2="290" stroke="#334155" stroke-width="1"/><polyline points="170,220 230,180 290,140 350,160 410,110" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.8"/><text x="300" y="330" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">React + D3.js + PostgreSQL</text></svg>') },
          { _id: '7', title: 'Microservices Architecture', description: 'Architecture distribuée avec communication asynchrone et service discovery intégré.', technologies: ['Node.js', 'RabbitMQ', 'Docker'], imageUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1a2332"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="600" height="360" fill="url(#g)"/><rect x="120" y="100" width="80" height="50" rx="8" fill="none" stroke="#3b82f6" stroke-width="1.5"/><text x="160" y="130" text-anchor="middle" fill="#3b82f6" font-family="monospace" font-size="10">Auth</text><rect x="260" y="100" width="80" height="50" rx="8" fill="none" stroke="#10b981" stroke-width="1.5"/><text x="300" y="130" text-anchor="middle" fill="#10b981" font-family="monospace" font-size="10">Users</text><rect x="400" y="100" width="80" height="50" rx="8" fill="none" stroke="#f59e0b" stroke-width="1.5"/><text x="440" y="130" text-anchor="middle" fill="#f59e0b" font-family="monospace" font-size="10">Orders</text><rect x="220" y="200" width="160" height="40" rx="6" fill="none" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="4"/><text x="300" y="225" text-anchor="middle" fill="#8b5cf6" font-family="monospace" font-size="10">Message Queue</text><line x1="160" y1="150" x2="260" y2="200" stroke="#475569" stroke-width="1"/><line x1="300" y1="150" x2="300" y2="200" stroke="#475569" stroke-width="1"/><line x1="440" y1="150" x2="340" y2="200" stroke="#475569" stroke-width="1"/><text x="300" y="300" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">Node.js + RabbitMQ + Docker</text></svg>') },
          { _id: '8', title: 'Cloud Migration AWS', description: 'Migration infrastructure on-premise vers AWS avec optimisation des coûts et haute disponibilité.', technologies: ['AWS', 'Terraform', 'Linux'], imageUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1f2937"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="600" height="360" fill="url(#g)"/><path d="M200 180 Q250 130 300 150 Q320 110 370 130 Q420 100 430 150 Q470 140 460 180 Z" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.8"/><rect x="230" y="220" width="40" height="50" rx="3" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.6"/><rect x="280" y="220" width="40" height="50" rx="3" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.6"/><rect x="330" y="220" width="40" height="50" rx="3" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.6"/><line x1="250" y1="180" x2="250" y2="220" stroke="#475569" stroke-width="1" stroke-dasharray="3"/><line x1="300" y1="180" x2="300" y2="220" stroke="#475569" stroke-width="1" stroke-dasharray="3"/><line x1="350" y1="180" x2="350" y2="220" stroke="#475569" stroke-width="1" stroke-dasharray="3"/><text x="300" y="320" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">AWS + Terraform + Linux</text></svg>') },
          { _id: '9', title: 'Jolofera', description: 'Site e-commerce moderne pour la vente de produits alimentaires et cosmétiques naturels africains. Interface responsive avec panier et paiement intégré.', technologies: ['React', 'Vite', 'CSS'], githubUrl: 'https://github.com/Amethnb2218/flashrv-react', liveUrl: 'https://www.jolofera.com/', imageUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#2d1f0e"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="600" height="360" fill="url(#g)"/><rect x="180" y="80" width="240" height="160" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" opacity="0.8"/><rect x="200" y="100" width="200" height="20" rx="4" fill="#f59e0b" opacity="0.3"/><rect x="200" y="135" width="90" height="90" rx="8" fill="#f59e0b" opacity="0.15"/><rect x="300" y="135" width="90" height="40" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/><rect x="300" y="185" width="90" height="40" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/><circle cx="300" cy="290" r="20" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.6"/><text x="300" y="295" text-anchor="middle" fill="#f59e0b" font-family="monospace" font-size="10">Cart</text><text x="300" y="330" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">E-commerce + React</text></svg>') },
          { _id: '10', title: 'Teranga AI Assistant', description: "Assistant intelligent propulsé par l'IA pour répondre aux questions sur le Sénégal. Interface conversationnelle moderne avec historique des échanges.", technologies: ['React', 'Node.js', 'AI/LLM'], githubUrl: 'https://github.com/Amethnb2218/teranga-ai', liveUrl: 'https://teranga-assistant.onrender.com/', imageUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1a1a2e"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="600" height="360" fill="url(#g)"/><rect x="180" y="70" width="240" height="200" rx="16" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5" opacity="0.8"/><rect x="200" y="100" width="140" height="25" rx="12" fill="#8b5cf6" opacity="0.2"/><rect x="240" y="140" width="160" height="25" rx="12" fill="#3b82f6" opacity="0.2"/><rect x="200" y="180" width="120" height="25" rx="12" fill="#8b5cf6" opacity="0.2"/><rect x="200" y="230" width="200" height="30" rx="15" fill="#1e293b" stroke="#475569" stroke-width="1"/><circle cx="300" cy="310" r="15" fill="none" stroke="#8b5cf6" stroke-width="1.5"/><path d="M293 310 L300 316 L308 304" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"/><text x="300" y="345" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">AI Chat + Node.js</text></svg>') },
          { _id: '11', title: 'Frescoop UEMOA', description: 'Plateforme web collaborative pour les coopératives de la zone UEMOA. Gestion des membres, transactions et reporting.', technologies: ['React', 'Node.js', 'MongoDB'], githubUrl: 'https://github.com/seydinalimamoulayeyade/frescoopuemoa-v2', liveUrl: 'https://frescoop-web-icts-wbfo.onrender.com/', imageUrl: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0f2918"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="600" height="360" fill="url(#g)"/><circle cx="250" cy="150" r="30" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.7"/><circle cx="350" cy="150" r="30" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.7"/><circle cx="300" cy="220" r="30" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.7"/><line x1="270" y1="165" x2="330" y2="165" stroke="#10b981" stroke-width="1" opacity="0.4"/><line x1="260" y1="175" x2="290" y2="205" stroke="#10b981" stroke-width="1" opacity="0.4"/><line x1="340" y1="175" x2="310" y2="205" stroke="#10b981" stroke-width="1" opacity="0.4"/><text x="250" y="155" text-anchor="middle" fill="#10b981" font-family="monospace" font-size="9">Coop A</text><text x="350" y="155" text-anchor="middle" fill="#10b981" font-family="monospace" font-size="9">Coop B</text><text x="300" y="225" text-anchor="middle" fill="#10b981" font-family="monospace" font-size="9">Coop C</text><text x="300" y="310" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">React + Node.js + MongoDB</text></svg>') }
  ]

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    fetch('/api/projects', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeout)
        setProjects(data.length > 0 ? data : defaultProjects)
        setLoading(false)
      })
      .catch(() => {
        clearTimeout(timeout)
        setProjects(defaultProjects)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{ width: 32, height: 32, border: '2px solid rgba(59,130,246,0.1)', borderTopColor: '#3b82f6', borderRadius: '50%' }}
        />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: '#52525b', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}
        >
          LOADING PROJECTS...
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .projects-page {
          min-height: 100vh;
          padding: 8rem 2rem 4rem;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .projects-header {
          margin-bottom: 3.5rem;
        }
        .projects-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .projects-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          padding: 0.3rem 0.7rem;
          border-radius: 100px;
        }
        .projects-subtitle {
          font-size: 1rem;
          color: #71717a;
          line-height: 1.7;
          max-width: 550px;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .project-card {
          display: block;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          position: relative;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 17px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(16, 185, 129, 0.3));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .project-card:hover::before {
          opacity: 1;
        }
        .project-card:hover {
          transform: perspective(800px) scale(1.02) !important;
          border-color: transparent;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.08);
        }
        .project-card-image {
          width: 100%;
          height: 180px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(135deg, #1a1a2e 0%, #0f0f0f 100%);
        }
        .project-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-card:hover .project-card-image img {
          transform: scale(1.05);
        }
        .project-card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(16, 185, 129, 0.03) 100%);
        }
        .project-card-content {
          padding: 1.5rem;
        }
        .project-card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f5f5f5;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .project-card-desc {
          font-size: 0.85rem;
          color: #71717a;
          line-height: 1.6;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }
        .project-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 500;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.15);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          letter-spacing: -0.01em;
        }
        .project-card-footer {
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }
        .project-view-link {
          color: #3b82f6;
          font-size: 0.82rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.3s ease;
        }
        .project-card:hover .project-view-link {
          gap: 10px;
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .projects-page {
            padding: 7rem 1.5rem 3rem;
          }
        }
      `}</style>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="projects-page"
      >
        <div className="projects-header">
          <motion.h1
            className="projects-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Projets
            <span className="projects-count">{projects.length}</span>
          </motion.h1>
          <motion.p
            className="projects-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            Une selection de projets qui illustrent mes competences en developpement full stack,
            DevOps et architecture logicielle.
          </motion.p>
        </div>

        {projects.length === 0 && (
          <p style={{ textAlign: 'center', color: '#71717a', fontSize: '1rem' }}>
            Aucun projet pour le moment.
          </p>
        )}

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </motion.main>
    </>
  )
}

export default Projects
