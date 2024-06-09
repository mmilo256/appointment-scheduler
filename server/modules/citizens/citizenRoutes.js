import e from 'express'
import { createCitizen, deleteCitizen, getAllCitizens, getCitizenById, updateCitizen, getCitizenByRUT } from './citizenController.js'

const router = e.Router()

// Rutas
router.get('/', getAllCitizens)
router.post('/', createCitizen)
router.get('/:id', getCitizenById)
router.get('/rut/:rut', getCitizenByRUT)
router.delete('/:id', deleteCitizen)
router.patch('/:id', updateCitizen)

export default router
