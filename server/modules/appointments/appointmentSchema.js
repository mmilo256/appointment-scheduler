import Joi from 'joi'

export const appointmentSchema = Joi.object({
  cause: Joi.string(),
  appointment_date: Joi.date(),
  citizen_id: Joi.number().integer()
}).or('cause', 'appointment_date', 'citizen_id')
