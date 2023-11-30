import axios from 'axios'
import { User } from '../types/user'

export async function loginUser(username: string, password: string) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, {
      username,
      password,
    })

    localStorage.setItem('username', response.data.username)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function registerUser(data: User) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, {
      firstName: data.username,
      email: data.email,
      password: data.password,
    })
    localStorage.setItem('username', response.data.username)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}