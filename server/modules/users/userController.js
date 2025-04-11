import User from './userModel.js'
import { encryptPassword } from '../../utils/helpers.js'
import { HTTP_STATUS } from '../../config/config.js'

// Petición para obtener a todos los usuarios
export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 10
  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize
  const endIndex = page * pageSize
  try {
    const users = await User.findAll()
    // Slice the products array based on the indexes
    const paginatedUsers = users.slice(startIndex, endIndex)
    // Calculate the total number of pages
    const totalPages = Math.ceil(users.length / pageSize)
    // Send the paginated products and total pages as the API response
    res.json({ users: paginatedUsers, totalPages: totalPages === 0 ? 1 : totalPages })
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
  }
}


// Borrar un usuario de la bd
export const deleteUser = async (req, res) => {
  try {
    // ID del usuario a eliminar
    const { id } = req.params
    // Elimina el usuario que coincida con el ID
    await User.destroy({ where: { id } })
    res.status(HTTP_STATUS.NO_CONTENT).json()
  } catch (error) {
    console.log('Error al eliminar usuario.', error)
  }
}

// Obtener usuario por id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ where: { id } })
    res.json(user)
  } catch (error) {
    console.log('Error al obtener usuario.', error)
  }
}

// Agregar un usuario a la bd
export const createUser = async (req, res) => {
  try {
    // Obtener datos del nuevo usuario desde la request y encriptar la contraseña
    const { username, password, nombres, apellidos, email } = req.body
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ attributes: ['username'], where: { username } })
    if (existingUser) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'El usuario ya existe' })
    }
    // Encriptar contraseña
    const hashedPassword = encryptPassword(password)
    // Crear al nuevo usuario en la base de datos
    const newUser = await User.create({ username, password: hashedPassword, nombres, apellidos, email })
    res.status(HTTP_STATUS.CREATED).json({ message: 'Usuario creado correctamente', newUser })
  } catch (error) {
    console.log('No se pudo crear el usuario.', error)
  }
}
