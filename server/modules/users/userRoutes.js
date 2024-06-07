import e from 'express'
import { getAllUsers, getUserById } from './userController.js'

const router = e.Router()

// Rutas
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)

export default router
