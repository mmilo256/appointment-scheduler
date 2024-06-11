import Referral from './referralModel.js'
import Citizen from '../citizens/citizenModel.js'
import Department from '../departments/departmentModel.js'
import Appointment from '../appointments/appointmentModel.js'
import { HTTP_STATUS } from '../../config/config.js'
import { referralSchema } from './referralSchema.js'

// Petición para obtener a todos los derivaciones
export const getAllReferrals = async (req, res) => {
  try {
    // Obtener las derivaciones y los nombres de sus departamentos y los ciudadanos de sus derivacións correspondientes
    const referrals = await Referral.findAll({
      include: [
        { model: Department, attributes: ['dep_name'], as: 'department' },
        { model: Appointment, attributes: ['cause'], as: 'appointment' },
        { model: Citizen, attributes: ['first_name', 'last_name'], as: 'citizen' }
      ]
    })
    res.json(referrals)
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
  }
}

// Obtener derivación por id
export const getReferralById = async (req, res) => {
  try {
    const { id } = req.params
    const referral = await Referral.findOne({
      include: [
        { model: Department, attributes: ['dep_name'], as: 'department' },
        { model: Appointment, attributes: ['cause'], as: 'appointment' },
        { model: Citizen, attributes: ['first_name', 'last_name'], as: 'citizen' }
      ],
      where: { id }
    })
    res.json(referral)
  } catch (error) {
    console.log('Error al obtener derivación.', error)
  }
}

// Agregar un derivación a la bd
export const createReferral = async (req, res) => {
  try {
    // Obtener datos del nuevo derivación desde la request
    const {
      outcome,
      ref_status: status,
      department_id: department,
      appointment_id: appointment
    } = req.body
    // Validación de la derivación
    const { error } = referralSchema.validate({
      outcome,
      ref_status: status,
      department_id: department,
      appointment_id: appointment
    })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no validos' })
    }
    // Crear al nuevo derivación en la base de datos
    const newReferral = await Referral.create({
      outcome,
      ref_status: status,
      department_id: department,
      appointment_id: appointment
    })
    res.status(HTTP_STATUS.CREATED).json({ message: 'Derivación creado correctamente', newReferral })
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'No se pudo crear el derivación', error })
  }
}

// Borrar un derivación de la bd
export const deleteReferral = async (req, res) => {
  try {
    // ID del derivación a eliminar
    const { id } = req.params
    // Elimina el derivación que coincida con el ID
    await Referral.destroy({ where: { id } })
    res.status(HTTP_STATUS.NO_CONTENT).json()
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Error al eliminar derivación.', error })
  }
}

// Editar un derivación
export const updateReferral = async (req, res) => {
  try {
    const { id } = req.params // ID del derivación a editar
    const {
      outcome,
      ref_status: status,
      department_id: department,
      appointment_id: appointment
    } = req.body
    const referral = await Referral.findOne({ where: { id } })
    if (!referral) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No se encontró la derivación' })
    }
    // Validación
    const { error } = referralSchema.validate({
      outcome,
      ref_status: status,
      department_id: department,
      appointment_id: appointment
    })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no válidos' })
    }
    // Guardar en un objeto los datos nuevos
    const updates = {}
    if (outcome) updates.outcome = outcome
    if (status) updates.ref_status = status
    if (department) updates.department_id = department
    if (appointment) updates.appointment_id = appointment
    // Modificar derivación
    await Referral.update(updates, { where: { id } })
    res.json({
      message: 'Derivación modificado correctamente',
      referral: {
        ...updates
      }
    })
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Error al modificar derivación.', error })
  }
}
