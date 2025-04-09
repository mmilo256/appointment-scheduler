import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'

// Modelo de audiencias
export const Appointment = sequelize.define('audiencias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  materia: {
    type: DataTypes.STRING
  },
  respuesta: {
    type: DataTypes.STRING
  },
  ciudadano_id: {
    type: DataTypes.INTEGER
  },
  estado: {
    type: DataTypes.STRING
  }
})

export default Appointment
