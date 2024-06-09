import Citizen from './citizenModel.js'
import { HTTP_STATUS } from '../../config/config.js'
import { citizenSchema } from './citizenSchema.js'

// Petición para obtener a todos los ciudadanos
export const getAllCitizens = async (req, res) => {
  try {
    const citizens = await Citizen.findAll()
    res.json(citizens)
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

// Agregar un ciudadano a la bd
export const createCitizen = async (req, res) => {
  try {
    // Obtener datos del nuevo ciudadano desde la request y encriptar la contraseña
    const { rut, first_name: firstName, last_name: lastName, address, email, phone, phone_2: phone2 } = req.body
    // Validación del ciudadano
    const { error } = citizenSchema.validate({ rut, first_name: firstName, last_name: lastName, address, email, phone, phone_2: phone2 })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no validos' })
    }
    // Verifica si el ciudadano ya existe
    const existingCitizen = await Citizen.findOne({ rut, where: { rut } })
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
    const { rut, first_name: firstName, last_name: lastName, address, email, phone, phone_2: phone2 } = req.body
    const citizen = await Citizen.findOne({ attributes: ['rut', 'first_name', 'last_name', 'address', 'email', 'phone', 'phone_2'], where: { id } })
    if (!citizen) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No se encontró al ciudadano' })
    }
    // Validación del ciudadano
    const { error } = citizenSchema.validate({ rut, first_name: firstName, last_name: lastName, address, email, phone, phone_2: phone2 })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no validos' })
    }
    // Verifica si el ciudadano nuevo ya existe, sólo si citizenname existe en el body request
    if (rut) {
      const existingCitizen = await Citizen.findOne({ rut, where: { rut } })
      if (existingCitizen) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'El ciudadano ya existe' })
      }
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
