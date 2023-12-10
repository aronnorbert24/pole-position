import { Router } from 'express'
import articleController from '../controllers/articleController'
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema'

const article = Router()

article.get('/getArticles/:isTrending', articleController.getArticles)
article.post('/save', ValidateSchema(Schemas.article.create), articleController.saveArticle)
article.patch('/edit/:id', ValidateSchema(Schemas.article.update), articleController.editArticle)
article.delete('/delete/:id', articleController.deleteArticle)
article.get('/:id', articleController.getSingleArticle)
article.get('/category/:id', articleController.getArticlesByCategory)

export default article