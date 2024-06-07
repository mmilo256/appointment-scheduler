// Puerto del servidor
export const PORT = 3000

// Key para el JSON Web Token
export const JWT_SECRET = 'secretkey'

// Configuración de la base de datos
export const DATABASE = {
  database: 'agenda_muni',
  host: 'localhost',
  password: '',
  user: 'root',
  port: 3306
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
