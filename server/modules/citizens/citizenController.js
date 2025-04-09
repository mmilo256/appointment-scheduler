import Citizen from './citizenModel.js'
import { HTTP_STATUS } from '../../config/config.js'

// Petición para obtener a todos los ciudadanos
export const getAllCitizens = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 10
  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize
  const endIndex = page * pageSize
  try {
    const citizens = await Citizen.findAll({
      order: [['createdAt', 'DESC']]
    })
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
    const citizen = await Citizen.findOne({ where: { id } })
    res.json(citizen)
  } catch (error) {
    console.log('Error al obtener ciudadano.', error)
  }
}

// Obtener ciudadano por su RUT
export const getCitizenByRUT = async (req, res) => {
  try {
    const { rut } = req.params
    const citizen = await Citizen.findOne({ where: { rut } })
    res.json(citizen)
  } catch (error) {
    console.log('Error al obtener ciudadano.', error)
  }
}

// Agregar un ciudadano a la bd
export const createCitizen = async (req, res) => {
  try {
    // Obtener datos del nuevo ciudadano desde la request y encriptar la contraseña
    const { rut, nombres, apellidos, direccion, email, telefono, telefono_2 } = req.body
    // Verifica si el ciudadano ya existe
    const existingCitizen = await Citizen.findOne({ rut, where: { rut } })
    if (existingCitizen) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Ya existe un ciudadano con este RUT' })
    }
    // Crear al nuevo ciudadano en la base de datos
    const newCitizen = await Citizen.create({ rut, nombres, apellidos, direccion, email, telefono, telefono_2 })
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
    const { rut, nombres, apellidos, direccion, email, telefono, telefono_2 } = req.body
    const citizen = await Citizen.findOne({ where: { id } })
    if (!citizen) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No se encontró al ciudadano' })
    }

    // Guardar en un objeto los datos a modificar
    const updates = {
      rut,
      nombres,
      apellidos,
      direccion,
      email,
      telefono,
      telefono_2
    }

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
