import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { path: '/', label: 'Accueil' },
    { path: '/projects', label: 'Projets' },
    { path: '/about', label: 'A propos' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .navbar.scrolled {
          background: rgba(10, 10, 10, 0.98);
          border-bottom-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          padding: 0.75rem 2rem;
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 0.25rem;
          margin: 0;
          padding: 0;
          align-items: center;
        }
        .nav-link {
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.5rem 1.1rem;
          border-radius: 100px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          color: #a1a1aa;
          cursor: pointer;
          position: relative;
          letter-spacing: -0.01em;
        }
        .nav-link:hover {
          color: #f5f5f5;
          background: rgba(255, 255, 255, 0.05);
        }
        .nav-link.active {
          color: #ffffff;
          background: rgba(59, 130, 246, 0.12);
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.15), inset 0 0 12px rgba(59, 130, 246, 0.05);
        }
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 8px;
          border: none;
          background: transparent;
        }
        .nav-hamburger span {
          display: block;
          width: 20px;
          height: 1.5px;
          background: #f5f5f5;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }
        .nav-hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .nav-hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
        .nav-mobile-menu {
          position: fixed;
          top: 4.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(20, 20, 20, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 200px;
          z-index: 999;
        }
        .nav-mobile-link {
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          color: #a1a1aa;
          text-decoration: none;
          transition: all 0.2s ease;
          text-align: center;
        }
        .nav-mobile-link:hover,
        .nav-mobile-link.active {
          color: #ffffff;
          background: rgba(59, 130, 246, 0.1);
        }
        @media (max-width: 768px) {
          .navbar {
            padding: 0.5rem 0.75rem;
          }
          .nav-links {
            display: none;
          }
          .nav-hamburger {
            display: flex;
          }
        }
      `}</style>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.path} style={{ listStyle: 'none' }}>
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className={`nav-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
