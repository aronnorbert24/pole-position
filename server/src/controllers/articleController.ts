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
/*
  async getArticles(req: Request, res: Response) {
    try {
      const userId = req.params._id
      console.log(req.params._id)

      const posts = await userService.getPostsById(userId)
      return res.status(200).json(posts)
    } catch (error) {
      return res.status(500).send('Unable to get Articles at this time. Please try again.')
    }
  }*/
}

export default new ArticleController()