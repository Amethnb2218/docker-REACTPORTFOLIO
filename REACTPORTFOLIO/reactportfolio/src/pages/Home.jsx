import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const nameLetters = 'Mouhamed Sall'.split('')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.03, delayChildren: 0.3 }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }
    }
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.1 + 0.8, ease: [0.4, 0, 0.2, 1] }
    })
  }

  return (
    <>
      <style>{`
        .home-glow {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .home-hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem 4rem;
          text-align: center;
        }
        .home-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 500;
          color: #3b82f6;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          padding: 0.4rem 1rem;
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 100px;
          background: rgba(59, 130, 246, 0.05);
        }
        .home-name {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 1rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          perspective: 500px;
        }
        .home-name span {
          display: inline-block;
          color: #ffffff;
        }
        .home-subtitle {
          font-size: clamp(1.2rem, 3vw, 2rem);
          font-weight: 600;
          color: #d4d4d8;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .home-description {
          font-size: 1.05rem;
          color: #a1a1aa;
          max-width: 520px;
          line-height: 1.8;
          margin-bottom: 2.5rem;
        }
        .home-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        .home-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 2rem;
          background: #3b82f6;
          color: #ffffff;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
          text-decoration: none;
          letter-spacing: -0.01em;
        }
        .home-cta-primary:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35);
        }
        .home-cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.9rem 2rem;
          background: transparent;
          color: #f5f5f5;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.12);
          cursor: pointer;
          text-decoration: none;
          letter-spacing: -0.01em;
        }
        .home-cta-secondary:hover {
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(59, 130, 246, 0.05);
          transform: translateY(-2px);
        }
        .home-socials {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
        }
        .home-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #a1a1aa;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .home-social-link:hover {
          color: #3b82f6;
          border-color: rgba(59, 130, 246, 0.4);
          background: rgba(59, 130, 246, 0.08);
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }
        .home-scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: #71717a;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
        }
        .home-scroll-chevron {
          animation: bounceDown 2s infinite;
        }
        @keyframes bounceDown {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(6px); }
          60% { transform: translateY(3px); }
        }
        @media (max-width: 640px) {
          .home-actions {
            flex-direction: column;
            align-items: center;
          }
          .home-cta-primary, .home-cta-secondary {
            width: 100%;
            justify-content: center;
            max-width: 280px;
          }
          .home-hero {
            padding: 5rem 1.5rem 3rem;
          }
        }
      `}</style>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Cursor-following glow */}
        <div
          className="home-glow"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.04), transparent 60%)`
          }}
        />

        <section className="home-hero">
          {/* Label */}
          <motion.span
            className="home-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Full Stack Developer
          </motion.span>

          {/* Name with letter animation */}
          <motion.h1
            className="home-name"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {nameLetters.map((letter, i) => (
              <motion.span key={i} variants={letterVariants}>
                {letter === ' ' ? ' ' : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="home-subtitle"
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            Software Engineer
          </motion.h2>

          {/* Description */}
          <motion.p
            className="home-description"
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            Etudiant ingenieur en Genie Logiciel a l'ESP Dakar. Je concois des applications web
            performantes et des architectures scalables. Experience chez Sonatel, certifie AWS & Docker.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="home-actions"
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/projects" className="home-cta-primary">
              Voir mes projets
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/contact" className="home-cta-secondary">
              Me contacter
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="home-socials"
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <a href="https://github.com/Amethnb2218" target="_blank" rel="noreferrer" className="home-social-link" title="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/mouhamed-sall-b35637293/" target="_blank" rel="noreferrer" className="home-social-link" title="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:amethsl2218@gmail.com" className="home-social-link" title="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="home-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <span>scroll</span>
            <svg className="home-scroll-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </section>
      </motion.main>
    </>
  )
}

export default Home
