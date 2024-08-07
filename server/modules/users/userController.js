import User from './userModel.js'
import { encryptPassword } from '../../utils/helpers.js'
import { HTTP_STATUS } from '../../config/config.js'

// Petición para obtener a todos los usuarios
export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page)
  const pageSize = parseInt(req.query.pageSize)
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
    const { username, password, role, first_name: firstName, last_name: lastName, email } = req.body
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ attributes: ['username'], where: { username } })
    if (existingUser) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'El usuario ya existe' })
    }
    // Encriptar contraseña
    const hashedPassword = encryptPassword(password)
    // Crear al nuevo usuario en la base de datos
    const newUser = await User.create({ username, password: hashedPassword, role, first_name: firstName, last_name: lastName, email })
    res.status(HTTP_STATUS.CREATED).json({ message: 'Usuario creado correctamente', newUser })
  } catch (error) {
    console.log('No se pudo crear el usuario.', error)
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

// Editar un usuario
export const updateUser = async (req, res) => {
  try {
    // id del usuario a editar
    const { id } = req.params
    // obtener el body de la petición
    const { username, password, role, first_name: firstName, last_name: lastName, email } = req.body
    const user = await User.findOne({ where: { id } })
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No se encontró al usuario' })
    }

    // Verifica si el usuario nuevo ya existe, sólo si username existe en el body request
    if (username) {
      const existingUser = await User.findOne({ username, where: { username } })
      if (existingUser) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'El usuario ya existe' })
      }
    }
    // Guardar en un objeto los datos a modificar
    const updates = {}
    if (username) updates.username = username
    if (role) updates.role = role
    if (email) updates.email = email
    if (firstName) updates.first_name = firstName
    if (lastName) updates.last_name = lastName
    if (password) {
      const hashedPassword = encryptPassword(password)
      updates.password = hashedPassword
    }
    // Modificar usuario
    await User.update(updates, { where: { id } })
    res.json({
      message: 'Usuario modificado correctamente',
      user: {
        id,
        ...updates
      }
    })
  } catch (error) {
    console.log('Error al modificar usuario.', error)
  }
}
