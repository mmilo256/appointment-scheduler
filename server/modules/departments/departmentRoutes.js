import e from 'express'
import { getAllDepartments } from './departmentController.js'

const router = e.Router()

// Rutas
router.get('/', getAllDepartments)

export default router
