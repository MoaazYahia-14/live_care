import express from 'express'
import { getStats } from '../controllers/statController'

const router = express.Router()

router.get('/', getStats)

export default router
