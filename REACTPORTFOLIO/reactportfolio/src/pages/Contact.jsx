import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5])

  const springConfig = { damping: 20, stiffness: 150 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const API_URL = import.meta.env.VITE_API_URL || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      })
      if (res.ok) {
        setStatus('Message envoyé avec succès !')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus("Erreur lors de l'envoi. Réessayez.")
      }
    } catch {
      setStatus("Erreur réseau. Réessayez plus tard.")
    }
    setLoading(false)
    setTimeout(() => setStatus(''), 5000)
  }

  return (
    <>
      <style>{`
        .contact-page {
          min-height: 100vh;
          padding: 120px 2rem 80px;
          max-width: 800px;
          margin: 0 auto;
        }
        .contact-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(4rem, 10vw, 6rem);
          font-weight: 700;
          color: #00362e;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 2rem;
          text-shadow:
            1px 1px 0 rgba(0,54,46,0.1),
            2px 2px 0 rgba(0,54,46,0.08),
            3px 3px 0 rgba(0,54,46,0.06),
            4px 4px 0 rgba(0,54,46,0.04),
            5px 5px 0 rgba(0,54,46,0.02);
        }
        .contact-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.3rem;
          color: #3a5450;
          margin-bottom: 1.5rem;
        }
        .contact-response-time {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: #e8a020;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 3rem;
        }
        .contact-response-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e8a020;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
        }
        .contact-info {
          margin-bottom: 4rem;
        }
        .contact-info-item {
          font-family: 'Inter', sans-serif;
          font-size: 1.2rem;
          line-height: 2;
        }
        .contact-info-item a {
          color: #e8a020;
          text-decoration: none;
          border-bottom: 2px solid #e8a020;
          font-weight: 600;
          font-size: 1.3rem;
          transition: all 0.3s ease;
          padding-bottom: 2px;
        }
        .contact-info-item a:hover {
          color: #e09b1a;
          border-bottom-color: #e09b1a;
          letter-spacing: 0.02em;
        }
        .contact-social-links {
          display: flex;
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .contact-social-link {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #3a5450;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          padding: 0.5rem 1rem;
          border-radius: 100px;
        }
        .contact-social-link:hover {
          color: #e8a020;
          gap: 0.75rem;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(232, 160, 32, 0.15);
          background: rgba(232, 160, 32, 0.05);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 54, 46, 0.1);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }
        .contact-form::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #e8a020, #9dd8d8, transparent);
          background-size: 200% 100%;
          animation: borderGradient 3s linear infinite;
        }
        @keyframes borderGradient {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .contact-input,
        .contact-textarea {
          width: 100%;
          padding: 1rem 0;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #00362e;
          outline: none;
          transition: border-color 0.3s ease;
          position: relative;
        }
        .contact-input::placeholder,
        .contact-textarea::placeholder {
          color: #8a8a8a;
        }
        .contact-input:focus,
        .contact-textarea:focus {
          border-bottom-color: #e8a020;
          animation: inputFocusBeam 0.6s ease-out;
        }
        @keyframes inputFocusBeam {
          0% {
            box-shadow: -100px 0 0 0 rgba(232, 160, 32, 0.3);
          }
          100% {
            box-shadow: 100px 0 0 0 rgba(232, 160, 32, 0);
          }
        }
        .contact-textarea {
          min-height: 120px;
          resize: vertical;
          font-family: 'Inter', sans-serif;
        }
        .contact-submit {
          align-self: flex-start;
          padding: 1rem 3rem;
          background: #e8a020;
          color: #e8efec;
          border: none;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .contact-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }
        .contact-submit:hover::before {
          left: 100%;
        }
        .contact-submit:hover {
          background: #e09b1a;
          transform: translateY(-4px) translateZ(10px) scale(1.02);
          box-shadow: 0 16px 40px rgba(232, 160, 32, 0.4);
        }
        .contact-submit:active {
          transform: translateY(0) scale(0.98);
        }
        .contact-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .contact-status {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #e8a020;
          margin-top: 1rem;
        }
        @media (max-width: 768px) {
          .contact-page {
            padding: 120px 1.5rem 80px;
          }
          .contact-title {
            font-size: clamp(2.5rem, 10vw, 4rem);
            margin-bottom: 1.5rem;
          }
          .contact-subtitle {
            font-size: 1.1rem;
            margin-bottom: 1.25rem;
          }
          .contact-response-time {
            font-size: 0.8rem;
            margin-bottom: 2.5rem;
          }
          .contact-info {
            margin-bottom: 3rem;
          }
          .contact-info-item {
            font-size: 1.1rem;
            line-height: 1.8;
          }
          .contact-info-item a {
            font-size: 1.15rem;
          }
          .contact-social-links {
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 3rem;
            align-items: flex-start;
          }
          .contact-social-link {
            width: 100%;
            padding: 0.75rem 1rem;
          }
          .contact-form {
            padding: 2rem 1.5rem;
            gap: 1.75rem;
          }
          .contact-input,
          .contact-textarea {
            padding: 0.9rem 0;
            font-size: 0.95rem;
            min-height: 48px;
          }
          .contact-textarea {
            min-height: 120px;
          }
          .contact-submit {
            width: 100%;
            justify-content: center;
            align-self: stretch;
            padding: 1rem 2rem;
            font-size: 0.95rem;
            min-height: 52px;
          }
          .contact-status {
            font-size: 0.9rem;
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .contact-page {
            padding: 100px 1rem 60px;
          }
          .contact-title {
            font-size: clamp(2rem, 12vw, 3rem);
          }
          .contact-subtitle {
            font-size: 1rem;
          }
          .contact-info-item {
            font-size: 1rem;
          }
          .contact-info-item a {
            font-size: 1.05rem;
          }
          .contact-form {
            padding: 1.5rem 1rem;
          }
          .contact-input,
          .contact-textarea {
            font-size: 0.9rem;
          }
          .contact-submit {
            padding: 0.95rem 1.5rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
      <motion.main
        className="contact-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1
          className="contact-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Discutons de votre prochain projet
        </motion.h1>

        <motion.p
          className="contact-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Que vous ayez une idée précise ou juste une question, je suis là pour vous aider.
        </motion.p>

        <motion.div
          className="contact-response-time"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact-response-dot"></div>
          Réponse sous 24h
        </motion.div>

        <motion.div
          className="contact-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact-info-item">
            <a href="mailto:amethsl2218@gmail.com">amethsl2218@gmail.com</a>
          </div>
          <div className="contact-info-item">
            <a href="tel:+221776762784">+221 77 676 27 84</a>
          </div>
          <div className="contact-info-item" style={{ color: '#8a8a8a' }}>
            Dakar, Sénégal
          </div>
        </motion.div>

        <motion.div
          className="contact-social-links"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="https://github.com/Amethnb2218"
            target="_blank"
            rel="noreferrer"
            className="contact-social-link"
          >
            GitHub
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4L4 12M12 4v6M12 4H6" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/mouhamed-sall-b35637293/"
            target="_blank"
            rel="noreferrer"
            className="contact-social-link"
          >
            LinkedIn
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4L4 12M12 4v6M12 4H6" />
            </svg>
          </a>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: rotateXSpring,
            rotateY: rotateYSpring,
            transformStyle: 'preserve-3d',
            perspective: 1000
          }}
        >
          <input
            type="text"
            placeholder="Nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="contact-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="contact-input"
            required
          />
          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="contact-textarea"
            required
          />
          <button type="submit" className="contact-submit" disabled={loading}>
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
          {status && <div className="contact-status">{status}</div>}
        </motion.form>
      </motion.main>
    </>
  )
}

export default Contact
