import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'

// Modelo de audiencias
export const Appointment = sequelize.define('appointments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cause: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_referred: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  response: {
    type: DataTypes.STRING
  },
  citizen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'citizens',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING
  }
})

export default Appointment
