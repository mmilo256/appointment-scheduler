import User from './userModel.js'
import { encryptPassword } from '../../utils/helpers.js'
import { HTTP_STATUS } from '../../config/config.js'

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
    const username = req.body.username
    const password = encryptPassword(req.body.password)
    // Crear al nuevo usuario en la base de datos
    const newUser = await User.create({ username, password })
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
    res.status(HTTP_STATUS.NO_CONTENT)
  } catch (error) {
    console.log('Error al eliminar usuario.', error)
  }
}

// Editar un usuario
export const updateUser = async (req, res) => {
  try {
    // ID del usuario a editar
    const { id } = req.params
    const user = await User.findOne({ attributes: ['username', 'password'], where: { id } })
    const username = req.body.username ? req.body.username : user.username
    const password = req.body.password ? encryptPassword(req.body.password) : user.password
    console.log(username, password)
    await User.update({ username, password }, { where: { id } })
    res.json({
      message: 'Usuario modificado correctamente',
      user: {
        username,
        password
      }
    })
  } catch (error) {
    console.log('Error al modificar usuario.', error)
  }
}
