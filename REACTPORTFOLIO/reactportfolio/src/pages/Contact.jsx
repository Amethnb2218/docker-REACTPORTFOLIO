import { motion } from 'framer-motion'
import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:amethsl2218@gmail.com?subject=${encodeURIComponent('Contact Portfolio - ' + form.name)}&body=${encodeURIComponent(`Nom: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.open(mailtoLink)
    setStatus('Message préparé ! Votre client email s\'est ouvert.')
    setTimeout(() => setStatus(''), 5000)
  }

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
      label: 'Email',
      value: 'amethsl2218@gmail.com',
      href: 'mailto:amethsl2218@gmail.com'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: 'Téléphone',
      value: '+221 77 676 27 84',
      href: 'tel:+221776762784'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Localisation',
      value: 'Dakar, Sénégal',
      href: null
    }
  ]

  return (
    <>
      <style>{`
        .contact-page {
          min-height: 100vh;
          padding: 8rem 2rem 4rem;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .contact-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #e8e8e8;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }
        .contact-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          color: #8a8a8a;
          line-height: 1.7;
          max-width: 500px;
          margin: 0 auto;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 2rem;
          align-items: start;
        }
        .contact-info-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .contact-info-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .contact-info-card:hover {
          border-color: rgba(200, 121, 65, 0.3);
          transform: translateX(4px);
        }
        .contact-info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(200, 121, 65, 0.08);
          border: 1px solid rgba(200, 121, 65, 0.15);
          color: #c87941;
          flex-shrink: 0;
        }
        .contact-info-label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #555;
          margin-bottom: 0.15rem;
        }
        .contact-info-value {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #e8e8e8;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        a.contact-info-value:hover {
          color: #c87941;
        }
        .contact-social-section {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin-top: 0.5rem;
        }
        .contact-social-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          color: #555;
          margin-bottom: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .contact-socials {
          display: flex;
          gap: 0.75rem;
        }
        .contact-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: #8a8a8a;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .contact-social-link:hover {
          color: #c87941;
          border-color: rgba(200, 121, 65, 0.3);
          background: rgba(200, 121, 65, 0.05);
          transform: scale(1.05);
        }
        .contact-form-card {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 2rem;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .contact-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .contact-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: #8a8a8a;
          letter-spacing: 0.02em;
        }
        .contact-input {
          padding: 0.85rem 1.1rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
          color: #e8e8e8;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .contact-input:focus {
          border-color: rgba(200, 121, 65, 0.5);
          box-shadow: 0 0 0 3px rgba(200, 121, 65, 0.08);
          background: rgba(255, 255, 255, 0.03);
        }
        .contact-input::placeholder {
          color: #555;
        }
        .contact-textarea {
          padding: 0.85rem 1.1rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
          color: #e8e8e8;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
          resize: vertical;
          min-height: 130px;
          width: 100%;
          box-sizing: border-box;
        }
        .contact-textarea:focus {
          border-color: rgba(200, 121, 65, 0.5);
          box-shadow: 0 0 0 3px rgba(200, 121, 65, 0.08);
          background: rgba(255, 255, 255, 0.03);
        }
        .contact-textarea::placeholder {
          color: #555;
        }
        .contact-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.9rem 2rem;
          background: #c87941;
          color: #0c0c0c;
          border: none;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .contact-submit-btn:hover {
          background: #d4956a;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200, 121, 65, 0.3);
        }
        .contact-status {
          text-align: center;
          color: #c87941;
          margin-bottom: 1rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0.75rem;
          background: rgba(200, 121, 65, 0.08);
          border: 1px solid rgba(200, 121, 65, 0.15);
          border-radius: 8px;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .contact-page {
            padding: 7rem 1.5rem 3rem;
          }
        }
      `}</style>
      <motion.main
        className="contact-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="contact-header">
          <motion.h1
            className="contact-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact
          </motion.h1>
          <motion.p
            className="contact-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Vous avez un projet en tete ou une opportunite a proposer ?
            N'hesitez pas a me contacter.
          </motion.p>
        </div>

        <div className="contact-grid">
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-info-icon">{info.icon}</div>
                <div>
                  <span className="contact-info-label">{info.label}</span>
                  {info.href ? (
                    <a href={info.href} className="contact-info-value">{info.value}</a>
                  ) : (
                    <span className="contact-info-value">{info.value}</span>
                  )}
                </div>
              </div>
            ))}

            <div className="contact-social-section">
              <h4 className="contact-social-title">Retrouvez-moi sur</h4>
              <div className="contact-socials">
                <a href="https://github.com/Amethnb2218" target="_blank" rel="noreferrer" className="contact-social-link" title="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/mouhamed-sall-b35637293/" target="_blank" rel="noreferrer" className="contact-social-link" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {status && <div className="contact-status">{status}</div>}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-group">
                <label className="contact-label">Nom complet</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="contact-input"
                  required
                />
              </div>
              <div className="contact-form-group">
                <label className="contact-label">Email</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="contact-input"
                  required
                />
              </div>
              <div className="contact-form-group">
                <label className="contact-label">Message</label>
                <textarea
                  placeholder="Votre message..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="contact-textarea"
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className="contact-submit-btn">
                Envoyer le message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </motion.main>
    </>
  )
}

export default Contact
