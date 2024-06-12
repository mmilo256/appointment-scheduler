import Appointment from './appointmentModel.js'
import Citizen from '../citizens/citizenModel.js'
import { HTTP_STATUS } from '../../config/config.js'
import { appointmentSchema } from './appointmentSchema.js'
import { format } from 'date-fns'

// Petición para obtener a todos los audiencias
export const getAllAppointments = async (req, res) => {
  try {
    // Obtener las audiencias y los nombres de sus usuarios, ciudadanos y departamentos correspondientes
    const appointments = await Appointment.findAll({
      include: [
        { model: Citizen, attributes: ['first_name', 'last_name'], as: 'citizen' }
      ],
      order: [
        ['appointment_date', 'ASC']
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
        { model: Citizen, attributes: ['first_name', 'last_name'], as: 'citizen' }
      ],
      where: { id }
    })
    res.json(appointment)
  } catch (error) {
    console.log('Error al obtener audiencia.', error)
  }
}

export const getAvailableSchedules = async (req, res) => {
  // Define los horarios disponibles
  const allTimes = [
    '08:30', '08:50', '09:10', '09:30', '09:50',
    '10:10', '10:30', '10:50', '11:10', '11:30',
    '11:50', '12:10', '12:30', '12:50'
  ]

  try {
    const { date } = req.params
    // Obtener las audiencias que coincidan con la fecha seleccionada
    const appointments = await Appointment.findAll({ attributes: ['appointment_date'] })

    // Obtener las fechas sin su hora
    const splittedDates = appointments.map(app => (
      {
        date: format(app.appointment_date, 'yyyy-MM-dd'),
        time: format(app.appointment_date, 'HH:mm')
      }
    ))

    // Filtrar las fechas segun la fecha proporcionada
    const filteredDates = splittedDates.filter(app => (
      app.date === date
    ))

    // Obtener las horas ocupadas
    const occupiedTimes = filteredDates.map(app => app.time)

    // Devolver fechas disponibles
    const availableTimes = allTimes.filter(time => (
      !occupiedTimes.includes(time)
    ))

    // Devolver las horas disponibles

    res.json(availableTimes)
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
      citizen_id: citizenId
    } = req.body
    // Validación de la audiencia
    const { error } = appointmentSchema.validate({
      cause,
      appointment_date: date,
      citizen_id: citizenId
    })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no validos' })
    }
    // Crear al nuevo audiencia en la base de datos
    const newAppointment = await Appointment.create({
      cause,
      appointment_date: date,
      citizen_id: citizenId
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
      citizen_id: citizenId
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
      citizen_id: citizenId
    })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no válidos' })
    }
    // Guardar en un objeto los datos nuevos
    const updates = {}
    if (cause) updates.cause = cause
    if (date) updates.appointment_date = date
    if (citizenId) updates.citizen_id = citizenId
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
