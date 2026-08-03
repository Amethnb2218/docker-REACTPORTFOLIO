import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Scene3D from '../components/Scene3D'

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredButton, setHoveredButton] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleButtonMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    cursorX.set(x * 0.3)
    cursorY.set(y * 0.3)
  }

  const handleButtonMouseLeave = () => {
    cursorX.set(0)
    cursorY.set(0)
  }

  const splitText = (text) => {
    return text.split(' ').map((word, i) => (
      <motion.span
        key={i}
        style={{ display: 'inline-block', marginRight: '0.3em' }}
        initial={{ opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' }}
        animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
        transition={{
          duration: 0.8,
          delay: i * 0.15,
          ease: [0.76, 0, 0.24, 1]
        }}
      >
        {word}
      </motion.span>
    ))
  }

  return (
    <>
      <style>{`
        .home-page {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
          background: radial-gradient(ellipse at 50% 20%, rgba(200, 121, 65, 0.03), transparent 60%);
        }
        .home-bg-gradient {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(200, 121, 65, 0.04), transparent 40%);
        }
        .home-page:hover .home-bg-gradient {
          opacity: 1;
        }
        .home-geometric-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200, 121, 65, 0.3), transparent);
          width: 100%;
          top: 20%;
        }
        .home-geometric-line-bottom {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200, 121, 65, 0.2), transparent);
          width: 100%;
          bottom: 25%;
        }
        .home-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          text-align: center;
        }
        .home-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #e8e8e8;
          margin-bottom: 1rem;
          overflow: hidden;
        }
        .home-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          font-weight: 500;
          color: #8a8a8a;
          margin-bottom: 2.5rem;
          letter-spacing: -0.01em;
        }
        .home-subtitle-word {
          display: inline-block;
          margin-right: 0.3em;
        }
        .home-description {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          line-height: 1.8;
          color: #8a8a8a;
          max-width: 600px;
          margin: 0 auto 3rem;
        }
        .home-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 2rem;
          background: #c87941;
          color: #0c0c0c;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          letter-spacing: -0.01em;
          position: relative;
          overflow: hidden;
        }
        .home-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .home-cta:hover::before {
          transform: translateX(100%);
        }
        .home-cta:hover {
          background: #d4956a;
          transform: scale(1.02);
          box-shadow: 0 12px 32px rgba(200, 121, 65, 0.4);
        }
        .home-status {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: #555;
          z-index: 10;
        }
        .home-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c87941;
          animation: statusPulse 2s ease-in-out infinite;
        }
        .home-status-text {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid rgba(200, 121, 65, 0.5);
          animation: typewriter 2s steps(30) 2s 1 normal both, blink 1s steps(1) infinite;
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.95); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
        .home-scroll-indicator {
          position: fixed;
          bottom: 4rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          z-index: 10;
          cursor: pointer;
        }
        .home-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(180deg, rgba(200, 121, 65, 0.4), transparent);
        }
        .home-scroll-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c87941;
          animation: scrollBounce 2s ease-in-out infinite;
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.4; }
        }
        @media (max-width: 640px) {
          .home-page {
            padding: 1.5rem;
          }
          .home-status, .home-scroll-indicator {
            display: none;
          }
        }
      `}</style>
      <motion.main
        className="home-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`
        }}
      >
        <div className="home-bg-gradient" />

        <motion.div
          className="home-geometric-line"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          className="home-geometric-line-bottom"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        <Scene3D />

        <div className="home-content">
          <h1 className="home-hero-title">
            {splitText('Mouhamed Sall')}
          </h1>

          <motion.p
            className="home-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {['Full', 'Stack', 'Developer', '&', 'DevOps', 'Engineer'].map((word, i) => (
              <motion.span
                key={i}
                className="home-subtitle-word"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.p
            className="home-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Développeur Full Stack et étudiant ingénieur en Génie Logiciel à l'ESP Dakar.
            Fondateur de Jolofera, plateforme SaaS multi-tenant. Certifié AWS Cloud Practitioner
            et AWS re/Start Graduate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              style={{ x: cursorXSpring, y: cursorYSpring }}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              onHoverStart={() => setHoveredButton(true)}
              onHoverEnd={() => setHoveredButton(false)}
            >
              <Link to="/projects" className="home-cta">
                Voir mes projets
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  animate={{ x: hoveredButton ? 3 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="home-status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="home-status-dot" />
          <span className="home-status-text">Disponible pour opportunités</span>
        </motion.div>

        <motion.div
          className="home-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className="home-scroll-line" />
          <div className="home-scroll-dot" />
        </motion.div>
      </motion.main>
    </>
  )
}

export default Home
