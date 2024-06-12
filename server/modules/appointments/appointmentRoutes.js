import e from 'express'
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentById, getAvailableSchedules, updateAppointment } from './appointmentController.js'

const router = e.Router()

// Rutas
router.get('/', getAllAppointments)
router.post('/', createAppointment)
router.get('/:id', getAppointmentById)
router.get('/date/:date', getAvailableSchedules)
router.delete('/:id', deleteAppointment)
router.patch('/:id', updateAppointment)

export default router
