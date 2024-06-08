import User from './userModel.js'
import { encryptPassword } from '../../utils/helpers.js'
import { HTTP_STATUS } from '../../config/config.js'
import { userSchema } from './userSchema.js'

// Petición para obtener a todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['username', 'password'] })
    res.json(users)
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
  }
}

// Obtener usuario por id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ attributes: ['username', 'password'], where: { id } })
    res.json(user)
  } catch (error) {
    console.log('Error al obtener usuario.', error)
  }
}

// Agregar un usuario a la bd
export const createUser = async (req, res) => {
  try {
    // Obtener datos del nuevo usuario desde la request y encriptar la contraseña
    const { username, password } = req.body
    // Validación del usuario
    const { error } = userSchema.validate({ username, password })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no validos' })
    }
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ username, where: { username } })
    if (existingUser) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'El usuario ya existe' })
    }
    // Encriptar contraseña
    const hashedPassword = encryptPassword(password)
    // Crear al nuevo usuario en la base de datos
    const newUser = await User.create({ username, password: hashedPassword })
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
    const { username, password } = req.body
    const user = await User.findOne({ attributes: ['username', 'password'], where: { id } })
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No se encontró al usuario' })
    }
    // Validación del usuario
    const { error } = userSchema.validate({ username, password })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no validos' })
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
