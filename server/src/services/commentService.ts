import CommentModel from '../models/Comment'

class CommentService {

  async getComments() {
    const comments = await CommentModel.find({})
      return comments
  }

  async findCommentsById(id: string) {
    const comments = await CommentModel.find({articleId: id}).exec()
    return comments
  }
}

export default new CommentService()