import Department from './departmentModel.js'
import { HTTP_STATUS } from '../../config/config.js'

// Petición para obtener a todos los departamentos
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({ attributes: ['dep_name'] })
    res.json(departments)
  } catch (error) {
    console.log('Error al realizar la consulta.', error)
  }
}

// Obtener departamento por id
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params
    const department = await Department.findOne({ attributes: ['dep_name'], where: { id } })
    res.json(department)
  } catch (error) {
    console.log('Error al obtener departamento.', error)
  }
}

// Agregar un departamento a la bd
export const createDepartment = async (req, res) => {
  try {
    // Obtener datos del nuevo departamento desde la request
    const department = req.body.dep_name
    // Crear al nuevo departamento en la base de datos
    const newDepartment = await Department.create({ dep_name: department })
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
    res.status(HTTP_STATUS.NO_CONTENT)
  } catch (error) {
    console.log('Error al eliminar departamento.', error)
  }
}

// Editar un departamento
export const updateDepartment = async (req, res) => {
  try {
    // ID del departamento a editar
    const { id } = req.params
    const department = await Department.findOne({ attributes: ['dep_name'], where: { id } })
    const depName = req.body.dep_name ? req.body.dep_name : department.dep_name
    await Department.update({ dep_name: depName }, { where: { id } })
    res.json({
      message: 'Departamento modificado correctamente',
      department: {
        dep_name: depName
      }
    })
  } catch (error) {
    console.log('Error al modificar departamento.', error)
  }
}
