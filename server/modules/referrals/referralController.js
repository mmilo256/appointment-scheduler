import Referral from './referralModel.js'
import Citizen from '../citizens/citizenModel.js'
import Department from '../departments/departmentModel.js'
import Appointment from '../appointments/appointmentModel.js'
import { HTTP_STATUS } from '../../config/config.js'

// Petición para obtener a todos los derivaciones
export const getAllReferrals = async (req, res) => {
  try {
    // Obtener las derivaciones y los nombres de sus departamentos y los ciudadanos de sus derivacións correspondientes
    const referrals = await Referral.findAll({
      where: { is_deleted: false },
      include: [
        { model: Department, attributes: ['dep_name'], as: 'department' },
        { model: Citizen, attributes: ['id', 'first_name', 'last_name'], as: 'citizen' },
        { model: Appointment, attributes: ['cause', 'response'], as: 'appointment' }]
    })
    res.json(referrals)
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
  }
}
export const getAllPendingReferrals = async (req, res) => {
  const page = parseInt(req.query.page)
  const pageSize = parseInt(req.query.pageSize)
  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize
  const endIndex = page * pageSize
  try {
    // Obtener las derivaciones y los nombres de sus departamentos y los ciudadanos de sus derivacións correspondientes
    const referrals = await Referral.findAll({
      where: { ref_status: 'pendiente', is_deleted: false },
      include: [
        { model: Department, attributes: ['dep_name'], as: 'department' },
        { model: Citizen, attributes: ['id', 'first_name', 'last_name'], as: 'citizen' },
        { model: Appointment, attributes: ['cause', 'response'], as: 'appointment' }]
    })
    // Slice the products array based on the indexes
    const paginatedReferrals = referrals.slice(startIndex, endIndex)
    // Calculate the total number of pages
    const totalPages = Math.ceil(referrals.length / pageSize)
    // Send the paginated products and total pages as the API response
    res.json({ referrals: paginatedReferrals, totalPages: totalPages === 0 ? 1 : totalPages })
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
  }
}
export const getAllInProgressReferrals = async (req, res) => {
  const page = parseInt(req.query.page)
  const pageSize = parseInt(req.query.pageSize)
  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize
  const endIndex = page * pageSize
  try {
    // Obtener las derivaciones y los nombres de sus departamentos y los ciudadanos de sus derivacións correspondientes
    const referrals = await Referral.findAll({
      where: { ref_status: 'en proceso', is_deleted: false },
      include: [
        { model: Department, attributes: ['dep_name'], as: 'department' },
        { model: Citizen, attributes: ['id', 'first_name', 'last_name'], as: 'citizen' },
        { model: Appointment, attributes: ['cause', 'response'], as: 'appointment' }]
    })
    // Slice the products array based on the indexes
    const paginatedReferrals = referrals.slice(startIndex, endIndex)
    // Calculate the total number of pages
    const totalPages = Math.ceil(referrals.length / pageSize)
    // Send the paginated products and total pages as the API response
    res.json({ referrals: paginatedReferrals, totalPages: totalPages === 0 ? 1 : totalPages })
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
  }
}
export const getAllFinishedReferrals = async (req, res) => {
  const page = parseInt(req.query.page)
  const pageSize = parseInt(req.query.pageSize)
  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize
  const endIndex = page * pageSize
  try {
    // Obtener las derivaciones y los nombres de sus departamentos y los ciudadanos de sus derivacións correspondientes
    const referrals = await Referral.findAll({
      where: { ref_status: 'finalizada', is_deleted: false },
      include: [
        { model: Department, attributes: ['dep_name'], as: 'department' },
        { model: Citizen, attributes: ['id', 'first_name', 'last_name'], as: 'citizen' },
        { model: Appointment, attributes: ['cause', 'response'], as: 'appointment' }]
    })
    // Slice the products array based on the indexes
    const paginatedReferrals = referrals.slice(startIndex, endIndex)
    // Calculate the total number of pages
    const totalPages = Math.ceil(referrals.length / pageSize)
    // Send the paginated products and total pages as the API response
    res.json({ referrals: paginatedReferrals, totalPages: totalPages === 0 ? 1 : totalPages })
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
        { model: Appointment, attributes: ['date', 'time', 'cause', 'response'], as: 'appointment' },
        { model: Citizen, attributes: ['id', 'first_name', 'last_name'], as: 'citizen' }
      ],
      where: { id, is_deleted: false }
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
      ref_status: status,
      department_id: department,
      appointment_id: appointment,
      citizen_id: citizen,
      solution,
      solution_date: solutionDate
    } = req.body

    // Crear al nuevo derivación en la base de datos
    const newReferral = await Referral.create({
      ref_status: status,
      department_id: department,
      appointment_id: appointment,
      citizen_id: citizen,
      solution,
      solution_date: solutionDate
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

      ref_status: status,
      department_id: department,
      appointment_id: appointment,
      citizen_id: citizen,
      solution,
      solution_date: solutionDate,
      is_deleted: isDeleted
    } = req.body
    const referral = await Referral.findOne({ where: { id, is_deleted: false } })
    if (!referral) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No se encontró la derivación' })
    }

    // Guardar en un objeto los datos nuevos
    const updates = {}
    if (status) updates.ref_status = status
    if (department) updates.department_id = department
    if (appointment) updates.appointment_id = appointment
    if (citizen) updates.citizen_id = citizen
    if (solution) updates.solution = solution
    if (solutionDate) updates.solution_date = solutionDate
    if (isDeleted) updates.is_deleted = isDeleted
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
