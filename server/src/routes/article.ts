import { Router } from 'express'
import articleController from '../controllers/articleController'
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema'

const article = Router()

article.get('/getArticles', articleController.getArticles)
article.post('/save', ValidateSchema(Schemas.article.create), articleController.saveArticle)
article.patch('/edit/:id', ValidateSchema(Schemas.article.update), articleController.editArticle)
article.delete('/delete/:id', articleController.deleteArticle)

export default article