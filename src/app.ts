import dotenv from 'dotenv'
// Load env vars before importing anything else
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './config/db'
import authRoutes from './routes/authRoutes'
import productRoutes from './routes/productRoutes'
import categoryRoutes from './routes/categoryRoutes'
import settingsRoutes from './routes/settingsRoutes'
import uploadRoutes from './routes/uploadRoutes'
import statRoutes from './routes/statRoutes'
import path from 'path'

// Connect to database
// NOTE: For Vercel Serverless, we use a cached connection in db.ts
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/stats', statRoutes)

// Health Check
app.get('/', (req, res) => {
  res.send('LiveCare Backend API is running...')
})

// Export the express app without starting the server
export default app
