export interface Article {
  articleId: number
  title: string
  subheading: string
  separatedText: string[]
  image: string
  category: string
  datePublished: Date
  likedBy: string[]
  likes: number
  views: number
}
