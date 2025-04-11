import e from 'express'
import { createDepartment, deleteDepartment, getAllDepartments } from './departmentController.js'

const router = e.Router()

// Rutas
router.get('/', getAllDepartments)
router.post('/', createDepartment)
router.delete('/:id', deleteDepartment)

export default router
