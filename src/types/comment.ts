export interface Comment {
  articleId: string
  userId: string
  parentId: string
  commentId: string
  body: string
  date: string
  likes: number
  dislikes: number
}
