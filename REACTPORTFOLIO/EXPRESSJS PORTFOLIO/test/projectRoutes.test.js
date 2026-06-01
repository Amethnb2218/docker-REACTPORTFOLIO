const { describe, it, before, after } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

before(async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio-test'
  await mongoose.connect(uri)
})

after(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
})

describe('GET /api/projects', () => {
  it('should return an array of projects', async () => {
    const res = await request(app).get('/api/projects')
    assert.strictEqual(res.status, 200)
    assert(Array.isArray(res.body))
  })
})

describe('POST /api/projects', () => {
  it('should create a new project', async () => {
    const project = {
      title: 'Test Project',
      description: 'A test project',
      technologies: ['Node.js', 'Express']
    }
    const res = await request(app).post('/api/projects').send(project)
    assert.strictEqual(res.status, 201)
    assert.strictEqual(res.body.title, 'Test Project')
  })

  it('should fail without required fields', async () => {
    const res = await request(app).post('/api/projects').send({})
    assert.strictEqual(res.status, 400)
  })
})

describe('GET /api/projects/:id', () => {
  it('should return 404 for invalid id', async () => {
    const fakeId = new mongoose.Types.ObjectId()
    const res = await request(app).get(`/api/projects/${fakeId}`)
    assert.strictEqual(res.status, 404)
  })
})

describe('DELETE /api/projects/:id', () => {
  it('should delete a project', async () => {
    const project = {
      title: 'To Delete',
      description: 'Will be deleted',
      technologies: ['Test']
    }
    const created = await request(app).post('/api/projects').send(project)
    const res = await request(app).delete(`/api/projects/${created.body._id}`)
    assert.strictEqual(res.status, 200)
    assert.strictEqual(res.body.message, 'Project deleted')
  })
})
