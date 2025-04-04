import Appointment from "../modules/appointments/appointmentModel.js"
import Citizen from "../modules/citizens/citizenModel.js"
import Department from "../modules/departments/departmentModel.js"
import Referral from "../modules/referrals/referralModel.js"

const defineAssociations = async () => {
    Appointment.belongsTo(Citizen, { as: 'citizen', foreignKey: 'citizen_id' })
    Citizen.hasMany(Appointment, { foreignKey: 'citizen_id' })
    Referral.belongsTo(Department, { as: 'department', foreignKey: 'department_id' })
    Department.hasMany(Referral, { foreignKey: 'department_id' })
    Referral.belongsTo(Appointment, { as: 'appointment', foreignKey: 'appointment_id' })
    Appointment.hasOne(Referral, { foreignKey: 'appointment_id' })
    Referral.belongsTo(Citizen, { as: 'citizen', foreignKey: 'citizen_id' })

}

export default defineAssociations