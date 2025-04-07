import { sequelize } from '../../config/db.js'
import { DataTypes } from 'sequelize'

// Modelo Ciudadano
const Citizen = sequelize.define('ciudadanos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rut: {
    type: DataTypes.STRING
  },
  nombres: {
    type: DataTypes.STRING,
  },
  apellidos: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING,
  },
  telefono_2: {
    type: DataTypes.STRING
  }
},
  {
    // Opción para que no cree los atributos createdAt y updatedAt
    timestamps: false
  })

export default Citizen
