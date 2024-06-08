import Department from './departmentModel.js'
import { HTTP_STATUS } from '../../config/config.js'
import { departmentSchema } from './departmentSchema.js'

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
    // Validación del departamento
    const { error } = departmentSchema.validate({ dep_name: department })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no validos' })
    }
    // Crear al nuevo departamento en la base de datos
    const newDepartment = await Department.create({ dep_name: department })
    res.status(HTTP_STATUS.CREATED).json({ message: 'Departamento creado correctamente', newDepartment })
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'No se pudo crear el departamento', error })
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
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Error al eliminar departamento.', error })
  }
}

// Editar un departamento
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params // ID del departamento a editar
    const depName = req.body.dep_name
    const department = await Department.findOne({ attributes: ['dep_name'], where: { id } })
    if (!department) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No se encontró el departamento' })
    }
    console.log(department.dep_name)
    // Validación
    const { error } = departmentSchema.validate({ dep_name: depName })
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Datos no válidos' })
    }
    // Guardar en un objeto los datos nuevos
    const updates = {}
    if (depName) updates.dep_name = depName
    // Modificar departamento
    await Department.update(updates, { where: { id } })
    res.json({
      message: 'Departamento modificado correctamente',
      department: {
        ...updates
      }
    })
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Error al modificar departamento.', error })
  }
}
