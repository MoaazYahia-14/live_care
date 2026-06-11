import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IAdmin extends Document {
  username: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      default: 'admin',
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema)

export default Admin
