import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'
import User from '../users/userModel.js'
import Citizen from '../citizens/citizenModel.js'
import Department from '../departments/departmentModel.js'

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
  appointment_status: {
    type: DataTypes.ENUM(['pendiente', 'finalizada', 'cancelada']),
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  citizen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'citizens',
      key: 'id'
    }
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'departments',
      key: 'id'
    }
  }
},
{
  // Opción para que no cree los atributos createdAt y updatedAt
  timestamps: false
})

// Definición de asociaciones
Appointment.belongsTo(User, { as: 'user', foreignKey: 'user_id' })
Appointment.belongsTo(Citizen, { as: 'citizen', foreignKey: 'citizen_id' })
Appointment.belongsTo(Department, { as: 'department', foreignKey: 'department_id' })

export default Appointment
