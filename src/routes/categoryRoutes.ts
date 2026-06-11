import express from 'express'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController'
import { protectAdmin } from '../middlewares/authMiddleware'

const router = express.Router()

router.route('/').get(getCategories).post(protectAdmin, createCategory)
router.route('/:id').put(protectAdmin, updateCategory).delete(protectAdmin, deleteCategory)

export default router
