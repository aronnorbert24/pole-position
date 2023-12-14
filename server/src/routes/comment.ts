import { Router } from 'express'
import commentController from '../controllers/commentController'
//import { Schemas, ValidateSchema } from '../middleware/ValidateSchema'

const comment = Router()

comment.get('/getComments/', commentController.getComments)
/*comment.post('/save', ValidateSchema(Schemas.comment.create), commentController.saveComment)
comment.patch('/edit/:id', ValidateSchema(Schemas.comment.update), commentController.editComment)
comment.delete('/delete/:id', commentController.deleteComment)
comment.get('/:id', commentController.getSingleComment)
comment.get('/category/:id', commentController.getCommentsByCategory)
*/
export default comment