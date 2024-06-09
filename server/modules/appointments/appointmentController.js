import Appointment from './appointmentModel.js'
import User from '../users/userModel.js'
import Citizen from '../citizens/citizenModel.js'
import Department from '../departments/departmentModel.js'
import { HTTP_STATUS } from '../../config/config.js'
import { appointmentSchema } from './appointmentSchema.js'

// Petición para obtener a todos los audiencias
export const getAllAppointments = async (req, res) => {
  try {
    // Obtener las audiencias y los nombres de sus usuarios, ciudadanos y departamentos correspondientes
    const appointments = await Appointment.findAll({
      include: [
        { model: User, attributes: ['username'], as: 'user' },
        { model: Citizen, attributes: ['first_name', 'last_name'], as: 'citizen' },
        { model: Department, attributes: ['dep_name'], as: 'department' }
      ]
    })
    res.json(appointments)
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
  }
}

// Obtener audiencia por id
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params
    const appointment = await Appointment.findOne({
      include: [
        { model: User, attributes: ['username'], as: 'user' },
        { model: Citizen, attributes: ['first_name', 'last_name'], as: 'citizen' },
        { model: Department, attributes: ['dep_name'], as: 'department' }
      ],
      where: { id }
    })
    res.json(appointment)
  } catch (error) {
    console.log('Error al obtener audiencia.', error)
  }
}

// Agregar un audiencia a la bd
export const createAppointment = async (req, res) => {
  try {
    // Obtener datos del nuevo audiencia desde la request
    const {
      cause,
      appointment_date: date,
      appointment_status: status,
      user_id: userId,
      citizen_id: citizenId,
      department_id: departmentId
    } = req.body
    // Validación de la audiencia
    const { error } = appointmentSchema.validate({
      cause,
      appointment_date: date,
      appointment_status: status,
      user_id: userId,
      citizen_id: citizenId,
      department_id: departmentId
    })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no validos' })
    }
    // Crear al nuevo audiencia en la base de datos
    const newAppointment = await Appointment.create({
      cause,
      appointment_date: date,
      appointment_status: status,
      user_id: userId,
      citizen_id: citizenId,
      department_id: departmentId
    })
    res.status(HTTP_STATUS.CREATED).json({ message: 'Audiencia creado correctamente', newAppointment })
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'No se pudo crear el audiencia', error })
  }
}

// Borrar un audiencia de la bd
export const deleteAppointment = async (req, res) => {
  try {
    // ID del audiencia a eliminar
    const { id } = req.params
    // Elimina el audiencia que coincida con el ID
    await Appointment.destroy({ where: { id } })
    res.status(HTTP_STATUS.NO_CONTENT).json()
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Error al eliminar audiencia.', error })
  }
}

// Editar un audiencia
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params // ID del audiencia a editar
    const {
      cause,
      appointment_date: date,
      appointment_status: status,
      user_id: userId,
      citizen_id: citizenId,
      department_id: departmentId
    } = req.body
    const appointment = await Appointment.findOne({ where: { id } })
    if (!appointment) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No se encontró la audiencia' })
    }
    console.log(appointment.dep_name)
    // Validación
    const { error } = appointmentSchema.validate({
      cause,
      appointment_date: date,
      appointment_status: status,
      user_id: userId,
      citizen_id: citizenId,
      department_id: departmentId
    })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no válidos' })
    }
    // Guardar en un objeto los datos nuevos
    const updates = {}
    if (cause) updates.cause = cause
    if (date) updates.appointment_date = date
    if (status) updates.appointment_status = status
    if (userId) updates.user_id = userId
    if (citizenId) updates.citizen_id = citizenId
    if (departmentId) updates.department_id = departmentId
    // Modificar audiencia
    await Appointment.update(updates, { where: { id } })
    res.json({
      message: 'Audiencia modificado correctamente',
      appointment: {
        ...updates
      }
    })
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Error al modificar audiencia.', error })
  }
}
