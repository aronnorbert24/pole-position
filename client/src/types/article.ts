export interface Article {
  _id: string
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
