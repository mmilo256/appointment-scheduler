import e from 'express'
import { createDepartment, deleteDepartment, getAllDepartments, getDepartmentById, updateDepartment } from './departmentController.js'

const router = e.Router()

// Rutas
router.get('/', getAllDepartments)
router.post('/', createDepartment)
router.get('/:id', getDepartmentById)
router.delete('/:id', deleteDepartment)
router.patch('/:id', updateDepartment)

export default router
