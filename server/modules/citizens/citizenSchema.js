import Joi from 'joi'

export const citizenSchema = Joi.object({
  rut: Joi.string(),
  first_name: Joi.string().min(3),
  last_name: Joi.string().min(3),
  address: Joi.string().min(3),
  email: Joi.string(),
  phone: Joi.string().min(3),
  phone_2: Joi.string()
}).or('rut', 'first_name', 'last_name', 'address', 'email', 'phone', 'phone_2')
