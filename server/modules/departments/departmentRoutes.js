import e from 'express'
import { createDepartment, getAllDepartments } from './departmentController.js'

const router = e.Router()

// Rutas
router.get('/', getAllDepartments)
router.post('/', createDepartment)

export default router
