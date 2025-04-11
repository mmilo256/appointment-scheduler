import Appointment from './appointmentModel.js'
import Citizen from '../citizens/citizenModel.js'
import { HTTP_STATUS } from '../../config/config.js'
import Department from '../departments/departmentModel.js'
import { Op } from 'sequelize'

// Petición para obtener a todas los audiencias pendientes
export const getAllAppointments = async (req, res) => {
  try {
    // Obtener las audiencias y los nombres de sus usuarios, ciudadanos y departamentos correspondientes
    const appointments = await Appointment.findAll({
      where: { estado: "pendiente" },
      attributes: ["id", "materia", "createdAt"],
      include: [
        { model: Citizen, attributes: ['nombres', 'apellidos', 'rut', 'telefono', 'telefono_2', 'email'], as: "ciudadano" }
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

// Petición para obtener a todas los audiencias terminadas y derivadas
export const getAllFinishedAppointments = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 10
  const offset = (page - 1) * pageSize
  const search = req.query.search || ""
  try {
    // Obtener las audiencias y los nombres de sus usuarios, ciudadanos y departamentos correspondientes
    const { count, rows } = await Appointment.findAndCountAll({
      where: {
        estado: { [Op.ne]: 'pendiente' }
      },
      include: [
        {
          model: Citizen,
          attributes: ['nombres', 'apellidos', 'rut', 'direccion', 'email', 'telefono', 'telefono_2'],
          as: "ciudadano",
          where: search ? {
            [Op.or]: [
              { nombres: { [Op.like]: `%${search}%` } },
              { apellidos: { [Op.like]: `%${search}%` } }
            ]
          } : undefined
        },
        { model: Department, attributes: ['direccion', 'email', 'director'], as: 'direccion' }
      ],
      order: [
        ['createdAt', 'ASC']
      ],
      limit: pageSize,
      offset
    })
    const totalPages = Math.ceil(count / pageSize)
    res.json({ appointments: rows, totalPages: totalPages === 0 ? 1 : totalPages, search })
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
    res.status(500).json({ error: 'Error al consultar ciudadanos' })
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
