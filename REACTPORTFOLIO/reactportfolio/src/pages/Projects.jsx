import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

function CountUp({ value, duration = 2 }) {
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

  return <span ref={ref}>{count}</span>
}

function ProjectCard({ project, index, isFeatured = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseXRelative = (e.clientX - centerX) / (rect.width / 2)
    const mouseYRelative = (e.clientY - centerY) / (rect.height / 2)
    mouseX.set(mouseXRelative * 0.5)
    mouseY.set(mouseYRelative * 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const rotationOffset = index % 2 === 0 ? -2 : 2

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: rotationOffset, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1]
      }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        gridColumn: isFeatured ? '1 / -1' : 'auto'
      }}
    >
      <motion.a
        href={project.liveUrl || project.githubUrl || '#'}
        target={project.liveUrl || project.githubUrl ? '_blank' : '_self'}
        rel="noreferrer"
        className="project-card"
        data-featured={isFeatured}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d'
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="project-accent-line"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {isFeatured && (
          <motion.div
            className="project-featured-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            FEATURED
          </motion.div>
        )}

        <motion.div
          className="project-number"
          style={{ transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)' }}
          transition={{ duration: 0.3 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        <motion.div
          className="project-content"
          style={{ transform: isHovered ? 'translateZ(20px) translateY(-4px)' : 'translateZ(0px)' }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
        </motion.div>

        <motion.div
          className="project-tags"
          style={{ transform: isHovered ? 'translateZ(15px)' : 'translateZ(0px)' }}
        >
          {project.technologies && project.technologies.slice(0, isFeatured ? 10 : 5).map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="project-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.1 + techIndex * 0.03,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies && project.technologies.length > (isFeatured ? 10 : 5) && (
            <span className="project-tag">+{project.technologies.length - (isFeatured ? 10 : 5)}</span>
          )}
        </motion.div>

        <motion.div
          className="project-footer"
          style={{ transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)' }}
        >
          <span className="project-link">
            {project.liveUrl ? 'Voir le projet' : 'Voir le code'}
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              animate={{ x: isHovered ? 4 : 0, y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </span>
        </motion.div>

        <motion.div
          className="project-glow"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.a>
    </motion.div>
  )
}

function FilterTab({ label, isActive, onClick, index }) {
  return (
    <motion.button
      className={`filter-tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  )
}

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('Tous')

  const defaultProjects = [
    {
      _id: '1',
      title: 'Jolof\'Era',
      description: 'Plateforme SaaS multi-tenant permettant aux commerçants et prestataires de gérer leurs réservations en ligne, leur catalogue produits et leurs paiements. Notifications en temps réel et gestion multi-boutiques.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'WebSocket', 'AWS'],
      liveUrl: 'https://jolofera.com',
      githubUrl: 'https://github.com/Amethnb2218/flashrv-react',
      category: 'Full Stack',
      featured: true
    },
    {
      _id: '2',
      title: 'Teranga AI',
      description: 'Système d\'aide à la décision agricole propulsé par l\'IA pour les agriculteurs ouest-africains. Prédiction de rendement par Machine Learning, optimisation de calendrier cultural, évaluation des risques et support vocal multilingue en 9 langues dont le wolof, le pulaar et le sérère.',
      technologies: ['Python', 'Machine Learning', 'NLP', 'React', 'API REST', 'Groq', 'HuggingFace'],
      liveUrl: 'https://teranga-assistant.onrender.com',
      githubUrl: 'https://github.com/Amethnb2218',
      category: 'IA',
      featured: true
    },
    {
      _id: '3',
      title: 'FresCOOP',
      description: 'Solution digitale permettant aux coopératives agricoles de gérer leurs membres, mutualiser les achats et accéder à de nouveaux marchés. Tableau de bord collaboratif et suivi en temps réel.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      githubUrl: 'https://github.com/Amethnb2218',
      category: 'Full Stack'
    },
    {
      _id: '4',
      title: 'LigueyFemme',
      description: 'Application mobile d\'inclusion financière dédiée aux femmes au Sénégal. Accès micro-crédits, tontines digitales, éducation financière et mise en réseau de femmes entrepreneures.',
      technologies: ['React Native', 'Node.js', 'AWS Lambda', 'MongoDB'],
      githubUrl: 'https://github.com/Amethnb2218',
      category: 'Mobile'
    },
    {
      _id: '5',
      title: 'Wolof ASR Lambda',
      description: 'Service cloud de transcription automatique de la parole en wolof. API serverless sur AWS Lambda avec modèle ASR pré-inclus dans l\'image Docker pour inférence rapide.',
      technologies: ['Python', 'AWS Lambda', 'Docker', 'Machine Learning'],
      githubUrl: 'https://github.com/Amethnb2218',
      category: 'IA'
    },
    {
      _id: '6',
      title: 'Docker React Portfolio',
      description: 'Pipeline DevOps complète : conteneurisation Docker multi-stage, CI/CD Jenkins, analyse qualité SonarQube, orchestration Kubernetes, IaC Terraform, monitoring Prometheus/Grafana et scan sécurité Trivy.',
      technologies: ['React', 'Docker', 'Jenkins', 'Kubernetes', 'Terraform', 'SonarQube', 'Prometheus', 'Grafana', 'Trivy'],
      githubUrl: 'https://github.com/Amethnb2218/docker-REACTPORTFOLIO',
      category: 'DevOps'
    },
    {
      _id: '10',
      title: 'Pipeline DevOps Orange Digital Center',
      description: 'Projet fil rouge formation DevOps : pipeline end-to-end intégrant Docker, Jenkins, SonarQube, Kubernetes, Terraform, Prometheus/Grafana et Trivy. Déploiement sur cluster K8s et AWS EKS.',
      technologies: ['Docker', 'Jenkins', 'Kubernetes', 'Terraform', 'SonarQube', 'Prometheus', 'Grafana', 'Trivy'],
      githubUrl: 'https://github.com/Amethnb2218',
      category: 'DevOps'
    },
    {
      _id: '7',
      title: 'API Portfolio Express',
      description: 'API REST de gestion de projets de portfolio avec Express.js et MongoDB Atlas. CRUD complet, authentification, upload d\'images et configuration cloud.',
      technologies: ['Express.js', 'MongoDB', 'JWT', 'Multer'],
      githubUrl: 'https://github.com/Amethnb2218',
      category: 'Full Stack'
    },
    {
      _id: '8',
      title: 'Infrastructure Terraform',
      description: 'Provisioning automatisé d\'infrastructure AWS : VPC, sous-réseaux, instances EC2, load balancers et déploiement EKS. Gestion multi-environnement dev/staging/prod.',
      technologies: ['Terraform', 'AWS', 'Docker', 'CI/CD'],
      githubUrl: 'https://github.com/Amethnb2218',
      category: 'DevOps'
    },
    {
      _id: '9',
      title: '4ura.tech',
      description: 'Site web dédié au bien-être et développement personnel avec interface apaisante et contenu orienté santé mentale et physique.',
      technologies: ['React', 'Tailwind CSS', 'Vite'],
      liveUrl: 'https://4ura.tech',
      githubUrl: 'https://github.com/Amethnb2218',
      category: 'Full Stack'
    }
  ]

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    fetch('/api/projects', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeout)
        if (data.length > 0) {
          setProjects(data)
        } else {
          setProjects(defaultProjects)
        }
        setLoading(false)
      })
      .catch(() => {
        clearTimeout(timeout)
        setProjects(defaultProjects)
        setLoading(false)
      })
  }, [])

  const filters = ['Tous', 'Full Stack', 'DevOps', 'Mobile', 'IA']

  const filteredProjects = activeFilter === 'Tous'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{ width: 48, height: 48, border: '3px solid rgba(200,121,65,0.1)', borderTopColor: '#c87941', borderRadius: '50%' }}
        />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: '#555', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}
        >
          CHARGEMENT DES PROJETS...
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
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .projects-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(200, 121, 65, 0.04) 1px, transparent 0);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: -1;
          opacity: 0.4;
        }
        .projects-hero {
          margin-bottom: 4rem;
          text-align: center;
          position: relative;
        }
        .projects-counter {
          font-family: 'Playfair Display', serif;
          font-size: clamp(6rem, 15vw, 12rem);
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 2px rgba(200, 121, 65, 0.3);
          text-stroke: 2px rgba(200, 121, 65, 0.3);
          line-height: 1;
          margin-bottom: -2rem;
          letter-spacing: -0.05em;
          position: relative;
        }
        .projects-counter-fill {
          position: absolute;
          inset: 0;
          color: #c87941;
          -webkit-text-stroke: 0;
          text-stroke: 0;
          clip-path: inset(0 0 0 0);
        }
        .projects-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: #e8e8e8;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }
        .projects-hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: #8a8a8a;
          line-height: 1.7;
          max-width: 700px;
          margin: 0 auto;
        }
        .projects-filters {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 4rem;
          flex-wrap: wrap;
          position: relative;
        }
        .filter-tab {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.7rem 1.5rem;
          background: #141414;
          color: #8a8a8a;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          letter-spacing: 0.02em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
        }
        .filter-tab::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(200, 121, 65, 0.1), rgba(200, 121, 65, 0.05));
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .filter-tab:hover {
          color: #e8e8e8;
          border-color: rgba(200, 121, 65, 0.2);
          transform: translateY(-2px);
        }
        .filter-tab:hover::before {
          opacity: 1;
        }
        .filter-tab.active {
          color: #c87941;
          border-color: rgba(200, 121, 65, 0.4);
          background: rgba(200, 121, 65, 0.08);
          box-shadow: 0 0 20px rgba(200, 121, 65, 0.15);
        }
        .filter-tab.active::before {
          opacity: 1;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          position: relative;
        }
        .project-card {
          display: block;
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 2.5rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .project-card[data-featured="true"] {
          padding: 3rem;
          background: linear-gradient(135deg, #141414, #1a1a1a);
        }
        .project-accent-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #c87941, #d4956a, #c87941);
          transform-origin: left;
        }
        .project-card:hover .project-accent-line {
          height: 4px;
          box-shadow: 0 0 20px rgba(200, 121, 65, 0.5);
        }
        .project-featured-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          color: #c87941;
          background: rgba(200, 121, 65, 0.1);
          border: 1px solid rgba(200, 121, 65, 0.3);
          padding: 0.4rem 0.9rem;
          border-radius: 100px;
          letter-spacing: 0.1em;
          z-index: 2;
        }
        .project-number {
          font-family: 'Playfair Display', serif;
          font-size: 5rem;
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 1px rgba(200, 121, 65, 0.15);
          text-stroke: 1px rgba(200, 121, 65, 0.15);
          line-height: 1;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }
        .project-content {
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }
        .project-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #e8e8e8;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .project-card[data-featured="true"] .project-title {
          font-size: 2rem;
        }
        .project-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #8a8a8a;
          line-height: 1.7;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }
        .project-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 500;
          color: #9e5e30;
          background: rgba(200, 121, 65, 0.08);
          border: 1px solid rgba(200, 121, 65, 0.15);
          padding: 0.4rem 0.9rem;
          border-radius: 6px;
          letter-spacing: -0.01em;
          transition: all 0.3s ease;
        }
        .project-card:hover .project-tag {
          border-color: rgba(200, 121, 65, 0.3);
          background: rgba(200, 121, 65, 0.12);
        }
        .project-footer {
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 1;
        }
        .project-link {
          color: #c87941;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: gap 0.3s ease;
        }
        .project-card:hover .project-link {
          gap: 12px;
        }
        .project-glow {
          position: absolute;
          inset: -100px;
          background: radial-gradient(circle at 50% 50%, rgba(200, 121, 65, 0.08), transparent 60%);
          opacity: 0;
          pointer-events: none;
        }
        .project-card:hover {
          border-color: rgba(200, 121, 65, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(200, 121, 65, 0.1);
          transform: translateY(-4px);
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .projects-page {
            padding: 7rem 1.5rem 3rem;
          }
          .projects-counter {
            font-size: 5rem;
            margin-bottom: -1rem;
          }
          .filter-tab {
            font-size: 0.7rem;
            padding: 0.6rem 1.2rem;
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
        <div className="projects-hero">
          <motion.div
            className="projects-counter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <CountUp value={projects.length} />
            <motion.div
              className="projects-counter-fill"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <CountUp value={projects.length} />
            </motion.div>
          </motion.div>

          <motion.h1
            className="projects-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Projets réalisés
          </motion.h1>

          <motion.p
            className="projects-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Une collection de solutions Full Stack, DevOps, Mobile et IA qui illustrent
            mon expertise technique et ma passion pour l'innovation.
          </motion.p>
        </div>

        <div className="projects-filters">
          {filters.map((filter, index) => (
            <FilterTab
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              index={index}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', color: '#8a8a8a', fontSize: '1rem', marginTop: '4rem' }}
          >
            Aucun projet dans cette catégorie.
          </motion.p>
        )}

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              totalProjects={filteredProjects.length}
              isFeatured={project.featured || false}
            />
          ))}
        </div>
      </motion.main>
    </>
  )
}

export default Projects
