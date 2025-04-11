import { HTTP_STATUS } from '../../config/config.js'
import Department from './departmentModel.js'

// Petición para obtener a todos los departamentos
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll()
    res.json(departments)
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
  }
}

// Agregar un departamento a la bd
export const createDepartment = async (req, res) => {
  try {
    // Obtener datos del nuevo departamento desde la request y encriptar la contraseña
    const { direccion, director, email } = req.body
    // Crear al nuevo departamento en la base de datos
    const newDepartment = await Department.create({ direccion, director, email })
    res.status(HTTP_STATUS.CREATED).json({ message: 'Departamento creado correctamente', newDepartment })
  } catch (error) {
    console.log('No se pudo crear el departamento.', error)
  }
}

// Borrar un departamento de la bd
export const deleteDepartment = async (req, res) => {
  try {
    // ID del departamento a eliminar
    const { id } = req.params
    // Elimina el departamento que coincida con el ID
    await Department.destroy({ where: { id } })
    res.status(HTTP_STATUS.NO_CONTENT).json()
  } catch (error) {
    console.log('Error al eliminar departamento.', error)
  }
}