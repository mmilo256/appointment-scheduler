import Appointment from "../modules/appointments/appointmentModel.js"
import Citizen from "../modules/citizens/citizenModel.js"
import Department from "../modules/departments/departmentModel.js"

const defineAssociations = async () => {
    Appointment.belongsTo(Citizen, { as: 'ciudadano', foreignKey: 'ciudadano_id' })
    Citizen.hasMany(Appointment, { foreignKey: 'ciudadano_id' })
    Appointment.belongsTo(Department, { as: 'direccion', foreignKey: 'direccion_id' })
    Department.hasMany(Appointment, { foreignKey: 'direccion_id' })
}

export default defineAssociations