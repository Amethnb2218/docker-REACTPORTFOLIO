import { motion } from 'framer-motion'
import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const mailtoLink = `mailto:amethsl2218@gmail.com?subject=${encodeURIComponent('Contact Portfolio - ' + form.name)}&body=${encodeURIComponent(`Nom: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
      window.open(mailtoLink)
      setStatus('Message préparé')
      setLoading(false)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    }, 600)
  }

  return (
    <>
      <style>{`
        .contact-page {
          min-height: 100vh;
          padding: 200px 2rem 150px;
          max-width: 800px;
          margin: 0 auto;
        }
        .contact-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(4rem, 10vw, 6rem);
          font-weight: 700;
          color: #00473e;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 2rem;
        }
        .contact-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.3rem;
          color: #475d5b;
          margin-bottom: 4rem;
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
          color: #faae2b;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s ease;
        }
        .contact-info-item a:hover {
          border-bottom-color: #faae2b;
        }
        .contact-social-links {
          display: flex;
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .contact-social-link {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #475d5b;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }
        .contact-social-link:hover {
          color: #faae2b;
          gap: 0.75rem;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
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
          color: #00473e;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .contact-input::placeholder,
        .contact-textarea::placeholder {
          color: #8a8a8a;
        }
        .contact-input:focus,
        .contact-textarea:focus {
          border-bottom-color: #faae2b;
        }
        .contact-textarea {
          min-height: 120px;
          resize: vertical;
          font-family: 'Inter', sans-serif;
        }
        .contact-submit {
          align-self: flex-start;
          padding: 1rem 3rem;
          background: #faae2b;
          color: #f2f7f5;
          border: none;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .contact-submit:hover {
          background: #e09b1a;
          transform: translateY(-2px);
        }
        .contact-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .contact-status {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #faae2b;
          margin-top: 1rem;
        }
        @media (max-width: 768px) {
          .contact-page {
            padding: 160px 1.5rem 100px;
          }
        }
      `}</style>
      <motion.main
        className="contact-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          className="contact-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Contact
        </motion.h1>

        <motion.p
          className="contact-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Un projet en tête ? Écrivez-moi.
        </motion.p>

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
