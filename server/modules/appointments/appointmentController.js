import Appointment from './appointmentModel.js'
import Citizen from '../citizens/citizenModel.js'
import { HTTP_STATUS } from '../../config/config.js'

// Petición para obtener a todos los audiencias
export const getAllAppointments = async (req, res) => {
  const { estado } = req.query
  if (!estado) {
    return res.status(400).json({ message: "Faltan parámetros" })
  }
  try {
    // Obtener las audiencias y los nombres de sus usuarios, ciudadanos y departamentos correspondientes
    const appointments = await Appointment.findAll({
      where: { estado },
      include: [
        { model: Citizen, attributes: ['nombres', 'apellidos'], as: "ciudadano" }
      ],
      order: [
        ['createdAt', 'ASC']
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
        { model: Citizen, attributes: ['id', 'nombres', 'apellidos'], as: 'ciudadano' }
      ],
      where: { id, is_deleted: false }
    })
    res.json(appointment)
  } catch (error) {
    console.log('Error al obtener audiencia.', error)
  }
}

export const getAvailableSchedules = async (req, res) => {
  // Define los horarios disponibles
  /* const allTimes = [
    '08:30', '08:50', '09:10', '09:30', '09:50',
    '10:10', '10:30', '10:50', '11:10', '11:30',
    '11:50', '12:10', '12:30', '12:50'
  ] */

  try {
    const { reqDate } = req.params
    // Obtener las audiencias que coincidan con la fecha seleccionada
    const appointments = await Appointment.findAll({ attributes: ['date', 'time'], where: { is_deleted: false } })

    // Filtrar las fechas segun la fecha proporcionada
    const filteredDates = appointments.filter(app => (
      app.date === reqDate
    ))
    // Obtener las horas ocupadas
    const occupiedTimes = filteredDates.map(app => app.time)

    /*
    // Devolver fechas disponibles
    const availableTimes = allTimes.filter(time => (
      !occupiedTimes.includes(time)
    )) */

    // Devolver las horas disponibles

    res.json(occupiedTimes)
  } catch (error) {
    console.log('Error al obtener audiencia.', error)
  }
}

// Agregar un audiencia a la bd
export const createAppointment = async (req, res) => {
  try {
    // Obtener datos del nuevo audiencia desde la request
    const {
      materia,
      ciudadano_id,
    } = req.body
    // Crear al nuevo audiencia en la base de datos
    const newAppointment = await Appointment.create({
      materia,
      ciudadano_id,
      estado: "pendiente"
    })
    res.status(HTTP_STATUS.CREATED).json({ message: 'Audiencia creada correctamente', newAppointment })
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

export const checkAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const appointment = await Appointment.findOne({ where: { id } })
    if (!appointment) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No se encontró la audiencia' })
    }
    await Appointment.update({ estado: "terminada" }, { where: { id } })
    res.json({
      message: 'Audiencia modificado correctamente'
    })
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Error al modificar audiencia.', error })
  }
}

// Editar un audiencia
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params // ID del audiencia a editar
    const {
      materia,
      respuesta,
      ciudadano_id,
      estado
    } = req.body
    const appointment = await Appointment.findOne({ where: { id } })
    if (!appointment) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No se encontró la audiencia' })
    }
    // Guardar en un objeto los datos nuevos
    const updates = {}
    if (materia) updates.materia = materia
    if (ciudadano_id) updates.ciudadano_id = ciudadano_id
    if (estado) updates.estado = estado
    if (respuesta) updates.respuesta = respuesta
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
