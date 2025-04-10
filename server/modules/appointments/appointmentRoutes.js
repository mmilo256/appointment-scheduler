import e from 'express'
import { createAppointment, getAllAppointments, updateAppointment } from './appointmentController.js'

const router = e.Router()

// Rutas
router.get('/', getAllAppointments)
router.post('/', createAppointment)
router.patch('/:id', updateAppointment)

export default router
