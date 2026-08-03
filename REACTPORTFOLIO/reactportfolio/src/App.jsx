import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <>
        <style>{`
          body {
            perspective: 1200px;
          }
          .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #e8efec;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
          .loading-text {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 700;
            color: #00362e;
            letter-spacing: -0.02em;
          }
          .loading-dot {
            display: inline-block;
            animation: loadingBounce 1.4s infinite;
          }
          .loading-dot:nth-child(2) {
            animation-delay: 0.2s;
          }
          .loading-dot:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes loadingBounce {
            0%, 60%, 100% {
              transform: translateY(0);
            }
            30% {
              transform: translateY(-10px);
            }
          }
        `}</style>
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-text">
            MS<span className="loading-dot">.</span><span className="loading-dot">.</span><span className="loading-dot">.</span>
          </div>
        </motion.div>
      </>
    )
  }

  return (
    <>
      <style>{`
        body {
          perspective: 1200px;
        }
        .animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
          transform: translateZ(-50px);
        }
        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          animation: float 20s ease-in-out infinite;
        }
        .gradient-blob-1 {
          top: 10%;
          right: 10%;
          width: 700px;
          height: 700px;
          background: rgba(250, 174, 43, 0.08);
          animation-delay: 0s;
        }
        .gradient-blob-2 {
          bottom: 20%;
          left: 10%;
          width: 800px;
          height: 800px;
          background: rgba(186, 232, 232, 0.12);
          animation-delay: -7s;
        }
        .gradient-blob-3 {
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          background: rgba(250, 174, 43, 0.05);
          animation-delay: -14s;
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1) translateZ(-50px);
          }
          33% {
            transform: translate(80px, -80px) scale(1.15) translateZ(-50px);
          }
          66% {
            transform: translate(-80px, 80px) scale(0.85) translateZ(-50px);
          }
        }
      `}</style>

      <div className="animated-background">
        <div className="gradient-blob gradient-blob-1" />
        <div className="gradient-blob gradient-blob-2" />
        <div className="gradient-blob gradient-blob-3" />
      </div>

      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default App
