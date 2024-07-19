import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'

// Modelo Ciudadano
const Citizen = sequelize.define('citizens', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rut: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_2: {
    type: DataTypes.STRING
  },
  is_deleted: {
    type: DataTypes.BOOLEAN
  }
},
{
  // Opción para que no cree los atributos createdAt y updatedAt
  timestamps: false
})

export default Citizen
