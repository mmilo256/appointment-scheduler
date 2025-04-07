import Appointment from "../modules/appointments/appointmentModel.js"
import Citizen from "../modules/citizens/citizenModel.js"
import Department from "../modules/departments/departmentModel.js"
import Referral from "../modules/referrals/referralModel.js"

const defineAssociations = async () => {
    Appointment.belongsTo(Citizen, { as: 'ciudadano', foreignKey: 'ciudadano_id' })
    Citizen.hasMany(Appointment, { foreignKey: 'ciudadano_id' })
    Referral.belongsTo(Department, { as: 'direccion', foreignKey: 'direccion_id' })
    Department.hasMany(Referral, { foreignKey: 'direccion_id' })
    Referral.belongsTo(Appointment, { as: 'audiencia', foreignKey: 'audiencia_id' })
    Appointment.hasOne(Referral, { foreignKey: 'audiencia_id' })
    Referral.belongsTo(Citizen, { as: 'ciudadano', foreignKey: 'ciudadano_id' })

}

export default defineAssociations