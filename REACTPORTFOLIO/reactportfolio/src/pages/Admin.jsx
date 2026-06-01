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
    <>
      <style>{`
        .admin-page {
          min-height: 100vh;
          padding: 8rem 2rem 4rem;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .admin-header {
          margin-bottom: 2.5rem;
        }
        .admin-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
          margin-bottom: 0.3rem;
        }
        .admin-subtitle {
          color: #71717a;
          font-size: 0.9rem;
        }
        .admin-message {
          text-align: center;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          border: 1px solid;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .admin-message-success {
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        .admin-message-error {
          background: rgba(239, 68, 68, 0.08);
          border-color: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        .admin-form-card {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2.5rem;
        }
        .admin-form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .admin-form-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #f5f5f5;
        }
        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .admin-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .admin-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .admin-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #a1a1aa;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.02em;
        }
        .admin-input {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          color: #f5f5f5;
          font-size: 0.9rem;
          box-sizing: border-box;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }
        .admin-input:focus {
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
        }
        .admin-input::placeholder {
          color: #52525b;
        }
        .admin-textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          color: #f5f5f5;
          font-size: 0.9rem;
          box-sizing: border-box;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          resize: vertical;
          min-height: 100px;
        }
        .admin-textarea:focus {
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
        }
        .admin-textarea::placeholder {
          color: #52525b;
        }
        .admin-image-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          padding: 1.25rem;
        }
        .admin-image-row {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          margin-top: 0.5rem;
        }
        .admin-upload-btn {
          display: inline-block;
          padding: 0.55rem 1rem;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 8px;
          color: #3b82f6;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .admin-upload-btn:hover {
          background: rgba(59, 130, 246, 0.15);
        }
        .admin-image-preview {
          margin-top: 0.75rem;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .admin-image-preview img {
          width: 100%;
          max-height: 180px;
          object-fit: cover;
          display: block;
        }
        .admin-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem 1.75rem;
          background: #3b82f6;
          color: #ffffff;
          border: none;
          border-radius: 100px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }
        .admin-submit-btn:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }
        .admin-cancel-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #a1a1aa;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }
        .admin-cancel-btn:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.15);
        }
        .admin-list-section {
          margin-top: 0.5rem;
        }
        .admin-list-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #f5f5f5;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .admin-list-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 24px;
          border-radius: 6px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0 6px;
          font-family: 'JetBrains Mono', monospace;
        }
        .admin-empty {
          text-align: center;
          padding: 2.5rem 2rem;
          background: #141414;
          border: 1px dashed rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: #71717a;
          font-size: 0.9rem;
        }
        .admin-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .admin-list-item {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          transition: all 0.2s ease;
        }
        .admin-list-item:hover {
          border-color: rgba(255, 255, 255, 0.1);
        }
        .admin-list-item-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.25rem;
        }
        .admin-list-item-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }
        .admin-list-item-thumb {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .admin-list-item-title {
          color: #f5f5f5;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .admin-list-item-desc {
          color: #71717a;
          font-size: 0.78rem;
          margin-bottom: 0.4rem;
          line-height: 1.4;
        }
        .admin-list-item-techs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }
        .admin-list-item-tech {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          font-weight: 500;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          border: 1px solid rgba(16, 185, 129, 0.15);
        }
        .admin-list-item-tech-more {
          font-size: 0.65rem;
          color: #71717a;
          padding: 0.15rem 0.4rem;
        }
        .admin-list-item-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        .admin-edit-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 6px;
          color: #3b82f6;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }
        .admin-edit-btn:hover {
          background: rgba(59, 130, 246, 0.12);
        }
        .admin-delete-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 6px;
          color: #ef4444;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }
        .admin-delete-btn:hover {
          background: rgba(239, 68, 68, 0.12);
        }
        @media (max-width: 768px) {
          .admin-form-grid {
            grid-template-columns: 1fr;
          }
          .admin-list-item-content {
            flex-direction: column;
            align-items: flex-start;
          }
          .admin-list-item-actions {
            margin-top: 0.75rem;
          }
          .admin-page {
            padding: 7rem 1.5rem 3rem;
          }
        }
      `}</style>
      <motion.main
        className="admin-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="admin-header">
          <h1 className="admin-title">Administration</h1>
          <p className="admin-subtitle">Gerez vos projets de portfolio</p>
        </div>

        {/* Status Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`admin-message ${messageType === 'success' ? 'admin-message-success' : 'admin-message-error'}`}
          >
            {message}
          </motion.div>
        )}

        {/* Form */}
        <div className="admin-form-card">
          <div className="admin-form-header">
            <h2 className="admin-form-title">
              {editing ? 'Modifier le projet' : 'Nouveau projet'}
            </h2>
            {editing && (
              <button onClick={() => {
                setEditing(null)
                setForm({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' })
              }} className="admin-cancel-btn">
                Annuler
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-label">Titre *</label>
                <input
                  className="admin-input"
                  placeholder="Nom du projet"
                  value={form.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Technologies</label>
                <input
                  className="admin-input"
                  placeholder="React, Node.js, Docker..."
                  value={form.technologies}
                  onChange={(e) => setForm({...form, technologies: e.target.value})}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Description *</label>
              <textarea
                className="admin-textarea"
                placeholder="Decrivez votre projet..."
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                required
                rows={4}
              />
            </div>

            {/* Image Upload */}
            <div className="admin-image-section">
              <label className="admin-label">Image du projet</label>
              <div className="admin-image-row">
                <label className="admin-upload-btn">
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
                <span style={{ color: '#52525b', fontSize: '0.78rem' }}>ou</span>
                <input
                  className="admin-input"
                  style={{ flex: 1 }}
                  placeholder="Coller une URL d'image"
                  value={form.imageUrl}
                  onChange={(e) => setForm({...form, imageUrl: e.target.value})}
                />
              </div>
              {form.imageUrl && (
                <div className="admin-image-preview">
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              )}
            </div>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-label">URL GitHub</label>
                <input
                  className="admin-input"
                  placeholder="https://github.com/..."
                  value={form.githubUrl}
                  onChange={(e) => setForm({...form, githubUrl: e.target.value})}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">URL Live</label>
                <input
                  className="admin-input"
                  placeholder="https://monsite.com"
                  value={form.liveUrl}
                  onChange={(e) => setForm({...form, liveUrl: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="admin-submit-btn">
              {editing ? 'Sauvegarder les modifications' : 'Ajouter le projet'}
            </button>
          </form>
        </div>

        {/* Projects List */}
        <div className="admin-list-section">
          <h2 className="admin-list-title">
            Projets existants
            <span className="admin-list-count">{projects.length}</span>
          </h2>

          {projects.length === 0 && (
            <div className="admin-empty">
              Aucun projet pour le moment. Ajoutez votre premier projet ci-dessus.
            </div>
          )}

          <div className="admin-list">
            {projects.map((project) => (
              <div key={project._id} className="admin-list-item">
                <div className="admin-list-item-content">
                  <div className="admin-list-item-left">
                    {project.imageUrl && (
                      <img src={project.imageUrl} alt="" className="admin-list-item-thumb" />
                    )}
                    <div>
                      <h3 className="admin-list-item-title">{project.title}</h3>
                      <p className="admin-list-item-desc">
                        {project.description.substring(0, 100)}{project.description.length > 100 ? '...' : ''}
                      </p>
                      <div className="admin-list-item-techs">
                        {project.technologies && project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="admin-list-item-tech">{tech}</span>
                        ))}
                        {project.technologies && project.technologies.length > 3 && (
                          <span className="admin-list-item-tech-more">+{project.technologies.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="admin-list-item-actions">
                    <button onClick={() => handleEdit(project)} className="admin-edit-btn">
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(project._id)} className="admin-delete-btn">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.main>
    </>
  )
}

export default Admin
