import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'

// Modelo Usuario
const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.NUMBER
    }
  },
  {
    // Opción para que no cree los atributos createdAt y updatedAt
    timestamps: false
  }
)

export default User
