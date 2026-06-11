import express from 'express'
import {
  getSettings,
  updateSettings,
} from '../controllers/settingsController'
import { protectAdmin } from '../middlewares/authMiddleware'

const router = express.Router()

router.route('/').get(getSettings).put(protectAdmin, updateSettings)

export default router
