import CommentModel, { Comment } from '../models/Comment'

class CommentService {

  async getComments() {
    const comments = await CommentModel.find({})
      return comments
  }

  async findCommentsById(id: string) {
    const comments = await CommentModel.find({articleId: id}).exec()
    return comments
  }

  async saveComment(data: Comment) {
    const newComment = new CommentModel({
      articleId: data.articleId,
      userId: data.userId,
      username: data.username,
      userPicture: data.userPicture,
      parentId: data.parentId,
      replies: data.replies,
      body: data.body,
      date: data.date,
      likedBy: data.likedBy,
      likes: data.likes,
    })

    const savedComment = await newComment.save()

    return savedComment
  }
}

export default new CommentService()