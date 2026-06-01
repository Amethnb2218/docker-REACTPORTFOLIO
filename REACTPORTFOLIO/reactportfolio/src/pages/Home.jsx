import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Home() {
  // Generate particles for background effect
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 10,
    driftX: (Math.random() - 0.5) * 200,
    driftY: -(Math.random() * 300 + 100)
  }))

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.main}
    >
      {/* Particle Background */}
      <div style={styles.particleContainer}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              ...styles.particle,
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--drift-x': `${p.driftX}px`,
              '--drift-y': `${p.driftY}px`,
              animation: `particle-drift ${p.duration}s ${p.delay}s infinite linear`
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div style={styles.orbOne} />
      <div style={styles.orbTwo} />

      <section style={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={styles.badge}
        >
          <span style={styles.badgeDot} />
          Disponible pour de nouvelles opportunites
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={styles.name}
        >
          Mouhamed Sall
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={styles.title}
        >
          Full Stack Developer &<br />Software Engineer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={styles.description}
        >
          Etudiant ingenieur en Genie Logiciel a l'ESP Dakar. Je concois des applications web
          performantes et des architectures scalables. Experience chez Sonatel, certifie AWS & Docker.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={styles.actions}
        >
          <Link to="/projects" style={styles.ctaPrimary}>
            <span>Voir mes projets</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/contact" style={styles.ctaSecondary}>
            Me contacter
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          style={styles.socials}
        >
          <a href="https://github.com/Amethnb2218" target="_blank" rel="noreferrer" style={styles.socialLink} title="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/mouhamed-sall-b35637293/" target="_blank" rel="noreferrer" style={styles.socialLink} title="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="mailto:amethsl2218@gmail.com" style={styles.socialLink} title="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={styles.scrollIndicator}
        >
          <div style={styles.scrollMouse}>
            <div style={styles.scrollDot} />
          </div>
        </motion.div>
      </section>
    </motion.main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '4rem'
  },
  particleContainer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  },
  particle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(108, 99, 255, 0.6)',
    boxShadow: '0 0 6px rgba(108, 99, 255, 0.4)'
  },
  orbOne: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(108, 99, 255, 0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(40px)',
    animation: 'float 8s ease-in-out infinite',
    pointerEvents: 'none'
  },
  orbTwo: {
    position: 'absolute',
    bottom: '10%',
    left: '5%',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(0, 212, 170, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(40px)',
    animation: 'float 10s ease-in-out infinite reverse',
    pointerEvents: 'none'
  },
  hero: {
    maxWidth: '800px',
    padding: '0 2rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1.2rem',
    background: 'rgba(0, 212, 170, 0.08)',
    border: '1px solid rgba(0, 212, 170, 0.2)',
    borderRadius: '50px',
    fontSize: '0.85rem',
    color: 'var(--accent-secondary)',
    marginBottom: '2rem',
    fontWeight: '500'
  },
  badgeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#00d4aa',
    animation: 'pulse-glow 2s ease-in-out infinite',
    boxShadow: '0 0 8px rgba(0, 212, 170, 0.6)'
  },
  name: {
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #f0f0f5 0%, #a0a0b8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.75rem',
    letterSpacing: '-1.5px',
    lineHeight: '1.1'
  },
  title: {
    fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #6c63ff, #00d4aa)',
    backgroundSize: '200% 200%',
    animation: 'gradient-shift 4s ease infinite',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1.5rem',
    lineHeight: '1.3'
  },
  description: {
    fontSize: '1.1rem',
    color: 'var(--text-secondary)',
    maxWidth: '580px',
    margin: '0 auto 2.5rem',
    lineHeight: '1.8'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '3rem'
  },
  ctaPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.9rem 2rem',
    background: 'linear-gradient(135deg, #6c63ff, #5a52e0)',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(108, 99, 255, 0.3)',
    border: 'none'
  },
  ctaSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.9rem 2rem',
    background: 'transparent',
    color: 'var(--text-primary)',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.15)'
  },
  socials: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: 'var(--text-secondary)',
    transition: 'all 0.3s ease'
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem'
  },
  scrollMouse: {
    width: '24px',
    height: '38px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '8px'
  },
  scrollDot: {
    width: '3px',
    height: '8px',
    borderRadius: '3px',
    background: 'var(--accent-primary)',
    animation: 'float 2s ease-in-out infinite'
  }
}

export default Home
