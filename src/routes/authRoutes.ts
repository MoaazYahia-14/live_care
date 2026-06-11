import express from 'express'
import { authAdmin, registerUser, authUser } from '../controllers/authController'

const router = express.Router()

router.post('/admin/login', authAdmin)
router.post('/user/register', registerUser)
router.post('/user/login', authUser)

export default router
