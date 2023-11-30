import { defineStore } from 'pinia'
import { User } from '../types/user'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      userId: '12345',
      username: 'Anonymous',
      password: 'qwertyqwerty',
      email: 'qwerty@qwerty.com',
      userPicture:
        'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd',
    } as User,
    newUsername: '',
    newPassword: '',
    newEmail: '',
    newUserPicture: '',
    isLoggedIn: false,
  }),
  actions: {
    updateProperty(property: string, value: string) {
      if (property === 'username') {
        this.newUsername = value
      } else if (property === 'password') {
        this.newPassword = value
      } else if (property === 'email') {
        this.newEmail = value
      } else if (property === 'userPicture') {
        this.newUserPicture = value
      }
    }
  }
})
