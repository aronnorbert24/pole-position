import { Request, Response } from 'express'
import commentService from '../services/commentService'

class CommentController {
    /*async saveComment(req: Request, res: Response) {
      try {
        const newComment = req.body
  
        const savedComment = await commentService.saveComment(newComment)
        return res.status(201).json(savedComment)
      } catch (error) {
        return res.status(500).send('Saving Comment failed. Please check your input, and try again.')
      }
    }*/
    async getComments(_req: Request, res: Response) {
      try {
          const comments = await commentService.getComments()
          return res.status(201).json(comments)
        } catch (error) {
            return res.status(500).send('Unable to get Comments at this time. Please try again.')
        } 
    } 

    async getSingleComments(req: Request, res: Response) {
        try {
          const articleId = req.params.id
    
          if (!articleId) {
            return res.status(400).send('Invalid article id provided.')
          }
    
          const singleComment = await commentService.findCommentsById(articleId)
          return res.status(200).json(singleComment)
        } catch (error) {
          return res.status(500).send('Unable to get comments at this time. Please try again later.')
        }
      }
}

export default new CommentController()