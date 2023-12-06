import { Router } from 'express'
import articleController from '../controllers/articleController'
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema'

const article = Router()

//article.get('/:id', articleController.getTodos)
article.post('/save', ValidateSchema(Schemas.article.create), articleController.saveArticle)

export default article