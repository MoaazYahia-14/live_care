import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IProduct extends Document {
  title: string
  sku: string
  description: string
  category: string
  subCategory?: string
  price: number
  oldPrice?: number
  features: { title: string; description: string }[]
  images: string[]
  pdfFile?: string
  isActive: boolean
  isPopular: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // 'أجهزة طبية' or 'مستحضرات تجميل'
    subCategory: { type: String },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    features: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
    images: [{ type: String }],
    pdfFile: { type: String },
    isActive: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export default Product
