import e from 'express'
import { createUser, getAllUsers, getUserById } from './userController.js'

const router = e.Router()

// Rutas
router.get('/', getAllUsers)
router.post('/', createUser)
router.get('/:id', getUserById)

export default router
