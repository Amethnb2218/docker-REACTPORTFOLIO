import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Scene3D from './components/Scene3D.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  const location = useLocation()

  return (
    <>
      <style>{`
        .animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }
        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 20s ease-in-out infinite;
        }
        .gradient-blob-1 {
          top: 10%;
          right: 10%;
          width: 500px;
          height: 500px;
          background: rgba(250, 174, 43, 0.05);
          animation-delay: 0s;
        }
        .gradient-blob-2 {
          bottom: 20%;
          left: 10%;
          width: 600px;
          height: 600px;
          background: rgba(186, 232, 232, 0.08);
          animation-delay: -7s;
        }
        .gradient-blob-3 {
          top: 50%;
          left: 50%;
          width: 400px;
          height: 400px;
          background: rgba(250, 174, 43, 0.03);
          animation-delay: -14s;
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-50px, 50px) scale(0.9);
          }
        }
      `}</style>

      <div className="animated-background">
        <div className="gradient-blob gradient-blob-1" />
        <div className="gradient-blob gradient-blob-2" />
        <div className="gradient-blob gradient-blob-3" />
      </div>

      <Scene3D />
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
    </>
  )
}

export default App
