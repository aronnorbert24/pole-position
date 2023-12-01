import axios from 'axios'
import { setItems } from '../helpers/helper'

export async function loginUser(username: string, password: string) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, {
      username,
      password,
    })

    setItems(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function registerUser(username: string, password: string, email: string, gravatar: string) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register-user`, {
      username,
      email,
      password,
      userPicture: gravatar
    })
    
    setItems(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}