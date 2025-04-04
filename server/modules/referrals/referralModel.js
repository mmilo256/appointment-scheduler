import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'

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
  },
  solution: {
    type: DataTypes.STRING
  },
  solution_date: {
    type: DataTypes.STRING
  },
  is_deleted: {
    type: DataTypes.BOOLEAN
  }
}, {
  // Opción para que no cree los atributos createdAt y updatedAt
  timestamps: false
})

export default Referral
