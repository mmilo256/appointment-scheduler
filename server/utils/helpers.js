import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/config.js'

// Encriptar contraseñas usando el algoritmo SHA256
export const encryptPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex')
}

// Compara dos contraseñas y devuelve un booleano
export const comparePasswords = (originalPass, passwordToCheck) => {
  const hashedPassword = encryptPassword(originalPass)
  return hashedPassword === passwordToCheck
}

// Generar JSON Web Token
export const generateToken = (username, nombres, apellidos, email) => {
  return jwt.sign({ username, nombres, apellidos, email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  })
}
