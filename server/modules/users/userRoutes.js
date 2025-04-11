import e from 'express'
import { createUser, deleteUser, getAllUsers, getUserById } from './userController.js'

const router = e.Router()

// Rutas
router.get('/', getAllUsers)
router.post('/', createUser)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)

export default router
