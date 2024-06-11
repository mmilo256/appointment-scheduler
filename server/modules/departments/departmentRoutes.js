import e from 'express'
import { getAllDepartments, getDepartmentById } from './departmentController.js'

const router = e.Router()

// Rutas
router.get('/', getAllDepartments)
router.get('/:id', getDepartmentById)

export default router
