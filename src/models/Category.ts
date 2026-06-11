import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ICategory extends Document {
  name: string
  slug: string
  icon?: string
  subcategories: {
    title: string
    productCount: number
  }[]
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String },
    subcategories: [
      {
        title: { type: String, required: true },
        productCount: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
)

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)

export default Category
