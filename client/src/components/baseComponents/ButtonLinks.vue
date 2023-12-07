<template>
  <div class="flex">
    <ButtonLink v-if="userStore.getIsUserAdmin" text="Create Article" class="ml-7 mr-6 tablet:ml-24 tabletLandscape:ml-16" @click="createArticle"
    />
    <div class="flex tablet:ml-auto tablet:mr-6 tabletLandscape:ml-auto tabletLandscape:mr-8">
      <p class="text-header relative mr-3 mt-7 text-sm text-white">{{ userStore.getNewUsername }}</p>
      <div class="relative mr-6 mt-5 h-10 w-10 rounded-full border-2 border-red-600 bg-white">
        <img class="rounded-full" :src="`${userStore.getUserPicture}`" alt="Profile Picture">
      </div>
    </div>
    <RouterLink v-if="!userStore.getIsUserLoggedIn" to="/pole-position/login"><ButtonLink class="mr-7 tablet:mr-24 tabletLandscape:mr-20" text="Log In" /></RouterLink>
    <ButtonLink v-if="userStore.getIsUserLoggedIn" class="mr-7 tablet:mr-24 tabletLandscape:mr-20" text="Log Out" @click="logoutUser" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '../../stores/UserStore';
import ButtonLink from './ButtonLink.vue'
import { useArticleStore } from '../../stores/ArticleStore';

const router = useRouter()

const articleStore = useArticleStore()
const userStore = useUserStore()


const emit = defineEmits(['showLogout'])

function logoutUser() {
  emit('showLogout')
}

function createArticle() {
  articleStore.emptyNewArticle()
  router.push({name: 'create'})
}

</script>
