import { HTTP_STATUS, JWT_SECRET } from '../config/config.js'
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const header = req.header('Authorization') || ''
  const token = header.replace('Bearer ', '')

  // Negar el acceso si no existe el token
  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Acceso denegado' })
  }
  // Si existe el token, obtener el payload y almacenarlo en la petición
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.payload = {
      username: payload.username,
      email: payload.email,
      nombres: payload.nombres,
      apellidos: payload.apellidos
    }
    next()
  } catch (error) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'El token es inválido', error })
  }
}
