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
export const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET ? process.env.JWT_SECRET : "secretkey", {
    expiresIn: process.env.JWT_EXPIRES_IN ? process.env.JWT_EXPIRES_IN : "8h"
  })
}
