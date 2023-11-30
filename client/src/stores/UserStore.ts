import { defineStore } from 'pinia'
import { User } from '../types/user'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      username: 'Anonymous',
      password: 'qwertyqwerty',
      email: 'qwerty@qwerty.com',
  } as User,
    newUsername: '',
    newPassword: '',
    newEmail: '',
    loggedInUserPicture: '',
    isLoggedIn: false,
    loggedInUserId: '',
  }),
  actions: {
    updateProperty(property: string, value: string) {
      if (property === 'username') {
        this.newUsername = value
      } else if (property === 'password') {
        this.newPassword = value
      } else if (property === 'email') {
        this.newEmail = value
      }
    },
    toggleIsLoggedIn() {
      this.isLoggedIn = !this.isLoggedIn
    }
  }
})
