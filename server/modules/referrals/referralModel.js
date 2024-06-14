import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'
import Department from '../departments/departmentModel.js'
import Appointment from '../appointments/appointmentModel.js'
import Citizen from '../citizens/citizenModel.js'

// Modelo de audiencias
export const Referral = sequelize.define('referrals', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  citizen_id: {
    type: DataTypes.INTEGER,
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
Referral.belongsTo(Department, { as: 'department', foreignKey: 'department_id' })
Referral.belongsTo(Appointment, { as: 'appointment', foreignKey: 'appointment_id' })
Referral.belongsTo(Citizen, { as: 'citizen', foreignKey: 'citizen_id' })

export default Referral
