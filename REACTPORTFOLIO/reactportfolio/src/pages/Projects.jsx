import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { projects } from '../data/projects.js'
import { hackathons } from '../data/hackathons.js'

// Les categories fines des projets sont regroupees en familles pour limiter le
// nombre de filtres proposes au visiteur. Toute categorie absente de cette table
// devient automatiquement son propre filtre.
const CATEGORY_GROUPS = {
  'DevOps': 'Cloud & DevOps',
  'Cloud': 'Cloud & DevOps',
  'Full Stack': 'Full Stack',
  'IA': 'IA & Data',
  'Mobile': 'Mobile',
  'Sécurité': 'Sécurité & Réseaux',
  'Systèmes & Réseaux': 'Sécurité & Réseaux'
}

const GROUP_ORDER = ['Cloud & DevOps', 'Full Stack', 'IA & Data', 'Sécurité & Réseaux', 'Mobile']

const groupOf = (project) => CATEGORY_GROUPS[project.category] || project.category

function buildFilters(items) {
  const counts = new Map()
  items.forEach((project) => {
    const group = groupOf(project)
    counts.set(group, (counts.get(group) || 0) + 1)
  })

  const groups = [...counts.entries()]
    .map(([label, count]) => ({ id: label, label, count }))
    .sort((a, b) => {
      const ia = GROUP_ORDER.indexOf(a.label)
      const ib = GROUP_ORDER.indexOf(b.label)
      if (ia !== -1 && ib !== -1) return ia - ib
      if (ia !== -1) return -1
      if (ib !== -1) return 1
      return a.label.localeCompare(b.label)
    })

  return [{ id: 'all', label: 'Tous', count: items.length }, ...groups]
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      className={project.featured ? 'project-card-wrap is-featured' : 'project-card-wrap'}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/projects/${project.slug}`} className="project-card">
        <div className="project-card-head">
          <span className="project-card-number">{project.number}</span>
          <span className="project-card-category">{project.category}</span>
        </div>

        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-subtitle">{project.subtitle}</p>

        <div className="project-card-tech">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="project-card-tech-item">{tech}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="project-card-tech-more">+{project.technologies.length - 3}</span>
          )}
        </div>

        <div className="project-card-foot">
          <div className="project-card-flags">
            {project.liveUrl && (
              <span className="project-card-live">
                <span className="project-card-live-dot" />
                En ligne
              </span>
            )}
            {project.mtcorporate && <span className="project-card-flag">MTCorporate</span>}
            {!project.liveUrl && !project.mtcorporate && (
              <span className="project-card-period">{project.period}</span>
            )}
          </div>
          <span className="project-card-arrow" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function HackathonCard({ hackathon, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.article
      className={open ? 'hackathon-card is-open' : 'hackathon-card'}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hackathon-award">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
        {hackathon.award}
      </div>

      <h3 className="hackathon-name">{hackathon.name}</h3>
      <div className="hackathon-event">{hackathon.event} · {hackathon.year}</div>
      <p className="hackathon-desc">{hackathon.description}</p>

      {hackathon.status && (
        <div className="hackathon-next">
          <span className="hackathon-next-label">Prochaine étape</span>
          <span className="hackathon-next-value">{hackathon.status}</span>
        </div>
      )}

      <div className="hackathon-tags">
        {hackathon.tags.map((tag) => (
          <span key={tag} className="hackathon-tag">{tag}</span>
        ))}
      </div>

      <button
        type="button"
        className="hackathon-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        {open ? 'Masquer le détail' : 'Rôle et réalisations'}
        <svg
          className={open ? 'hackathon-chevron is-open' : 'hackathon-chevron'}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            className="hackathon-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hackathon-meta-label">Rôle</div>
            <div className="hackathon-role">{hackathon.role}</div>

            <div className="hackathon-meta-label">Réalisations</div>
            <ul className="hackathon-contributions">
              {hackathon.contributions.map((contribution) => (
                <li key={contribution} className="hackathon-contribution">
                  <span className="hackathon-contribution-dot" />
                  <span>{contribution}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {hackathon.projectSlug && (
        <Link to={`/projects/${hackathon.projectSlug}`} className="hackathon-project-link">
          Voir le projet associé
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </motion.article>
  )
}

function Projects() {
  const filters = useMemo(() => buildFilters(projects), [])
  const [activeFilter, setActiveFilter] = useState('all')

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((project) => groupOf(project) === activeFilter)
  }, [activeFilter])

  return (
    <>
      <style>{`
        .projects-page {
          min-height: 100vh;
          padding: 110px 2rem 80px;
          max-width: 1160px;
          margin: 0 auto;
        }
        .projects-hero {
          text-align: center;
          margin-bottom: 2.25rem;
        }
        .projects-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5.5vw, 3.6rem);
          font-weight: 700;
          color: #00362e;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #00362e 0%, #00362e 50%, #e8a020 100%);
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textFillAnimation 1.5s ease-in-out forwards;
        }
        @keyframes textFillAnimation {
          0% { background-position: 100% 0; }
          100% { background-position: 0 0; }
        }
        .projects-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          color: #3a5450;
          line-height: 1.7;
          max-width: 620px;
          margin: 0 auto 1.5rem;
        }
        .projects-metrics {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.6rem;
        }
        .projects-metric {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #3a5450;
          padding: 0.45rem 0.9rem;
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(0, 54, 46, 0.1);
          border-radius: 100px;
          text-decoration: none;
        }
        .projects-metric strong {
          color: #00362e;
          font-weight: 700;
        }
        a.projects-metric {
          color: #b8760a;
          border-color: rgba(232, 160, 32, 0.35);
          background: rgba(232, 160, 32, 0.1);
          transition: all 0.3s ease;
        }
        a.projects-metric strong { color: #b8760a; }
        a.projects-metric:hover {
          background: rgba(232, 160, 32, 0.18);
          transform: translateY(-2px);
        }

        /* --- Barre de filtres collante --- */
        .projects-toolbar {
          position: sticky;
          top: 5.25rem;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.6rem 0.75rem;
          margin-bottom: 1.75rem;
          background: rgba(235, 241, 238, 0.97);
          backdrop-filter: blur(24px) saturate(1.4);
          -webkit-backdrop-filter: blur(24px) saturate(1.4);
          border: 1px solid rgba(0, 54, 46, 0.1);
          border-radius: 100px;
          box-shadow: 0 10px 28px rgba(0, 54, 46, 0.1), 0 0 0 6px rgba(232, 239, 236, 0.6);
        }
        .projects-filters {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .projects-filters::-webkit-scrollbar { display: none; }
        .projects-filter {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: #3a5450;
          padding: 0.5rem 1rem;
          background: transparent;
          border: none;
          border-radius: 100px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .projects-filter:hover { background: rgba(0, 54, 46, 0.06); color: #00362e; }
        .projects-filter.is-active {
          background: #00362e;
          color: #e8efec;
          font-weight: 600;
        }
        .projects-filter-count {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          opacity: 0.55;
        }
        .projects-filter.is-active .projects-filter-count { opacity: 0.8; color: #e8a020; }
        .projects-toolbar-count {
          flex-shrink: 0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #8a8a8a;
          padding-right: 0.75rem;
        }

        /* --- Grille de projets --- */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
          align-items: stretch;
        }
        .project-card-wrap { display: flex; }
        .project-card {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 0.7rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.42);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(0, 54, 46, 0.09);
          border-radius: 16px;
          text-decoration: none;
          color: inherit;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
        }
        .project-card:hover {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.62);
          border-color: rgba(232, 160, 32, 0.4);
          box-shadow: 0 16px 40px rgba(0, 54, 46, 0.12);
        }
        .project-card-wrap.is-featured .project-card {
          border-color: rgba(232, 160, 32, 0.32);
          box-shadow: inset 3px 0 0 #e8a020;
        }
        .project-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }
        .project-card-number {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #c9d4d0;
          line-height: 1;
          transition: color 0.35s ease;
        }
        .project-card:hover .project-card-number { color: #e8a020; }
        .project-card-category {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #3a5450;
          padding: 0.3rem 0.65rem;
          background: rgba(0, 54, 46, 0.06);
          border-radius: 100px;
          white-space: nowrap;
        }
        .project-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #00362e;
          letter-spacing: -0.02em;
          line-height: 1.25;
          margin: 0;
        }
        .project-card-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          color: #3a5450;
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: auto;
          padding-top: 0.35rem;
        }
        .project-card-tech-item,
        .project-card-tech-more {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: #3a5450;
          padding: 0.25rem 0.55rem;
          background: rgba(157, 216, 216, 0.16);
          border-radius: 6px;
        }
        .project-card-tech-more { color: #8a8a8a; background: transparent; }
        .project-card-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding-top: 0.7rem;
          border-top: 1px solid rgba(0, 54, 46, 0.07);
        }
        .project-card-flags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .project-card-live,
        .project-card-flag,
        .project-card-period {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .project-card-live { color: #1d7a5f; }
        .project-card-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2fa37c;
        }
        .project-card-flag { color: #b8760a; }
        .project-card-period { color: #a5a5a5; }
        .project-card-arrow {
          display: inline-flex;
          color: #c9d4d0;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.35s ease;
        }
        .project-card:hover .project-card-arrow { color: #e8a020; transform: translateX(5px); }

        /* --- Distinctions / hackathons --- */
        .hackathons-section {
          margin-top: 5rem;
        }
        .hackathons-head {
          text-align: center;
          margin-bottom: 2rem;
        }
        .hackathons-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #e8a020;
          margin-bottom: 0.75rem;
        }
        .hackathons-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.9rem, 4.5vw, 2.6rem);
          font-weight: 700;
          color: #00362e;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: 0.85rem;
        }
        .hackathons-intro {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #3a5450;
          line-height: 1.7;
          max-width: 620px;
          margin: 0 auto;
        }
        .hackathons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.25rem;
          align-items: start;
        }
        .hackathon-card {
          display: flex;
          flex-direction: column;
          padding: 1.6rem;
          background: rgba(255, 255, 255, 0.42);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(0, 54, 46, 0.09);
          border-radius: 16px;
          transition: box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
        }
        .hackathon-card:hover {
          background: rgba(255, 255, 255, 0.58);
          border-color: rgba(232, 160, 32, 0.35);
          box-shadow: 0 14px 40px rgba(0, 54, 46, 0.1);
        }
        .hackathon-award {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          align-self: flex-start;
          padding: 0.35rem 0.8rem;
          background: rgba(232, 160, 32, 0.12);
          border: 1px solid rgba(232, 160, 32, 0.3);
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #b8760a;
          margin-bottom: 1rem;
        }
        .hackathon-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #00362e;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 0.3rem;
        }
        .hackathon-event {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          color: #8a8a8a;
          line-height: 1.5;
          margin-bottom: 0.9rem;
        }
        .hackathon-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #3a5450;
          line-height: 1.7;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: none;
        }
        .hackathon-card.is-open .hackathon-desc {
          -webkit-line-clamp: unset;
          overflow: visible;
        }
        .hackathon-next {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding-top: 0.85rem;
          margin-bottom: 1.1rem;
          border-top: 1px solid rgba(0, 54, 46, 0.09);
        }
        .hackathon-next-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.11em;
          color: #8a8a8a;
        }
        .hackathon-next-value {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #00362e;
          line-height: 1.45;
        }
        .hackathon-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-bottom: 1rem;
        }
        .hackathon-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: #3a5450;
          padding: 0.28rem 0.65rem;
          background: rgba(0, 54, 46, 0.05);
          border-radius: 100px;
        }
        .hackathon-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          width: 100%;
          padding: 0.6rem 0.9rem;
          background: rgba(0, 54, 46, 0.04);
          border: 1px solid rgba(0, 54, 46, 0.08);
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: #00362e;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .hackathon-toggle:hover {
          background: rgba(232, 160, 32, 0.1);
          border-color: rgba(232, 160, 32, 0.3);
          color: #b8760a;
        }
        .hackathon-chevron {
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hackathon-chevron.is-open { transform: rotate(180deg); }
        .hackathon-details { overflow: hidden; }
        .hackathon-meta-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8a8a8a;
          margin: 1rem 0 0.4rem;
        }
        .hackathon-role {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #00362e;
        }
        .hackathon-contributions {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .hackathon-contribution {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: #3a5450;
          line-height: 1.6;
          padding: 0.15rem 0;
        }
        .hackathon-contribution-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #e8a020;
          flex-shrink: 0;
          margin-top: 0.55rem;
        }
        .hackathon-project-link {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          gap: 0.4rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #e8a020;
          text-decoration: none;
          margin-top: 1rem;
          transition: gap 0.3s ease;
        }
        .hackathon-project-link:hover { gap: 0.7rem; }

        @media (hover: none) {
          .project-card:hover { transform: none; }
        }
        @media (max-width: 900px) {
          .projects-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
            border-radius: 20px;
            padding: 0.6rem 0.6rem 0.4rem;
          }
          .projects-toolbar-count {
            text-align: center;
            padding: 0 0 0.35rem;
          }
        }
        @media (max-width: 768px) {
          .projects-page {
            padding: 100px 1.25rem 70px;
          }
          .projects-title {
            font-size: clamp(2.2rem, 10vw, 3rem);
          }
          .projects-subtitle {
            font-size: 0.95rem;
            margin-bottom: 1.25rem;
          }
          .projects-metric {
            font-size: 0.66rem;
            padding: 0.4rem 0.75rem;
          }
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .project-card {
            padding: 1.25rem;
            gap: 0.6rem;
          }
          .project-card-title {
            font-size: 1.25rem;
          }
          .hackathons-section {
            margin-top: 4rem;
          }
          .hackathons-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .hackathon-card {
            padding: 1.35rem;
          }
          .hackathon-name {
            font-size: 1.25rem;
          }
        }
        @media (max-width: 480px) {
          .projects-page {
            padding: 92px 1rem 60px;
          }
          .projects-filter {
            font-size: 0.78rem;
            padding: 0.45rem 0.85rem;
          }
        }
      `}</style>

      <motion.main
        className="projects-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="projects-hero">
          <motion.h1
            className="projects-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Projets
          </motion.h1>

          <motion.p
            className="projects-subtitle"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Cloud, DevOps, Full Stack, IA, sécurité et réseaux — du pipeline CI/CD
            à la plateforme SaaS en production. Filtrez par domaine pour aller droit au but.
          </motion.p>

          <motion.div
            className="projects-metrics"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="projects-metric"><strong>{projects.length}</strong> projets</span>
            <a className="projects-metric" href="#distinctions">
              <strong>{hackathons.length}×</strong> finaliste Top 10
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className="projects-metric"><strong>30+</strong> repositories GitHub</span>
          </motion.div>
        </header>

        <div className="projects-toolbar">
          <div className="projects-filters" role="group" aria-label="Filtrer les projets par domaine">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={activeFilter === filter.id ? 'projects-filter is-active' : 'projects-filter'}
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
              >
                {filter.label}
                <span className="projects-filter-count">{filter.count}</span>
              </button>
            ))}
          </div>
          <div className="projects-toolbar-count" aria-live="polite">
            {visibleProjects.length} {visibleProjects.length > 1 ? 'projets' : 'projet'}
          </div>
        </div>

        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <section className="hackathons-section" id="distinctions">
          <div className="hackathons-head">
            <motion.div
              className="hackathons-label"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Distinctions
            </motion.div>

            <motion.h2
              className="hackathons-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Hackathons &amp; challenges d'innovation
            </motion.h2>

            <motion.p
              className="hackathons-intro"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Trois participations, trois fois finaliste dans le Top 10 : fintech et paiements,
              entrepreneuriat social et inclusion financière.
            </motion.p>
          </div>

          <div className="hackathons-grid">
            {hackathons.map((hackathon, index) => (
              <HackathonCard key={hackathon.slug} hackathon={hackathon} index={index} />
            ))}
          </div>
        </section>
      </motion.main>
    </>
  )
}

export default Projects
