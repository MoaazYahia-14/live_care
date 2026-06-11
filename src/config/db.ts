import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin'

let isConnected = false; // Track connection status for Vercel Serverless

const connectDB = async () => {
  if (isConnected) {
    console.log('Using cached MongoDB connection')
    return
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!)
    isConnected = !!conn.connections[0].readyState;
    console.log(`MongoDB Connected: ${conn.connection.host}`)

    // Seed default Admin if it doesn't exist
    try {
      const adminCount = await Admin.countDocuments()
      if (adminCount === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10)
        await Admin.create({
          username: 'admin',
          passwordHash: hashedPassword,
        })
        console.log('Default Admin seeded successfully')
      }
    } catch (seedError) {
      console.error('Error seeding admin:', seedError)
    }
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`)
    // In serverless, we shouldn't exit the process. Throw an error instead.
    throw error
  }
}

export default connectDB
