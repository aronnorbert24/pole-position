export interface Comment {
  articleId: number
  userId: string
  username: string
  userPicture: string
  parentId: number
  replies: Comment[]
  commentId: number
  body: string
  date: Date
  likes: number
  likedBy: string[]
}
