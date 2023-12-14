<template>
  <div class="mt-36 bg-red-600 px-16 pb-4 align-bottom phone:px-4">
    <div class="flex justify-between">
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
      >
        <p class="mt-6 text-lg font-semibold text-white phone:hidden">F1</p>
        <F1Icon class="ml-4 bg-white phone:ml-8" @click="getArticlesByCategory('F1')" />
      </div>
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
      >
        <p class="mt-6 text-lg font-semibold text-white phone:hidden">F2</p>
        <F2Icon class="ml-4 bg-white" @click="getArticlesByCategory('F2')" />
      </div>
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
      >
        <p class="mt-6 text-lg font-semibold text-white phone:hidden">F3</p>
        <F3Icon class="ml-4 bg-white phone:mr-10" @click="getArticlesByCategory('F3')" />
      </div>
    </div>
    <div class="mt-10 flex justify-between">
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
      >
        <p class="mt-6 text-lg font-semibold text-white phone:hidden">WEC</p>
        <WecIcon class="ml-4 bg-white" @click="getArticlesByCategory('WEC')" />
      </div>
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
      >
        <p class="mt-6 text-lg font-semibold text-white phone:hidden">MotoGP</p>
        <MotogpIcon class="ml-4 bg-white phone:mr-10" @click="getArticlesByCategory('MotoGP')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useArticleStore } from '../../stores/ArticleStore'
import F1Icon from '../icons/F1Icon.vue'
import F2Icon from '../icons/F2Icon.vue'
import F3Icon from '../icons/F3Icon.vue'
import WecIcon from '../icons/WecIcon.vue'
import MotogpIcon from '../icons/MotogpIcon.vue'

const router = useRouter()
const articleStore = useArticleStore()

function getArticlesByCategory(category: string) {
  try {
    articleStore.getArticlesByCategory(category)
    router.push({path: `/pole-position/category/${category}`})    
  } catch (error) {
    console.error(error)
    throw error
  }
}

</script>
