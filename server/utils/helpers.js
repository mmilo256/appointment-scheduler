import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// Encriptar contraseñas usando el algoritmo SHA256
export const encryptPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex')
}

// Compara dos contraseñas y devuelve un booleano
export const comparePasswords = (originalPass, passwordToCheck) => {
  return originalPass === passwordToCheck
}

// Generar JSON Web Token
export const generateToken = (username, role) => {
  return jwt.sign({ username, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}
