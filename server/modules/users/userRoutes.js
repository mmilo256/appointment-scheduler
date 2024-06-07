import e from 'express'
import { getAllUsers, getUserById } from './userController.js'

const router = e.Router()

// Rutas
router.get('/', getAllUsers)
router.get('/:id', getUserById)

export default router
