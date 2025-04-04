import defineAssociations from "./associations.js"
import { sequelize } from "./db.js"

const initializeDB = async () => {
    // Define las asociaciones entre modelos (relaciones entre tablas)
    await defineAssociations()

    // Sincroniza los modelos con la base de datos, creando tablas si es necesario
    await sequelize.sync()
}

export default initializeDB
