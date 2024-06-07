import { HTTP_STATUS } from '../config/config.js'
import User from '../modules/users/userModel.js'
import { comparePasswords, encryptPassword } from '../utils/helpers.js'

export const login = async (req, res) => {
  const { username, password } = req.body
  // Primero buscar usuario segun su username
  const user = await User.findOne({ attributes: ['username', 'password'], where: { username } })

  // Si no se encontró al usuario, devolver mensaje
  if (!user) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Usuario no encontrado' })
    return
  }

  // Si se encontró al usuario, comparar contraseñas
  const hash = encryptPassword(password)
  const isCorrect = comparePasswords(user.password, hash)
  if (!isCorrect) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Las contraseñas no coinciden.' })
    return
  }
  res.json({ message: 'Has iniciado sesión' })
}
