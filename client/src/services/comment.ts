import axios from 'axios'
import { Comment } from '../types/comment'

export async function getComments() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/comment/getComments/`, {
      })
      localStorage.setItem('comments', JSON.stringify(response.data))
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  export async function getSingleComments(id: string | string[]) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/comment/${id}`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  export async function save(data: Comment) {
    try {
      console.log(data)
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/comment/save`, {
        articleId: data.articleId,
        userId: data.userId,
        username: data.username,
        userPicture: data.userPicture,
        parentId: data.parentId,
        replies: data.replies,
        body: data.body,
        date: data.date,
        likedBy: data.likedBy,
        likes: data.likes,
      })
      localStorage.setItem('commentId', response.data._id)
    } catch (error) {
      console.error(error)
      throw error
    }
  }