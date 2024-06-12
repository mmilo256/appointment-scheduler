import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'
import Citizen from '../citizens/citizenModel.js'

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
  created_at: {
    type: DataTypes.DATE
  },
  appointment_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  is_referred: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  citizen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'citizens',
      key: 'id'
    }
  }
},
{
  // Opción para que no cree los atributos createdAt y updatedAt
  timestamps: false
})

// Definición de asociaciones
Appointment.belongsTo(Citizen, { as: 'citizen', foreignKey: 'citizen_id' })

export default Appointment
