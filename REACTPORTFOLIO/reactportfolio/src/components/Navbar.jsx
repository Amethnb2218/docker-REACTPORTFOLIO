import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/', label: 'Accueil' },
    { path: '/projects', label: 'Projets' },
    { path: '/about', label: 'A propos' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <>
      <style>{`
        .ms-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 2.5rem;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(15, 15, 25, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          box-sizing: border-box;
        }
        .ms-nav-links {
          display: flex;
          list-style: none;
          gap: 0.3rem;
          margin: 0;
          padding: 0;
        }
        .ms-nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          text-decoration: none;
          color: #a0aec0;
        }
        .ms-nav-link:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
        }
        .ms-nav-link.active {
          color: #6c63ff;
          background: rgba(108, 99, 255, 0.1);
        }
        .ms-nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .ms-nav-logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #6c63ff, #00d4aa);
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fff;
        }
        .ms-nav-logo-text {
          font-size: 1rem;
          font-weight: 600;
          color: #e2e8f0;
        }
        @media (max-width: 768px) {
          .ms-navbar {
            padding: 0.7rem 1rem;
          }
          .ms-nav-logo-text {
            display: none;
          }
          .ms-nav-links {
            gap: 0;
          }
          .ms-nav-link {
            font-size: 0.82rem;
            padding: 0.4rem 0.6rem;
          }
        }
        @media (max-width: 480px) {
          .ms-nav-link {
            font-size: 0.75rem;
            padding: 0.35rem 0.5rem;
          }
        }
      `}</style>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="ms-navbar"
      >
        <Link to="/" className="ms-nav-logo">
          <span className="ms-nav-logo-icon">MS</span>
          <span className="ms-nav-logo-text">Mouhamed Sall</span>
        </Link>

        <ul className="ms-nav-links">
          {links.map((link) => (
            <li key={link.path} style={{ listStyle: 'none' }}>
              <Link
                to={link.path}
                className={`ms-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  )
}

export default Navbar
