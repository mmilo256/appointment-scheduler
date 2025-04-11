import Citizen from './citizenModel.js'
import { HTTP_STATUS } from '../../config/config.js'
import { Op } from 'sequelize'

// Petición para obtener a todos los ciudadanos
export const getAllCitizens = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 10
  const offset = (page - 1) * pageSize
  const search = req.query.search || ""

  console.log(search)

  try {
    const { count, rows } = await Citizen.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset: offset,
      where: search ? {
        [Op.or]: [
          { nombres: { [Op.like]: `%${search}%` } },
          { apellidos: { [Op.like]: `%${search}%` } },
          { rut: { [Op.like]: `%${search}%` } }
        ]
      } : undefined
    })

    const totalPages = Math.ceil(count / pageSize)
    res.json({ citizens: rows, totalPages: totalPages === 0 ? 1 : totalPages })
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
    res.status(500).json({ error: 'Error al consultar ciudadanos' })
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
