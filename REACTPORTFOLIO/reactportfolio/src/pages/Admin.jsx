import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function Admin() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' })
  const [editing, setEditing] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const fetchProjects = () => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => {})
  }

  useEffect(() => { fetchProjects() }, [])

  const showMessage = (msg, type = 'success') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 4000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = { ...form, technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean) }
    const url = editing ? `/api/projects/${editing}` : '/api/projects'
    const method = editing ? 'PUT' : 'POST'

    fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then((res) => res.json())
      .then(() => {
        showMessage(editing ? 'Projet modifie avec succes !' : 'Projet ajoute avec succes !')
        setForm({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' })
        setEditing(null)
        fetchProjects()
      })
      .catch(() => showMessage('Une erreur est survenue.', 'error'))
  }

  const handleEdit = (project) => {
    setEditing(project._id)
    setForm({
      title: project.title,
      description: project.description,
      technologies: (project.technologies || []).join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (!confirm('Etes-vous sur de vouloir supprimer ce projet ?')) return
    fetch(`/api/projects/${id}`, { method: 'DELETE' })
      .then(() => {
        showMessage('Projet supprime !')
        fetchProjects()
      })
  }

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
        <h1 style={styles.heading}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}>
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          Administration
        </h1>
        <p style={styles.headerSub}>Gerez vos projets de portfolio</p>
      </div>

      {/* Status Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            ...styles.message,
            background: messageType === 'success' ? 'rgba(0, 212, 170, 0.08)' : 'rgba(255, 80, 80, 0.08)',
            borderColor: messageType === 'success' ? 'rgba(0, 212, 170, 0.2)' : 'rgba(255, 80, 80, 0.2)',
            color: messageType === 'success' ? '#00d4aa' : '#ff5050'
          }}
        >
          {message}
        </motion.div>
      )}

      {/* Form */}
      <div style={styles.formCard}>
        <div style={styles.formHeader}>
          <h2 style={styles.formTitle}>
            {editing ? 'Modifier le projet' : 'Nouveau projet'}
          </h2>
          {editing && (
            <button
              onClick={() => {
                setEditing(null)
                setForm({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' })
              }}
              style={styles.cancelEditBtn}
            >
              Annuler
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Titre *</label>
              <input
                style={styles.input}
                placeholder="Nom du projet"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Technologies</label>
              <input
                style={styles.input}
                placeholder="React, Node.js, Docker..."
                value={form.technologies}
                onChange={(e) => setForm({...form, technologies: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description *</label>
            <textarea
              style={styles.textarea}
              placeholder="Decrivez votre projet..."
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              required
              rows={4}
            />
          </div>

          {/* Image Upload */}
          <div style={styles.imageUrlSection}>
            <div style={styles.imageUrlHeader}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <label style={{ ...styles.label, margin: 0, color: 'var(--accent-secondary)' }}>Image du projet</label>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={styles.uploadBtn}>
                Choisir un fichier
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (!file) return
                    const formData = new FormData()
                    formData.append('image', file)
                    fetch('/api/upload', { method: 'POST', body: formData })
                      .then(res => res.json())
                      .then(data => setForm({...form, imageUrl: data.imageUrl}))
                      .catch(() => showMessage('Erreur upload image', 'error'))
                  }}
                />
              </label>
              <span style={{ color: '#8892b0', fontSize: '0.85rem' }}>ou</span>
              <input
                style={{ ...styles.imageUrlInput, flex: 1 }}
                placeholder="Coller une URL d'image"
                value={form.imageUrl}
                onChange={(e) => setForm({...form, imageUrl: e.target.value})}
              />
            </div>
            {form.imageUrl && (
              <div style={styles.imagePreview}>
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  style={styles.previewImg}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
            )}
            <p style={styles.imageUrlHint}>Selectionnez une image depuis votre appareil ou collez une URL</p>
          </div>

          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>URL GitHub</label>
              <input
                style={styles.input}
                placeholder="https://github.com/..."
                value={form.githubUrl}
                onChange={(e) => setForm({...form, githubUrl: e.target.value})}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>URL Live</label>
              <input
                style={styles.input}
                placeholder="https://monsite.com"
                value={form.liveUrl}
                onChange={(e) => setForm({...form, liveUrl: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" style={styles.submitBtn}>
            {editing ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                <span>Sauvegarder les modifications</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span>Ajouter le projet</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div style={styles.listSection}>
        <h2 style={styles.listTitle}>
          Projets existants
          <span style={styles.listCount}>{projects.length}</span>
        </h2>

        {projects.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>Aucun projet pour le moment. Ajoutez votre premier projet ci-dessus.</p>
          </div>
        )}

        <div style={styles.list}>
          {projects.map((project) => (
            <div key={project._id} style={styles.listItem}>
              <div style={styles.listItemContent}>
                <div style={styles.listItemLeft}>
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt="" style={styles.listItemThumb} />
                  )}
                  <div>
                    <h3 style={styles.listItemTitle}>{project.title}</h3>
                    <p style={styles.listItemDesc}>{project.description.substring(0, 100)}{project.description.length > 100 ? '...' : ''}</p>
                    <div style={styles.listItemTechs}>
                      {project.technologies && project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} style={styles.listItemTech}>{tech}</span>
                      ))}
                      {project.technologies && project.technologies.length > 3 && (
                        <span style={styles.listItemTechMore}>+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div style={styles.listItemActions}>
                  <button onClick={() => handleEdit(project)} style={styles.editBtn}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(project._id)} style={styles.deleteBtn}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '7rem 2rem 4rem',
    maxWidth: '900px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '2rem'
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  headerSub: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem'
  },
  message: {
    textAlign: 'center',
    padding: '0.85rem 1.5rem',
    borderRadius: '10px',
    border: '1px solid',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '20px',
    padding: '2.5rem',
    marginBottom: '3rem'
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  formTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: 'var(--text-primary)'
  },
  cancelEditBtn: {
    padding: '0.5rem 1.2rem',
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  formGrid: {
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
    fontSize: '0.78rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  input: {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: 'var(--text-primary)',
    fontSize: '0.92rem',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: 'var(--font-sans)'
  },
  textarea: {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: 'var(--text-primary)',
    fontSize: '0.92rem',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: 'var(--font-sans)',
    resize: 'vertical',
    minHeight: '100px'
  },
  imageUrlSection: {
    background: 'rgba(0, 212, 170, 0.03)',
    border: '1px solid rgba(0, 212, 170, 0.12)',
    borderRadius: '14px',
    padding: '1.5rem'
  },
  imageUrlHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginBottom: '0.75rem'
  },
  imageUrlInput: {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '10px',
    border: '1px solid rgba(0, 212, 170, 0.2)',
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
    color: 'var(--text-primary)',
    fontSize: '0.92rem',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: 'var(--font-sans)'
  },
  imagePreview: {
    marginTop: '1rem',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.06)'
  },
  previewImg: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    display: 'block'
  },
  imageUrlHint: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    marginTop: '0.6rem'
  },
  uploadBtn: {
    display: 'inline-block',
    padding: '0.6rem 1.2rem',
    background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.15), rgba(108, 99, 255, 0.15))',
    border: '1px solid rgba(0, 212, 170, 0.3)',
    borderRadius: '8px',
    color: '#00d4aa',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  submitBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    padding: '0.9rem 2rem',
    background: 'linear-gradient(135deg, #6c63ff, #5a52e0)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.92rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(108, 99, 255, 0.25)',
    marginTop: '0.5rem',
    alignSelf: 'flex-start'
  },
  listSection: {
    marginTop: '1rem'
  },
  listTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  listCount: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '28px',
    height: '28px',
    borderRadius: '8px',
    background: 'rgba(108, 99, 255, 0.1)',
    color: 'var(--accent-primary)',
    fontSize: '0.82rem',
    fontWeight: '700',
    padding: '0 8px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 2rem',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px dashed rgba(255, 255, 255, 0.1)',
    borderRadius: '14px'
  },
  emptyText: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  listItem: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '14px',
    padding: '1.5rem',
    transition: 'all 0.3s ease'
  },
  listItemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1.5rem'
  },
  listItemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
    minWidth: 0
  },
  listItemThumb: {
    width: '50px',
    height: '50px',
    borderRadius: '10px',
    objectFit: 'cover',
    flexShrink: 0,
    border: '1px solid rgba(255, 255, 255, 0.06)'
  },
  listItemTitle: {
    color: 'var(--text-primary)',
    fontSize: '1.05rem',
    fontWeight: '600',
    marginBottom: '0.3rem'
  },
  listItemDesc: {
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
    marginBottom: '0.5rem',
    lineHeight: '1.4'
  },
  listItemTechs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem'
  },
  listItemTech: {
    fontSize: '0.7rem',
    fontWeight: '500',
    color: 'var(--accent-secondary)',
    backgroundColor: 'rgba(0, 212, 170, 0.08)',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontFamily: 'var(--font-mono)'
  },
  listItemTechMore: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    padding: '0.2rem 0.5rem'
  },
  listItemActions: {
    display: 'flex',
    gap: '0.5rem',
    flexShrink: 0
  },
  editBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.5rem 1rem',
    background: 'rgba(108, 99, 255, 0.08)',
    border: '1px solid rgba(108, 99, 255, 0.2)',
    borderRadius: '8px',
    color: 'var(--accent-primary)',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  deleteBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.5rem 1rem',
    background: 'rgba(255, 80, 80, 0.08)',
    border: '1px solid rgba(255, 80, 80, 0.2)',
    borderRadius: '8px',
    color: '#ff5050',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
}

export default Admin
