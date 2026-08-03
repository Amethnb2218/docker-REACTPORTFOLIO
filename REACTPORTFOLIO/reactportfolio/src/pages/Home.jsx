import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Home() {
  const [hoveredButton, setHoveredButton] = useState(false)
  const [typedRole, setTypedRole] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const roles = [
    'Full Stack Developer',
    'DevOps Engineer',
    'Co-Founder @ MTCorporate',
    'Cloud Architect'
  ]

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseDuration = isDeleting ? 1000 : 2000

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setTypedRole(currentRole.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else if (isDeleting && charIndex > 0) {
        setTypedRole(currentRole.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setRoleIndex((roleIndex + 1) % roles.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, roleIndex, roles])
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])

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

  const splitTextToLetters = (text) => {
    return text.split('').map((char, i) => (
      <motion.span
        key={i}
        style={{
          display: 'inline-block',
          marginRight: char === ' ' ? '0.3em' : '0'
        }}
        initial={{
          opacity: 0,
          rotateX: -90,
          y: 50
        }}
        animate={{
          opacity: 1,
          rotateX: 0,
          y: 0
        }}
        transition={{
          duration: 0.6,
          delay: i * 0.03,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {char === ' ' ? ' ' : char}
      </motion.span>
    ))
  }

  const splitTextToWords = (text) => {
    return text.split(' ').map((word, i) => (
      <motion.span
        key={i}
        style={{ display: 'inline-block', marginRight: '0.3em' }}
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{
          duration: 0.7,
          delay: 1.2 + i * 0.06,
          ease: [0.22, 1, 0.36, 1]
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
          perspective: 1200px;
        }
        .home-3d-hero {
          width: 100%;
          margin-bottom: 2rem;
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
          color: #00362e;
          margin-bottom: 1rem;
          overflow: hidden;
          display: none;
        }
        .home-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          font-weight: 500;
          color: #3a5450;
          margin-bottom: 2.5rem;
          letter-spacing: -0.01em;
          min-height: 2.5rem;
        }
        .home-typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: #e8a020;
          margin-left: 4px;
          animation: blink 1s step-end infinite;
          vertical-align: middle;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .home-trusted {
          margin-top: 4rem;
          text-align: center;
        }
        .home-trusted-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #8a8a8a;
          margin-bottom: 1.5rem;
        }
        .home-trusted-logos {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }
        .home-trusted-logo {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #8a8a8a;
          transition: all 0.3s ease;
        }
        .home-trusted-logo:hover {
          color: #e8a020;
          transform: translateY(-3px);
        }
        .home-scroll-indicator {
          position: fixed;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          z-index: 10;
        }
        .home-scroll-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: #8a8a8a;
          letter-spacing: 0.1em;
        }
        .home-scroll-chevron {
          width: 24px;
          height: 24px;
          border-left: 2px solid #e8a020;
          border-bottom: 2px solid #e8a020;
          transform: rotate(-45deg);
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) rotate(-45deg);
          }
          40% {
            transform: translateY(-10px) rotate(-45deg);
          }
          60% {
            transform: translateY(-5px) rotate(-45deg);
          }
        }
        .home-subtitle-word {
          display: inline-block;
          margin-right: 0.3em;
        }
        .home-description {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          line-height: 1.8;
          color: #3a5450;
          max-width: 600px;
          margin: 0 auto 3rem;
        }
        .home-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 2rem;
          background: #e8a020;
          color: #e8efec;
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
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }
        .home-cta:hover::before {
          left: 100%;
        }
        .home-cta:hover {
          background: #e09b1a;
          transform: scale(1.02) translateY(-2px);
          box-shadow: 0 10px 30px rgba(232, 160, 32, 0.3);
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
          color: #8a8a8a;
          z-index: 10;
        }
        .home-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e8a020;
          animation: statusPulse 2s ease-in-out infinite;
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.95); }
        }
        @media (max-width: 640px) {
          .home-page {
            padding: 1.5rem;
          }
          .home-status {
            display: none;
          }
        }
      `}</style>
      <motion.main
        className="home-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity, scale }}
      >
        <div className="home-content">
          <h1 className="home-hero-title">
            {splitTextToLetters('Mouhamed Sall')}
          </h1>

          <motion.p
            className="home-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {typedRole}<span className="home-typing-cursor"></span>
          </motion.p>

          <motion.p
            className="home-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Développeur Full Stack et étudiant ingénieur en Génie Logiciel à l'ESP Dakar.
            Fondateur de Jolof'Era, plateforme SaaS multi-tenant. Certifié AWS Cloud Practitioner
            et AWS re/Start Graduate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
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

          <motion.div
            className="home-trusted"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="home-trusted-title">Expérience avec</div>
            <div className="home-trusted-logos">
              <div className="home-trusted-logo">MTCorporate</div>
              <div className="home-trusted-logo">Sonatel (Orange)</div>
              <div className="home-trusted-logo">AWS</div>
              <div className="home-trusted-logo">Orange Digital Center</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="home-status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="home-status-dot" />
          <span>Disponible pour opportunités</span>
        </motion.div>

        <motion.div
          className="home-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="home-scroll-text">SCROLL</span>
          <div className="home-scroll-chevron"></div>
        </motion.div>
      </motion.main>
    </>
  )
}

export default Home
