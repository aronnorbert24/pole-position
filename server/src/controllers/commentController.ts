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
}

export default new CommentController()