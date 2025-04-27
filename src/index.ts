import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import clientRoutes from './routes/clientRoutes'
import projectRoutes from './routes/projectRoutes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use('/clients', clientRoutes)
app.use('/clients/:clientId/projects', projectRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
