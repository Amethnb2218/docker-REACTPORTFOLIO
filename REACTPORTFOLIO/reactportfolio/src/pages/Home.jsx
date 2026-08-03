import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Scene3D from '../components/Scene3D'

function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
    })
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
        }
        .home-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          font-weight: 500;
          color: #8a8a8a;
          margin-bottom: 2.5rem;
          letter-spacing: -0.01em;
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
        }
        .home-cta:hover {
          background: #d4956a;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200, 121, 65, 0.3);
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
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
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
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Scene3D />

        <div className="home-content">
          <motion.h1
            className="home-hero-title"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Mouhamed Sall
          </motion.h1>

          <motion.p
            className="home-subtitle"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Full Stack Developer & DevOps Engineer
          </motion.p>

          <motion.p
            className="home-description"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Developpeur Full Stack et etudiant ingenieur en Genie Logiciel a l'ESP Dakar.
            Fondateur de Jolofera, plateforme SaaS multi-tenant. Certifie AWS Cloud Practitioner
            et AWS re/Start Graduate.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Link to="/projects" className="home-cta">
              Voir mes projets
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="home-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="home-status-dot" />
          <span>Disponible pour opportunites</span>
        </motion.div>
      </motion.main>
    </>
  )
}

export default Home
