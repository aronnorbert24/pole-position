<template>
  <div class="flex">
    <RouterLink v-if="getIsUserAdmin" to="/pole-position/create-article"
      ><ButtonLink text="Create Article" class="ml-7 mr-6 tablet:ml-24 tabletLandscape:ml-16"
    /></RouterLink>
    <div class="flex tablet:ml-auto tablet:mr-6 tabletLandscape:ml-auto tabletLandscape:mr-8">
      <p class="text-header relative mr-3 mt-7 text-sm text-white">{{ getNewUsername }}</p>
      <div class="relative mr-6 mt-5 h-10 w-10 rounded-full border-2 border-red-600 bg-white">
        <img class="rounded-full" :src="`${getUserPicture}`" alt="Profile Picture">
      </div>
    </div>
    <RouterLink v-if="!getIsUserLoggedIn" to="/pole-position/login"><ButtonLink class="mr-7 tablet:mr-24 tabletLandscape:mr-20" text="Log In" /></RouterLink>
    <ButtonLink v-if="getIsUserLoggedIn" class="mr-7 tablet:mr-24 tabletLandscape:mr-20" text="Log Out" @click="logoutUser" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '../../stores/UserStore';
import ButtonLink from './ButtonLink.vue'

const { getIsUserLoggedIn, getNewUsername, getUserPicture, getIsUserAdmin } = useUserStore()


const emit = defineEmits(['showLogout'])

function logoutUser() {
  emit('showLogout')
}

</script>
