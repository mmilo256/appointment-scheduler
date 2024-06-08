import Joi from 'joi'

export const departmentSchema = Joi.object({
  dep_name: Joi.string()
})
