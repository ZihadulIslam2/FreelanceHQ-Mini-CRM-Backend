import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import clientRoutes from './routes/clientRoutes'
import projectRoutes from './routes/projectRoutes'
import interactionLogRoutes from './routes/interactionLogRoutes'
import reminderRoutes from './routes/reminderRoutes'
import dashboardRoutes from './routes/dashboardRoutes'

require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use('/clients', clientRoutes)
app.use('/clients/:clientId/projects', projectRoutes)
app.use('/interaction-logs', interactionLogRoutes)
app.use('/reminders', reminderRoutes)
app.use('/dashboard', dashboardRoutes)

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
