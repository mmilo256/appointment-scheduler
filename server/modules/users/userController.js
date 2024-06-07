import User from './userModel.js'

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
