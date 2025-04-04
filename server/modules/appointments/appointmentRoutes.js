import e from 'express'
import { checkAppointment, createAppointment, deleteAppointment, getAllAppointments, getAppointmentById, getAvailableSchedules, updateAppointment } from './appointmentController.js'

const router = e.Router()

// Rutas
router.get('/', getAllAppointments)
router.post('/', createAppointment)
router.get('/:id', getAppointmentById)
router.get('/date/:reqDate', getAvailableSchedules)
router.delete('/:id', deleteAppointment)
router.patch('/:id', updateAppointment)
router.patch('/:id/check', checkAppointment)

export default router
