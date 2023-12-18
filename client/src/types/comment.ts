export interface Comment {
  articleId: string
  userId: string
  username: string
  userPicture: string
  parentId: string
  replies: Comment[]
  _id: string
  body: string
  date: Date
  likes: number
  likedBy: string[]
}
