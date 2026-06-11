import express from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'

const router = express.Router()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Use memory storage for multer
const storage = multer.memoryStorage()

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
    
    if (!req.file) {
      return res.status(400).json({ error: 'لم يتم رفع أي ملف' })
    }

    const isPdf = req.file.mimetype === 'application/pdf'
    
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'livecare',
        resource_type: isPdf ? 'raw' : 'auto'
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error)
          return res.status(500).json({ error: 'فشل الرفع إلى التخزين السحابي' })
        }
        
        if (result && result.secure_url) {
          res.json({ url: result.secure_url })
        } else {
          res.status(500).json({ error: 'لم يتم الحصول على رابط الملف' })
        }
      }
    )

    uploadStream.end(req.file.buffer)
  })
})

export default router
