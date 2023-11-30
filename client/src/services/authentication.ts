import axios from 'axios'

export async function loginUser(email: string, password: string) {
  try {
    await axios.post('/login', {
      email,
      password,
    })
  } catch (error) {
    console.error(error)
  }
}