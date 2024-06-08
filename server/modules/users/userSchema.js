import Joi from 'joi'

export const userSchema = Joi.object({
  username: Joi.string(),
  password: Joi.string().min(3)
}).or('username', 'password')
