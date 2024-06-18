import { HTTP_STATUS } from '../config/config.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const verifyToken = (req, res, next) => {
  const header = req.header('Authorization') || ''
  const token = header.replace('Bearer ', '')

  // Negar el acceso si no existe el token
  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Acceso denegado' })
  }
  // Si existe el token, obtener el payload y almacenarlo en la petición
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.payload = {
      username: payload.username,
      role: payload.role,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name
    }
    next()
  } catch (error) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'El token es inválido', error })
  }
}
