import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!)
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
    process.exit(1)
  }
}

export default connectDB
