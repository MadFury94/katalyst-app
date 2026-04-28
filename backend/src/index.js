import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'katalyst-backend' })
})

// Routes
app.get('/api/projects', (_req, res) => {
  res.json({ data: [], message: 'Projects endpoint' })
})

app.get('/api/blog', (_req, res) => {
  res.json({ data: [], message: 'Blog endpoint' })
})

app.get('/api/team', (_req, res) => {
  res.json({ data: [], message: 'Team endpoint' })
})

app.listen(PORT, () => {
  console.log(`Katalyst backend running on http://localhost:${PORT}`)
})
