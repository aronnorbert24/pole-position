import Joi, { ObjectSchema } from 'joi'
import { NextFunction, Request, Response } from 'express'
import { User } from '../models/User'
import { Article } from '../models/Article'

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
  article: {
    create: Joi.object<Article>({
      title: Joi.string().required(),
      subheading: Joi.string().required(),
      separatedText: Joi.array().items(Joi.string()),
      image: Joi.string().required(),
      category: Joi.string().required(),
      datePublished: Joi.date().required(),
      likedBy: Joi.array().items(Joi.string()),
      likes: Joi.number().required(),
      views: Joi.number().required(),
    }),
    update: Joi.object<Article>({
      title: Joi.string().required(),
      subheading: Joi.string().required(),
      separatedText: Joi.array().items(Joi.string()),
      image: Joi.string().required(),
      category: Joi.string().required(),
      datePublished: Joi.date().required(),
      likedBy: Joi.array().items(Joi.string()),
      likes: Joi.number().required(),
      views: Joi.number().required(),
    }),
    /*get: Joi.object<Article>({
      userId: Joi.string().required(),
    }),*/
  },
}