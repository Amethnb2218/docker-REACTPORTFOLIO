const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'))
})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(uploadsDir))

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  res.json({ imageUrl: `/uploads/${req.file.filename}` })
})

const projectRoutes = require('./src/routes/projectRoutes')
const contactRoutes = require('./src/routes/contactRoutes')
app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API Portfolio - Mouhamed Sall' })
})

async function startServer() {
  try {
    const useMemoryDB = process.env.USE_MEMORY_DB === 'true'

    if (useMemoryDB) {
      const { MongoMemoryServer } = require('mongodb-memory-server')
      const mongoServer = await MongoMemoryServer.create()
      const uri = mongoServer.getUri()
      await mongoose.connect(uri)
      console.log('Connected to in-memory MongoDB')
    } else {
      const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio'
      await mongoose.connect(mongoUri)
      console.log('Connected to MongoDB')
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  startServer()
}

module.exports = app
