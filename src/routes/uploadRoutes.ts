import express from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import path from 'path'

const router = express.Router()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === 'application/pdf'
    return {
      folder: 'livecare',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
      // PDF files must be uploaded as 'raw' or 'image'. 'raw' is safer for keeping them as documents.
      resource_type: isPdf ? 'raw' : 'auto'
    }
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|jpeg|png|webp|pdf/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
      cb(null, true)
    } else {
      cb(new Error('الصور وملفات الـ PDF فقط مسموحة'))
    }
  }
})

// @route   POST /api/upload
// @access  Private/Admin
router.post('/', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Upload Error:', err)
      return res.status(400).json({ error: err.message || 'حدث خطأ أثناء رفع الملف' })
    }
    
    if (req.file) {
      // When using multer-storage-cloudinary, req.file.path contains the Cloudinary URL
      res.json({ url: req.file.path })
    } else {
      res.status(400).json({ error: 'لم يتم رفع أي ملف' })
    }
  })
})

export default router
