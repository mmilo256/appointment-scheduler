import Joi from 'joi'

export const appointmentSchema = Joi.object({
  cause: Joi.string(),
  appointment_date: Joi.date(),
  appointment_status: Joi.string(),
  user_id: Joi.number().integer(),
  citizen_id: Joi.number().integer(),
  department_id: Joi.number().integer()
}).or('cause', 'appointment_data', 'appointment_status', 'user_id', 'citizen_id', 'department_id')
