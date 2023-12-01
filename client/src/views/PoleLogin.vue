<template>
    <div class="h-screen w-screen flex-col bg-gradient-to-br from-red-600 to-red-300 pt-10 font-header">
      <div class="ml-auto mr-auto h-1/6 w-1/2 items-center justify-center rounded-3xl bg-yellow-50">
        <p class="pt-8 text-xl font-semibold leading-10 phone:pt-10 phone:text-xl">Welcome to Pole Position!</p>
      </div>
      <div class="m-auto mt-10 h-2/5 justify-center rounded-3xl bg-yellow-50 phone:w-8/12 computer:w-4/12">
        <p class="ml-auto mr-auto w-full pt-4 text-3xl font-semibold">Login</p>
  
        <UserInput type="text" label="Username:" property="username" />
        <UserInput type="password" label="Password:" property="password" />
        <ErrorMessage :error="errorMessage" /> 
        <button
          class="mt-10 h-10 w-10/12 rounded-3xl border-none bg-gradient-to-br from-red-600 to-red-300 font-semibold text-white transition-transform duration-500 ease-in-out hover:scale-110"
          @click="login"
        >
          Login
        </button>
        <p class="mt-6 font-priority text-sm font-medium">
          You don't have an <strong>account?</strong> <RouterLink href="#" to="/pole-position/register">Sign up</RouterLink> now!
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '../stores/UserStore'
  import { RouterLink, useRouter } from 'vue-router'
  import { loginUser } from '../services/authentication'
  import UserInput from '../components/baseComponents/UserInput.vue'
  import ErrorMessage from '../components/baseComponents/ErrorMessage.vue'
  
  const { getNewUsername, getNewPassword } = storeToRefs(useUserStore())
  
  const errorMessage = ref('')
  
  const router = useRouter()
  
  async function login() {
    if (!isInputValid()) {
      return
    }
  
    try {
      await loginUser(getNewUsername.value, getNewPassword.value)
      router.go(-1)
    } catch (error: any) {
      console.error('Register Error', error)
      errorMessage.value = error.response.data
    }
  }
  
  function isInputValid() {
      if (getNewUsername.value.trim() === '' || getNewPassword.value.trim() === '') {
      errorMessage.value = 'Please fill in every field.'
      return false
    }
  
    if (getNewUsername.value.length < 3) {
      errorMessage.value = 'Username must be at least 3 characters'
      return false
    }
  
    if (getNewPassword.value.length < 8) {
      errorMessage.value = 'Password must be at least 8 characters long.'
      return false
    }
  
    return true
  }
  </script>