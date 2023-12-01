import { defineStore } from 'pinia'
import { User } from '../types/user'
import { getItems } from '../helpers/helper'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      username: 'Anonymous',
      password: 'qwertyqwerty',
      email: 'qwerty@qwerty.com',
  } as User,
    newUsername: 'Anonymous',
    newPassword: '',
    newEmail: '',
    userPicture: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd',
    isLoggedIn: false,
    loggedInUserId: '',
  }),
  getters: {
    getNewUsername: (state) => {
      return state.newUsername
    },
    getNewPassword: (state) => {
      return state.newPassword
    },
    getNewEmail: (state) => {
      return state.newEmail
    },
    getUserPicture: (state) => {
      return state.userPicture
    },
    getUserId: (state) => {
      return state.loggedInUserId
    },
    getIsUserLoggedIn: (state) => {
      return state.isLoggedIn
    },
    getIsUserAdmin: (state) => {
      return state.newUsername === 'aronnorbert' && state.newEmail === 'aronnorbert2001@gmail.com' 
    }
    
  },
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
      this.newPassword = ''
    },
    logOutUser() {
      this.loggedInUserId = ''
      this.userPicture = 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd'
      this.toggleIsLoggedIn()
    },
    getItemsFromLocalStorage() {
      this.newUsername = getItems('username') ? getItems('username')! : 'Anonymous'
      this.newEmail = getItems('email')! 
      this.loggedInUserId = getItems('userId')!
      this.userPicture = getItems('userPicture') ? getItems('userPicture')! : 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd'
      if (this.loggedInUserId) {
        this.isLoggedIn = true
      }
    }
  }
})
