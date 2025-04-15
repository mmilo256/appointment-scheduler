import { DATABASE } from './config.js'
import { Sequelize } from 'sequelize'
import { PostgresDialect } from '@sequelize/postgres'

// Instancia de la base de datos
export const sequelize = new Sequelize(DATABASE.name, DATABASE.user, DATABASE.password, {
  host: DATABASE.host,
  port: DATABASE.port,
  dialect: 'mysql'
})

/* export const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: DATABASE.name,
  user: DATABASE.user,
  password: DATABASE.password,
  host: DATABASE.host,
  port: DATABASE.port,
  clientMinMessages: 'notice'
}) */

/* export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
}) */

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
