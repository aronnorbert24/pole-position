import { Request, Response } from 'express'
import articleService from '../services/articleService'

class ArticleController {
  async saveArticle(req: Request, res: Response) {
    try {
      console.log('In Controller')
      const newArticle = req.body

      const savedArticle = await articleService.saveArticle(newArticle)
      return res.status(201).json(savedArticle)
    } catch (error) {
      return res.status(500).send('Saving Article failed. Please check your input, and try again.')
    }
  }
  async getArticles(req: Request, res: Response) {
    try {
      const article = req.body
      console.log('Before Service' + article)
      const articles = await articleService.getArticles()
      console.log('After Service')
      return res.status(201).json(articles)
    } catch (error) {
      return res.status(500).send('Unable to get Articles at this time. Please try again.')
    }
  }
}

export default new ArticleController()