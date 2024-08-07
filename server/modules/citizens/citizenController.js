import Citizen from './citizenModel.js'
import { HTTP_STATUS } from '../../config/config.js'

// Petición para obtener a todos los ciudadanos
export const getAllCitizens = async (req, res) => {
  const page = parseInt(req.query.page)
  const pageSize = parseInt(req.query.pageSize)
  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize
  const endIndex = page * pageSize
  try {
    const citizens = await Citizen.findAll({ where: { is_deleted: false } })
    // Slice the products array based on the indexes
    const paginatedCitizens = citizens.slice(startIndex, endIndex)
    // Calculate the total number of pages
    const totalPages = Math.ceil(citizens.length / pageSize)
    // Send the paginated products and total pages as the API response
    res.json({ citizens: paginatedCitizens, totalPages: totalPages === 0 ? 1 : totalPages })
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
  }
}

// Obtener ciudadano por id
export const getCitizenById = async (req, res) => {
  try {
    const { id } = req.params
    const citizen = await Citizen.findOne({ where: { id, is_deleted: false } })
    res.json(citizen)
  } catch (error) {
    console.log('Error al obtener ciudadano.', error)
  }
}

// Obtener ciudadano por su RUT
export const getCitizenByRUT = async (req, res) => {
  try {
    const { rut } = req.params
    console.log(rut)
    const citizen = await Citizen.findOne({ where: { rut, is_deleted: false } })
    res.json(citizen)
  } catch (error) {
    console.log('Error al obtener ciudadano.', error)
  }
}

// Agregar un ciudadano a la bd
export const createCitizen = async (req, res) => {
  try {
    // Obtener datos del nuevo ciudadano desde la request y encriptar la contraseña
    const { rut, first_name: firstName, last_name: lastName, address, email, phone, phone_2: phone2 } = req.body
    // Verifica si el ciudadano ya existe
    const existingCitizen = await Citizen.findOne({ rut, where: { rut, is_deleted: false } })
    if (existingCitizen) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'El ciudadano ya existe' })
    }
    // Crear al nuevo ciudadano en la base de datos
    const newCitizen = await Citizen.create({ rut, first_name: firstName, last_name: lastName, address, email, phone, phone_2: phone2 })
    res.status(HTTP_STATUS.CREATED).json({ message: 'Ciudadano creado correctamente', newCitizen })
  } catch (error) {
    console.log('No se pudo crear el ciudadano.', error)
  }
}

// Borrar un ciudadano de la bd
export const deleteCitizen = async (req, res) => {
  try {
    // ID del ciudadano a eliminar
    const { id } = req.params
    // Elimina el ciudadano que coincida con el ID
    await Citizen.destroy({ where: { id } })
    res.status(HTTP_STATUS.NO_CONTENT).json()
  } catch (error) {
    console.log('Error al eliminar ciudadano.', error)
  }
}

// Editar un ciudadano
export const updateCitizen = async (req, res) => {
  try {
    // id del ciudadano a editar
    const { id } = req.params
    // obtener el body de la petición
    const { rut, first_name: firstName, last_name: lastName, address, email, phone, phone_2: phone2, is_deleted: isDeleted } = req.body
    const citizen = await Citizen.findOne({ where: { id } })
    if (!citizen) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No se encontró al ciudadano' })
    }

    // Guardar en un objeto los datos a modificar
    const updates = {}
    if (rut) updates.rut = rut
    if (firstName) updates.first_name = firstName
    if (lastName) updates.last_name = lastName
    if (address) updates.address = address
    if (email) updates.email = email
    if (phone) updates.phone = phone
    if (phone2) updates.phone_2 = phone2
    if (isDeleted) updates.is_deleted = isDeleted
    // Modificar ciudadano
    await Citizen.update(updates, { where: { id } })
    res.json({
      message: 'Ciudadano modificado correctamente',
      citizen: {
        id,
        ...updates
      }
    })
  } catch (error) {
    console.log('Error al modificar ciudadano.', error)
  }
}
