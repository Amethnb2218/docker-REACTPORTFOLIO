import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.opacity = Math.random() * 0.5 + 0.1
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`
        ctx.fill()
      }
    }

    for (let i = 0; i < 60; i++) {
      particles.push(new Particle())
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.06 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      drawLines()
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
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
        .home-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .home-grid-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
        }
        .home-glow {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .home-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          animation: orbFloat 8s ease-in-out infinite;
        }
        .home-orb-1 {
          width: 400px;
          height: 400px;
          background: rgba(59, 130, 246, 0.08);
          top: 10%;
          right: 10%;
          animation-delay: 0s;
        }
        .home-orb-2 {
          width: 300px;
          height: 300px;
          background: rgba(139, 92, 246, 0.06);
          bottom: 20%;
          left: 5%;
          animation-delay: -4s;
        }
        .home-orb-3 {
          width: 200px;
          height: 200px;
          background: rgba(16, 185, 129, 0.05);
          top: 50%;
          left: 40%;
          animation-delay: -2s;
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.05); }
          50% { transform: translate(-10px, 15px) scale(0.95); }
          75% { transform: translate(15px, 10px) scale(1.02); }
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
          font-size: 0.75rem;
          font-weight: 500;
          color: #3b82f6;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          padding: 0.5rem 1.25rem;
          border: 1px solid rgba(59, 130, 246, 0.25);
          border-radius: 100px;
          background: rgba(59, 130, 246, 0.06);
          position: relative;
          overflow: hidden;
        }
        .home-label::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          animation: labelShine 3s infinite;
        }
        @keyframes labelShine {
          0% { left: -100%; }
          100% { left: 100%; }
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
          background: linear-gradient(135deg, #ffffff 0%, #3b82f6 50%, #8b5cf6 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 6s ease infinite;
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .home-subtitle {
          font-size: clamp(1.2rem, 3vw, 2rem);
          font-weight: 600;
          color: #d4d4d8;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .home-subtitle .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: #3b82f6;
          margin-left: 4px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
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
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: #ffffff;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
          text-decoration: none;
          letter-spacing: -0.01em;
          position: relative;
          overflow: hidden;
        }
        .home-cta-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        .home-cta-primary:hover::before {
          left: 100%;
        }
        .home-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.15);
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
          position: relative;
        }
        .home-cta-secondary::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 100px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .home-cta-secondary:hover::before {
          opacity: 1;
        }
        .home-cta-secondary:hover {
          border-color: transparent;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
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
          position: relative;
        }
        .home-social-link::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 50%;
          padding: 1px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .home-social-link:hover::before {
          opacity: 1;
        }
        .home-social-link:hover {
          color: #3b82f6;
          border-color: transparent;
          background: rgba(59, 130, 246, 0.08);
          transform: scale(1.15) translateY(-2px);
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.25);
        }
        .home-tech-stack {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .home-tech-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          font-weight: 500;
          padding: 0.35rem 0.85rem;
          border-radius: 6px;
          border: 1px solid rgba(59, 130, 246, 0.15);
          background: rgba(59, 130, 246, 0.04);
          color: #64748b;
          transition: all 0.3s ease;
        }
        .home-tech-badge:hover {
          border-color: rgba(59, 130, 246, 0.4);
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.08);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
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
          color: #52525b;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
        }
        .home-scroll-line {
          width: 1px;
          height: 30px;
          background: linear-gradient(180deg, #3b82f6, transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
        .home-status-bar {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          color: #3f3f46;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 10;
        }
        .home-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: statusPulse 2s ease-in-out infinite;
        }
        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 4px rgba(16, 185, 129, 0); }
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
          .home-status-bar {
            display: none;
          }
          .home-orb-1 { width: 200px; height: 200px; }
          .home-orb-2 { width: 150px; height: 150px; }
          .home-orb-3 { display: none; }
        }
      `}</style>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Particle canvas */}
        <canvas ref={canvasRef} className="home-canvas" />

        {/* Tech grid background */}
        <div className="home-grid-bg" />

        {/* Floating orbs */}
        <div className="home-orb home-orb-1" />
        <div className="home-orb home-orb-2" />
        <div className="home-orb home-orb-3" />

        {/* Cursor-following glow */}
        <div
          className="home-glow"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.06), transparent 60%)`
          }}
        />

        <section className="home-hero">
          {/* Label */}
          <motion.span
            className="home-label"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
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

          {/* Subtitle with typing cursor */}
          <motion.h2
            className="home-subtitle"
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            Software Engineer<span className="typing-cursor" />
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

          {/* Tech Stack Badges */}
          <motion.div
            className="home-tech-stack"
            custom={1.5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            {['React', 'Node.js', 'Docker', 'AWS', 'Kubernetes', 'MongoDB'].map(tech => (
              <span key={tech} className="home-tech-badge">{tech}</span>
            ))}
          </motion.div>

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
            transition={{ delay: 2.5, duration: 1 }}
          >
            <span>scroll</span>
            <div className="home-scroll-line" />
          </motion.div>
        </section>

        {/* Status bar */}
        <motion.div
          className="home-status-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <span className="home-status-dot" />
          <span>available for work</span>
        </motion.div>
      </motion.main>
    </>
  )
}

export default Home
