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