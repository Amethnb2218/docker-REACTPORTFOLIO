import { motion, useInView } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

function FloatingLabel({ children, isFocused, hasValue }) {
  return (
    <motion.label
      className="floating-label"
      animate={{
        top: isFocused || hasValue ? '-0.5rem' : '0.85rem',
        fontSize: isFocused || hasValue ? '0.7rem' : '0.95rem',
        color: isFocused ? '#c87941' : '#555'
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.label>
  )
}

function ContactInfoCard({ info, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="contact-info-card"
      initial={{ opacity: 0, x: -60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ x: 8, scale: 1.02 }}
    >
      {info.href ? (
        <a href={info.href} className="contact-info-link">
          <motion.div
            className="contact-info-icon"
            animate={{ rotate: isHovered ? 5 : 0, scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {info.icon}
          </motion.div>
          <div className="contact-info-content">
            <span className="contact-info-label">{info.label}</span>
            <span className="contact-info-value">{info.value}</span>
          </div>
        </a>
      ) : (
        <div className="contact-info-link">
          <motion.div
            className="contact-info-icon"
            animate={{ rotate: isHovered ? 5 : 0, scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {info.icon}
          </motion.div>
          <div className="contact-info-content">
            <span className="contact-info-label">{info.label}</span>
            <span className="contact-info-value">{info.value}</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

function SocialButton({ social, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.a
      ref={ref}
      href={social.href}
      target="_blank"
      rel="noreferrer"
      className="social-button"
      initial={{ opacity: 0, scale: 0, rotate: -90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1]
      }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="social-button-icon">{social.svg}</div>
      <div className="social-button-label">{social.title}</div>
    </motion.a>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const formRef = useRef(null)
  const isFormInView = useInView(formRef, { once: true, margin: '-50px' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const mailtoLink = `mailto:amethsl2218@gmail.com?subject=${encodeURIComponent('Contact Portfolio - ' + form.name)}&body=${encodeURIComponent(`Nom: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
      window.open(mailtoLink)
      setStatus('Message préparé ! Votre client email s\'est ouvert.')
      setLoading(false)
      setTimeout(() => setStatus(''), 5000)
    }, 800)
  }

  const contactInfo = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: 'Téléphone',
      value: '+221 77 676 27 84',
      href: 'tel:+221776762784'
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Localisation',
      value: 'Dakar, Sénégal',
      href: null
    }
  ]

  const socials = [
    {
      href: 'https://github.com/Amethnb2218',
      title: 'GitHub',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
        </svg>
      )
    },
    {
      href: 'https://www.linkedin.com/in/mouhamed-sall-b35637293/',
      title: 'LinkedIn',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ]

  return (
    <>
      <style>{`
        .contact-page {
          min-height: 100vh;
          padding: 8rem 2rem 4rem;
          max-width: 1300px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .contact-bg-gradient {
          position: fixed;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200, 121, 65, 0.08), transparent 70%);
          top: -200px;
          right: -300px;
          pointer-events: none;
          z-index: -1;
          opacity: 0.6;
        }
        .contact-hero {
          margin-bottom: 5rem;
        }
        .contact-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 700;
          color: #e8e8e8;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .contact-hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.2rem;
          color: #8a8a8a;
          line-height: 1.7;
          max-width: 600px;
        }
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: start;
        }
        .contact-left {
          position: sticky;
          top: 8rem;
        }
        .contact-statement {
          margin-bottom: 3rem;
        }
        .contact-statement-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          font-style: italic;
          color: #e8e8e8;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }
        .contact-statement-desc {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #8a8a8a;
          line-height: 1.7;
        }
        .contact-info-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 3rem;
        }
        .contact-info-card {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
        }
        .contact-info-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #c87941, #d4956a);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .contact-info-card:hover::before {
          transform: scaleY(1);
          transform-origin: top;
        }
        .contact-info-card:hover {
          border-color: rgba(200, 121, 65, 0.3);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }
        .contact-info-link {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.5rem 1.75rem;
          text-decoration: none;
          color: inherit;
        }
        .contact-info-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(200, 121, 65, 0.1);
          border: 1px solid rgba(200, 121, 65, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c87941;
          flex-shrink: 0;
        }
        .contact-info-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .contact-info-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #555;
        }
        .contact-info-value {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #e8e8e8;
          font-weight: 500;
        }
        .contact-socials-section {
          margin-top: 2rem;
        }
        .contact-socials-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #555;
          margin-bottom: 1rem;
        }
        .contact-socials {
          display: flex;
          gap: 1rem;
        }
        .social-button {
          flex: 1;
          background: linear-gradient(135deg, #141414, #1a1a1a);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }
        .social-button:hover {
          border-color: rgba(200, 121, 65, 0.3);
          background: linear-gradient(135deg, #1a1a1a, #141414);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        .social-button-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(200, 121, 65, 0.1);
          border: 1px solid rgba(200, 121, 65, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c87941;
        }
        .social-button-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #8a8a8a;
          transition: color 0.3s ease;
        }
        .social-button:hover .social-button-label {
          color: #e8e8e8;
        }
        .contact-form-wrapper {
          background: linear-gradient(135deg, #141414, #1a1a1a);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }
        .contact-form-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #c87941, #d4956a, #c87941);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .form-field {
          position: relative;
        }
        .floating-label {
          position: absolute;
          left: 1.1rem;
          pointer-events: none;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          letter-spacing: -0.01em;
          transition: all 0.3s ease;
          z-index: 1;
        }
        .form-input,
        .form-textarea {
          width: 100%;
          padding: 1rem 1.1rem;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
          color: #e8e8e8;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          outline: none;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          box-sizing: border-box;
        }
        .form-input:focus,
        .form-textarea:focus {
          border-color: rgba(200, 121, 65, 0.5);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 0 0 4px rgba(200, 121, 65, 0.08);
        }
        .form-textarea {
          min-height: 150px;
          resize: vertical;
          padding-top: 1rem;
        }
        .char-counter {
          position: absolute;
          bottom: 0.75rem;
          right: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: #555;
          pointer-events: none;
        }
        .submit-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1.1rem 2.5rem;
          background: linear-gradient(135deg, #c87941, #d4956a);
          color: #0c0c0c;
          border: none;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          letter-spacing: -0.01em;
          position: relative;
          overflow: hidden;
        }
        .submit-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #d4956a, #c87941);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .submit-button:hover::before {
          opacity: 1;
        }
        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(200, 121, 65, 0.4);
        }
        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .submit-button-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .status-message {
          text-align: center;
          color: #c87941;
          margin-bottom: 1.5rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 1rem 1.5rem;
          background: rgba(200, 121, 65, 0.08);
          border: 1px solid rgba(200, 121, 65, 0.2);
          border-radius: 12px;
        }
        @media (max-width: 1024px) {
          .contact-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .contact-left {
            position: relative;
            top: 0;
          }
        }
        @media (max-width: 768px) {
          .contact-page {
            padding: 7rem 1.5rem 3rem;
          }
          .contact-form-wrapper {
            padding: 2rem 1.5rem;
          }
          .contact-hero-title {
            font-size: 2.5rem;
          }
          .contact-statement-text {
            font-size: 1.8rem;
          }
          .contact-socials {
            flex-direction: column;
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
        <motion.div
          className="contact-bg-gradient"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        <div className="contact-hero">
          <motion.h1
            className="contact-hero-title"
            initial={{ opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            Travaillons ensemble
          </motion.h1>
          <motion.p
            className="contact-hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Vous avez un projet en tête ou une opportunité à proposer ?
            Je suis disponible pour discuter de vos besoins.
          </motion.p>
        </div>

        <div className="contact-layout">
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="contact-statement">
              <motion.h2
                className="contact-statement-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                Créons quelque chose d'exceptionnel
              </motion.h2>
              <motion.p
                className="contact-statement-desc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Que ce soit pour un projet Full Stack, une infrastructure DevOps
                ou une solution mobile, je suis prêt à transformer vos idées en réalité.
              </motion.p>
            </div>

            <div className="contact-info-section">
              {contactInfo.map((info, index) => (
                <ContactInfoCard key={info.label} info={info} index={index} />
              ))}
            </div>

            <div className="contact-socials-section">
              <motion.h3
                className="contact-socials-title"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Retrouvez-moi sur
              </motion.h3>
              <div className="contact-socials">
                {socials.map((social, index) => (
                  <SocialButton key={social.title} social={social} index={index} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={formRef}
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={isFormInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {status && (
              <motion.div
                className="status-message"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {status}
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <motion.div
                className="form-field"
                initial={{ opacity: 0, x: -30 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <FloatingLabel
                  isFocused={focusedField === 'name'}
                  hasValue={form.name.length > 0}
                >
                  Nom complet
                </FloatingLabel>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="form-input"
                  required
                />
              </motion.div>

              <motion.div
                className="form-field"
                initial={{ opacity: 0, x: -30 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <FloatingLabel
                  isFocused={focusedField === 'email'}
                  hasValue={form.email.length > 0}
                >
                  Adresse email
                </FloatingLabel>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="form-input"
                  required
                />
              </motion.div>

              <motion.div
                className="form-field"
                initial={{ opacity: 0, x: -30 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <FloatingLabel
                  isFocused={focusedField === 'message'}
                  hasValue={form.message.length > 0}
                >
                  Votre message
                </FloatingLabel>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="form-textarea"
                  required
                  maxLength={1000}
                />
                <span className="char-counter">{form.message.length} / 1000</span>
              </motion.div>

              <motion.button
                type="submit"
                className="submit-button"
                disabled={loading}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isFormInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="submit-button-content">
                  {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                  {!loading && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.main>
    </>
  )
}

export default Contact
