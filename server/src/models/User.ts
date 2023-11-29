import mongoose from 'mongoose'

export interface User {
  username: string
  password: string
  email: string
  userPicture: string
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  userPicture: String,
})

export default mongoose.model<User>('users', userSchema)