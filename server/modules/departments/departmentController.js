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
