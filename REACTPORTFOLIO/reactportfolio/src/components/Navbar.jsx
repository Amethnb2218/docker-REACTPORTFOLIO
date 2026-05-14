import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/', label: 'Accueil' },
    { path: '/projects', label: 'Projets' },
    { path: '/about', label: 'À propos' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        Mouhamed Sall
      </Link>
      <ul style={styles.links}>
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              style={{
                ...styles.link,
                color: location.pathname === link.path ? '#64ffda' : '#ccd6f6'
              }}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  style={styles.underline}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 3rem',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
    backdropFilter: 'blur(10px)'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#64ffda'
  },
  links: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem'
  },
  link: {
    position: 'relative',
    fontSize: '1rem',
    transition: 'color 0.3s'
  },
  underline: {
    position: 'absolute',
    bottom: '-4px',
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: '#64ffda'
  }
}

export default Navbar
