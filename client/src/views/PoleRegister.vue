<template>
    <div class="h-screen w-screen flex-col bg-gradient-to-br from-red-600 to-red-300 pt-10 font-header">
      <div class="ml-auto mr-auto h-1/6 w-1/2 items-center justify-center rounded-3xl bg-yellow-50">
        <p class="pt-8 text-4xl font-semibold leading-10 phone:pt-10 phone:text-xl">Welcome to Pole Position!</p>
      </div>
      <div class="h-2/5 m-auto mt-10 justify-center rounded-3xl bg-yellow-50 phone:w-8/12 computer:w-4/12">
        <p class="ml-auto mr-auto w-full pt-4 text-3xl font-semibold">Register</p>
  
        <UserInput type="text" label="Username:" property="username" />
        <UserInput type="email" label="Email:" property="email" />
        <UserInput type="password" label="Password:" property="password" />
  
        <ErrorMessage :error="errorMessage" />
  
        <button
          class="mt-10 h-10 w-6/12 rounded-3xl border-none bg-gradient-to-br from-red-600 to-red-300 font-semibold text-white transition-transform duration-500 ease-in-out hover:scale-110 phone:mt-5"
          @click="register"
        >
          Register
        </button>
        <p class="mt-4 pb-4 font-priority text-sm font-medium">
          You have an <strong>account?</strong> <RouterLink href="#" to="/pole-position/login">Log in here!</RouterLink>
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { useUserStore } from '../stores/UserStore'
  import md5 from 'md5'
  import UserInput from '../components/baseComponents/UserInput.vue'
  import ErrorMessage from '../components/baseComponents/ErrorMessage.vue'
  import { registerUser } from '../services/authentication'
  
  const userStore = useUserStore()
  
  const errorMessage = ref('')

  const gravatar = computed(() => {
    const hash = md5(userStore.getNewEmail.trim().toLowerCase())
    return `https://www.gravatar.com/avatar/${hash}?d=https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd`
  })
  
 const router = useRouter()
  
  async function register() {
    if (!isInputValid()) {
      return
    }
  
    try {
      await registerUser(userStore.getNewUsername, userStore.getNewPassword, userStore.getNewEmail, gravatar.value)
      router.push({ name: 'dashboard' })
    } catch (error: any) {
      console.error('Register Error', error)
      errorMessage.value = error.response.data
    }
  }
  
  function isInputValid() {  
    if (
      userStore.getNewUsername.trim() === '' ||
      userStore.getNewEmail.trim() === '' ||
      userStore.getNewPassword.trim() === ''
    ) {
      errorMessage.value = 'Please fill in every field.'
      return false
    }
  
    if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(userStore.getNewEmail)) {
      errorMessage.value = 'Please enter a valid email address'
      return false
    }

    if (userStore.getNewUsername.length < 3) {
      errorMessage.value = 'Username must be at least 3 characters long.'
      return false
    }
  
    if (userStore.getNewPassword.length < 8) {
      errorMessage.value = 'Password must be at least 8 characters long.'
      return false
    }
  
    return true
  }
  </script>