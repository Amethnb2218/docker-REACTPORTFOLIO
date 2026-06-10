import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  const defaultProjects = [
    { _id: '1', title: 'Portfolio React', description: 'Application SPA moderne avec React, Vite et animations fluides. Architecture composants réutilisables avec routing dynamique et transitions de page.', technologies: ['React', 'Vite', 'Framer Motion'] },
    { _id: '2', title: 'API REST Express', description: 'Backend robuste avec Express.js, MongoDB et authentification JWT. Documentation Swagger intégrée. CRUD complet avec validation et gestion des erreurs.', technologies: ['Node.js', 'Express', 'MongoDB'] },
    { _id: '3', title: 'Infrastructure Docker', description: 'Conteneurisation multi-services avec orchestration Docker Compose et reverse proxy Nginx. Environnements dev/prod isolés.', technologies: ['Docker', 'Docker Compose', 'Nginx'] },
    { _id: '4', title: 'LigueyFemme', description: "Application mobile React Native pour l'inclusion financière des femmes au Sénégal. Microfinance et formations professionnelles.", technologies: ['React Native', 'Node.js', 'MongoDB'] },
    { _id: '5', title: 'Pipeline CI/CD', description: 'Automatisation complète du déploiement avec Jenkins, Docker et AWS. Tests automatisés, analyse SonarQube et monitoring.', technologies: ['Jenkins', 'AWS', 'Docker', 'Bash'] },
    { _id: '6', title: 'Dashboard Analytics', description: 'Tableau de bord temps réel avec visualisations interactives pour le suivi des KPI entreprise. Graphiques dynamiques et exports.', technologies: ['React', 'D3.js', 'PostgreSQL'] },
    { _id: '7', title: 'Microservices Architecture', description: 'Architecture distribuée avec communication asynchrone et service discovery intégré. Scalabilité horizontale et tolérance aux pannes.', technologies: ['Node.js', 'RabbitMQ', 'Docker'] },
    { _id: '8', title: 'Cloud Migration AWS', description: "Migration infrastructure on-premise vers AWS avec optimisation des coûts et haute disponibilité. Multi-AZ et auto-scaling.", technologies: ['AWS', 'Terraform', 'Linux'] },
    { _id: '9', title: 'Jolofera', description: 'Site e-commerce moderne pour la vente de produits alimentaires et cosmétiques naturels africains. Interface responsive avec panier et paiement intégré.', technologies: ['React', 'Vite', 'CSS'], githubUrl: 'https://github.com/Amethnb2218/flashrv-react', liveUrl: 'https://www.jolofera.com/' },
    { _id: '10', title: 'Teranga AI Assistant', description: "Assistant intelligent propulsé par l'IA pour répondre aux questions sur le Sénégal. Interface conversationnelle moderne avec historique des échanges.", technologies: ['React', 'Node.js', 'AI/LLM'], githubUrl: 'https://github.com/Amethnb2218/teranga-ai', liveUrl: 'https://teranga-assistant.onrender.com/' },
    { _id: '11', title: 'Frescoop UEMOA', description: 'Plateforme web collaborative pour les coopératives de la zone UEMOA. Gestion des membres, transactions et reporting.', technologies: ['React', 'Node.js', 'MongoDB'], githubUrl: 'https://github.com/seydinalimamoulayeyade/frescoopuemoa-v2', liveUrl: 'https://frescoop-web-icts-wbfo.onrender.com/' }
  ]

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    fetch(`/api/projects/${id}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((data) => {
        clearTimeout(timeout)
        if (data && data.title) {
          setProject(data)
        } else {
          const fallback = defaultProjects.find(p => p._id === id)
          setProject(fallback || null)
        }
        setLoading(false)
      })
      .catch(() => {
        clearTimeout(timeout)
        const fallback = defaultProjects.find(p => p._id === id)
        setProject(fallback || null)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: '#71717a', fontSize: '0.9rem', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Chargement...
        </motion.div>
      </div>
    )
  }

  if (!project) {
    return (
      <>
        <style>{`
          .detail-not-found {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 1.5rem;
            padding: 2rem;
            text-align: center;
          }
          .detail-not-found h2 {
            font-size: 1.8rem;
            font-weight: 700;
            color: #f5f5f5;
          }
          .detail-not-found p {
            color: #71717a;
            font-size: 1rem;
          }
          .detail-back-btn {
            display: inline-block;
            padding: 0.75rem 1.75rem;
            background: #3b82f6;
            color: #ffffff;
            border-radius: 100px;
            font-weight: 600;
            font-size: 0.9rem;
            text-decoration: none;
            transition: all 0.3s ease;
          }
          .detail-back-btn:hover {
            background: #2563eb;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
          }
        `}</style>
        <motion.main
          className="detail-not-found"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2>Projet introuvable</h2>
          <p>Ce projet n'existe pas ou a ete supprime.</p>
          <Link to="/projects" className="detail-back-btn">Retour aux projets</Link>
        </motion.main>
      </>
    )
  }

  return (
    <>
      <style>{`
        .detail-page {
          min-height: 100vh;
          padding: 8rem 2rem 4rem;
          max-width: 850px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .detail-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #71717a;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 2.5rem;
          padding: 0.5rem 0;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .detail-back-link:hover {
          color: #3b82f6;
          gap: 12px;
        }
        .detail-image-wrapper {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 2.5rem;
        }
        .detail-image-wrapper img {
          width: 100%;
          max-height: 420px;
          object-fit: cover;
          display: block;
        }
        .detail-info {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 2.5rem;
        }
        .detail-title {
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1.25rem;
          letter-spacing: -0.03em;
          line-height: 1.2;
        }
        .detail-description {
          color: #a1a1aa;
          font-size: 1rem;
          line-height: 1.9;
          margin-bottom: 2rem;
        }
        .detail-section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #71717a;
          margin-bottom: 0.75rem;
        }
        .detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .detail-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          font-weight: 500;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.15);
          padding: 0.4rem 0.9rem;
          border-radius: 8px;
        }
        .detail-links {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }
        .detail-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          color: #f5f5f5;
          font-weight: 500;
          font-size: 0.85rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .detail-link-btn:hover {
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(59, 130, 246, 0.05);
          color: #3b82f6;
        }
        .detail-link-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.5rem;
          background: #3b82f6;
          border: 1px solid #3b82f6;
          border-radius: 100px;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.85rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .detail-link-btn-primary:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }
        @media (max-width: 640px) {
          .detail-page {
            padding: 7rem 1.5rem 3rem;
          }
          .detail-info {
            padding: 1.75rem;
          }
        }
      `}</style>
      <motion.main
        className="detail-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Link to="/projects" className="detail-back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour aux projets
          </Link>
        </motion.div>

        {/* Hero Image */}
        {project.imageUrl && (
          <motion.div
            className="detail-image-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <img src={project.imageUrl} alt={project.title} />
          </motion.div>
        )}

        {/* Project Info */}
        <motion.div
          className="detail-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-description">{project.description}</p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h3 className="detail-section-label">Technologies</h3>
              <div className="detail-tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="detail-tag">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="detail-links">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="detail-link-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                  </svg>
                  Code source
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="detail-link-btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Voir en ligne
                </a>
              )}
            </div>
          )}
        </motion.div>
      </motion.main>
    </>
  )
}

export default ProjectDetail
