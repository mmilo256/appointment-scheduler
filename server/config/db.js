import { DATABASE } from './config.js'
import { Sequelize } from 'sequelize'

// Instancia de la base de datos
/* export const sequelize = new Sequelize(DATABASE.name, DATABASE.user, DATABASE.password, {
  host: DATABASE.host,
  dialect: 'mysql'
}) */

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
})

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
