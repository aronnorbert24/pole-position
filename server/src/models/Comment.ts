import mongoose from 'mongoose'

export interface Comment {
  articleId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  parentId: mongoose.Schema.Types.ObjectId,
  replies: Comment[]
  body: string
  date: Date
  likes: number
  likedBy: string[]
}

const commentSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },

  replies: [{
    type: new mongoose.Schema<Comment>()
  }],

  body: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  likedBy: [{
    type: String,
    required: true,
  }],

  likes: {
    type: String,
    default: 0,
    required: true,
  },
})

export default mongoose.model<Comment>('comments', commentSchema)
