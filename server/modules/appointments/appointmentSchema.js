import Joi from 'joi'

export const appointmentSchema = Joi.object({
  cause: Joi.string(),
  date: Joi.string(),
  time: Joi.string(),
  citizen_id: Joi.number().integer(),
  is_referred: Joi.bool()
}).or('cause', 'date', 'time', 'citizen_id', 'is_referred')
