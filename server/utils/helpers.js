import crypto from 'crypto'

// Encriptar contraseñas usando el algoritmo SHA256
export const encryptPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex')
}

// Compara dos contraseñas y devuelve un booleano
export const comparePasswords = (originalPass, passwordToCheck) => {
  return originalPass === passwordToCheck
}
