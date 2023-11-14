export interface Comment {
  articleId: number
  userId: string
  parentId: number
  replies: Comment[]
  commentId: number
  body: string
  date: Date
  likes: number
  dislikes: number
  likedBy: string[]
  dislikedBy: string[]
}
