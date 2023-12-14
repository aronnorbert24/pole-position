import axios from 'axios'
//import { Comment } from '../types/comment'

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