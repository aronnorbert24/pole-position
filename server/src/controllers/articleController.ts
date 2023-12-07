import { Request, Response } from 'express'
import articleService from '../services/articleService'

class ArticleController {
  async saveArticle(req: Request, res: Response) {
    try {
      const newArticle = req.body

      const savedArticle = await articleService.saveArticle(newArticle)
      return res.status(201).json(savedArticle)
    } catch (error) {
      return res.status(500).send('Saving Article failed. Please check your input, and try again.')
    }
  }
  async getArticles(_req: Request, res: Response) {
    try {
      const articles = await articleService.getArticles()
      return res.status(201).json(articles)
    } catch (error) {
      return res.status(500).send('Unable to get Articles at this time. Please try again.')
    }
  }
  async editArticle(req: Request, res: Response) {
    try {
      const articleId = req.params.id
      const newArticle = req.body

      if (!articleId) {
        return res.status(400).send('Invalid article id provided.')
      }

      const updatedArticle = await articleService.updateArticleById(articleId, newArticle)

      return res.status(200).json(updatedArticle)
    } catch (error) {
      return res.status(500).send('Unable to update the article. Please check your input and try again later.')
    }
  }
}

export default new ArticleController()