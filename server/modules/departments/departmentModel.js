import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'

// Modelo Usuario
const Department = sequelize.define('departments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dep_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  // Opción para que no cree los atributos createdAt y updatedAt
  timestamps: false
})

export default Department
