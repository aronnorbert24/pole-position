import Joi, { ObjectSchema } from 'joi'
import { NextFunction, Request, Response } from 'express'
import { User } from '../models/User'

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      return res.status(422).json({ error: 'Invalid credentials, please try again' })
    }
  }
}

export const Schemas = {
  user: {
    register: Joi.object<User>({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      userPicture: Joi.string().required(),
    }),

    login: Joi.object<User>({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  /*todo: {
    create: Joi.object<Todo>({
      title: Joi.string().required(),
      description: Joi.string().allow('').optional(),
      priority: Joi.string().required(),
      isChecked: Joi.boolean().required(),
      dueDate: Joi.date().required(),
      userId: Joi.string().required(),
    }),
    update: Joi.object<Todo>({
      title: Joi.string().required(),
      description: Joi.string().allow('').optional(),
      priority: Joi.string().required(),
      isChecked: Joi.boolean().required(),
      dueDate: Joi.date().required(),
    }),
    get: Joi.object<Todo>({
      userId: Joi.string().required(),
    }),
  },*/
}