import mysql from 'mysql2/promise'
import { DATABASE, ERROR_MESSAGES } from './config.js'

let connection

const connectDB = async () => {
  if (!connection) {
    try {
      connection = await mysql.createConnection(DATABASE)
      console.log('Conexión realizada con éxito.')
    } catch (error) {
      console.log(ERROR_MESSAGES.DATABASE_ERROR)
    }
  }
  return connection
}

export default connectDB
