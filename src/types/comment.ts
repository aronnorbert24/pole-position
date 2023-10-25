export interface Comment {
  articleId: string
  userId: string
  childrenId: string[]
  commentId: string
  body: string
  date: Date
  likes: number
  dislikes: number
  likedBy: string[]
  dislikedBy: string[]
}
