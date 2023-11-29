import { defineStore } from 'pinia'
import { User } from '../types/user'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      userId: '12345',
      username: 'Anonymous',
      password: 'qwertyqwerty',
      userPicture:
        'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd',
    } as User,
  }),
})
