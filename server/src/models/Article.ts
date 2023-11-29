import mongoose from 'mongoose'

export interface Article {
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

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  subheading: {
    type: String,
    required: true,
  },

  separatedText: [{
    type: String,
    required: true,
  }],

  image: String,

  category: {
    type: String,
    required: true,
  },

  datePublished: {
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

  views: {
    type: Number,
    default: 0,
    required: true,
  },
})

export default mongoose.model<Article>('articles', articleSchema)