import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'

// Modelo Usuario
const Department = sequelize.define('direcciones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  direccion: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  director: {
    type: DataTypes.STRING
  }
},
  {
    // Opción para que no cree los atributos createdAt y updatedAt
    timestamps: false
  })

export default Department
