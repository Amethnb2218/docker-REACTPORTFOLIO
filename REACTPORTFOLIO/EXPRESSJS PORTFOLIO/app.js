const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const projectRoutes = require('./src/routes/projectRoutes')
app.use('/api/projects', projectRoutes)

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
