import { motion } from 'framer-motion'
import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mailto fallback
    const mailtoLink = `mailto:amethsl2218@gmail.com?subject=${encodeURIComponent(form.subject || 'Contact Portfolio')}&body=${encodeURIComponent(`Nom: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.open(mailtoLink)
    setStatus('Message prepare ! Votre client email s\'est ouvert.')
    setTimeout(() => setStatus(''), 5000)
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
      label: 'Telephone',
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
      value: 'Dakar, Senegal',
      href: null
    }
  ]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.main}
    >
      {/* Header */}
      <div style={styles.header}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={styles.headerLabel}
        >
          Contact
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={styles.heading}
        >
          Travaillons ensemble
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={styles.subtitle}
        >
          Vous avez un projet en tete ou une opportunite a proposer ?
          N'hesitez pas a me contacter.
        </motion.p>
      </div>

      <div style={styles.grid}>
        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          style={styles.infoSection}
        >
          <div style={styles.infoCards}>
            {contactInfo.map((info, index) => (
              <div key={index} style={styles.infoCard}>
                <div style={styles.infoIcon}>{info.icon}</div>
                <div>
                  <span style={styles.infoLabel}>{info.label}</span>
                  {info.href ? (
                    <a href={info.href} style={styles.infoValue}>{info.value}</a>
                  ) : (
                    <span style={styles.infoValueStatic}>{info.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div style={styles.socialSection}>
            <h4 style={styles.socialTitle}>Retrouvez-moi sur</h4>
            <div style={styles.socials}>
              <a href="https://github.com/Amethnb2218" target="_blank" rel="noreferrer" style={styles.socialLink} title="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/mouhamed-sall" target="_blank" rel="noreferrer" style={styles.socialLink} title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          style={styles.formCard}
        >
          {status && <p style={styles.statusMsg}>{status}</p>}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nom complet</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Sujet</label>
              <input
                type="text"
                placeholder="De quoi souhaitez-vous discuter ?"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                placeholder="Votre message..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={styles.textarea}
                rows={5}
                required
              />
            </div>
            <button type="submit" style={styles.submitBtn}>
              <span>Envoyer le message</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </motion.div>
      </div>
    </motion.main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '8rem 2rem 4rem',
    maxWidth: '1100px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '3.5rem'
  },
  headerLabel: {
    display: 'inline-block',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--accent-primary)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '1rem'
  },
  heading: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '1rem',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '1.05rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.8',
    maxWidth: '500px',
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr',
    gap: '2rem',
    alignItems: 'start'
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  infoCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  infoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '14px',
    padding: '1.25rem 1.5rem',
    transition: 'all 0.3s ease'
  },
  infoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'rgba(108, 99, 255, 0.1)',
    color: 'var(--accent-primary)',
    flexShrink: 0
  },
  infoLabel: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--text-muted)',
    marginBottom: '0.2rem'
  },
  infoValue: {
    fontSize: '0.92rem',
    color: 'var(--text-primary)',
    fontWeight: '500',
    textDecoration: 'none',
    display: 'block'
  },
  infoValueStatic: {
    fontSize: '0.92rem',
    color: 'var(--text-primary)',
    fontWeight: '500',
    display: 'block'
  },
  socialSection: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '14px',
    padding: '1.5rem'
  },
  socialTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    marginBottom: '1rem'
  },
  socials: {
    display: 'flex',
    gap: '0.75rem'
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: 'var(--text-secondary)',
    transition: 'all 0.3s ease'
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '20px',
    padding: '2.5rem'
  },
  statusMsg: {
    textAlign: 'center',
    color: 'var(--accent-secondary)',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    padding: '0.75rem',
    background: 'rgba(0, 212, 170, 0.08)',
    borderRadius: '8px',
    border: '1px solid rgba(0, 212, 170, 0.15)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  input: {
    padding: '0.85rem 1.1rem',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'var(--font-sans)',
    width: '100%',
    boxSizing: 'border-box'
  },
  textarea: {
    padding: '0.85rem 1.1rem',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'var(--font-sans)',
    resize: 'vertical',
    minHeight: '120px',
    width: '100%',
    boxSizing: 'border-box'
  },
  submitBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #6c63ff, #5a52e0)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(108, 99, 255, 0.3)',
    marginTop: '0.5rem'
  }
}

// Simple responsive override
if (typeof window !== 'undefined' && window.innerWidth <= 768) {
  styles.grid.gridTemplateColumns = '1fr'
  styles.formRow.gridTemplateColumns = '1fr'
}

export default Contact
