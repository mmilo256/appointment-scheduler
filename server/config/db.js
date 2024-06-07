import { DATABASE } from './config.js'
import { Sequelize } from 'sequelize'

// Instancia de la base de datos
export const sequelize = new Sequelize(DATABASE.database, DATABASE.user, DATABASE.password, {
  host: DATABASE.host,
  dialect: 'mysql'
})
