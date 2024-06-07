import { DATABASE } from './config.js'
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(DATABASE.database, DATABASE.user, DATABASE.password, {
  host: DATABASE.host,
  dialect: 'mysql'
})
