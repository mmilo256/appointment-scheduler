import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'

// Modelo de audiencias
export const Referral = sequelize.define('derivaciones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  direccion_id: {
    type: DataTypes.INTEGER
  },
  audiencia_id: {
    type: DataTypes.INTEGER
  },
  ciudadano_id: {
    type: DataTypes.INTEGER
  }
}, {
  // Opción para que no cree los atributos createdAt y updatedAt
  timestamps: false
})

export default Referral
