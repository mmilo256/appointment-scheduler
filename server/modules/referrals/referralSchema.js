import Joi from 'joi'

export const referralSchema = Joi.object({
  outcome: Joi.string(),
  ref_status: Joi.string(),
  department_id: Joi.number().integer(),
  appointment_id: Joi.number().integer(),
  citizen_fullname: Joi.string()
}).or('outcome', 'ref_status', 'department_id', 'appointment_id', 'citizen_fullname')
