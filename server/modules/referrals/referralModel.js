import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'
import Department from '../departments/departmentModel.js'
import Appointment from '../appointments/appointmentModel.js'

// Modelo de audiencias
export const Referral = sequelize.define('referrals', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  outcome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ref_status: {
    type: DataTypes.ENUM(['pendiente', 'en proceso', 'finalizada'])
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'departments',
      key: 'id'
    }
  },
  appointment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'appointments',
      key: 'id'
    }
  },
  citizen_fullname: {
    type: DataTypes.STRING
  }
},
{
  // Opción para que no cree los atributos createdAt y updatedAt
  timestamps: false
})

// Definición de asociaciones
Referral.belongsTo(Department, { as: 'department', foreignKey: 'department_id' })
Referral.belongsTo(Appointment, { as: 'appointment', foreignKey: 'appointment_id' })

export default Referral
