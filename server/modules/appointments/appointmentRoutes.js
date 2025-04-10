import e from 'express'
import { createAppointment, getAllAppointments, getAllFinishedAppointments, updateAppointment } from './appointmentController.js'

const router = e.Router()

// Rutas
router.get('/', getAllAppointments)
router.get('/history', getAllFinishedAppointments)
router.post('/', createAppointment)
router.patch('/:id', updateAppointment)

export default router
