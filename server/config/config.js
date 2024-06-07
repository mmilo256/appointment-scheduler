export const PORT = 3000

export const JWT_SECRET = 'secretkey'

export const DATABASE = {
  database: 'agenda_muni',
  host: 'localhost',
  user: 'root',
  port: 3306
}

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

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  INVALID_TOKEN: 'Invalid token',
  PERMISSION_DENIED: 'Permission denied',
  MISSING_PARAMETERS: 'Missing required parameters',
  DATABASE_ERROR: 'Database error occurred',
  SERVER_ERROR: 'Internal server error',
  INVALID_CREDENTIALS: 'Invalid username or password'
}
