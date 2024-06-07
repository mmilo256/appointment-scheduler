import e from 'express'
import { login } from './authController.js'

const router = e.Router()

// Rutas
router.post('/', login)

export default router
