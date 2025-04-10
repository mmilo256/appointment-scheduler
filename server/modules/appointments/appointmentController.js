import Appointment from './appointmentModel.js'
import Citizen from '../citizens/citizenModel.js'
import { HTTP_STATUS } from '../../config/config.js'
import Department from '../departments/departmentModel.js'

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
        { model: Citizen, attributes: ['nombres', 'apellidos', 'rut', 'direccion', 'email', 'telefono', 'telefono_2'], as: "ciudadano" },
        { model: Department, attributes: ['direccion', 'email', 'director'], as: 'direccion' }
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

// Editar un audiencia
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params // ID del audiencia a editar
    const {
      materia,
      respuesta,
      estado,
      ciudadano_id,
      direccion_id
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
    if (direccion_id) updates.direccion_id = direccion_id
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
