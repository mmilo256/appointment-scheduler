import 'dotenv/config'

// Puerto del servidor
export const PORT = process.env.PORT || 10000

// Key para el JSON Web Token
export const JWT_SECRET = process.env.JWT_SECRET || "dev"
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "8h"

// Configuración de la base de datos
export const DATABASE = {
  name: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  port: process.env.DB_PORT
}

// Códigos de estado HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
}
