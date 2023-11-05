<template>
  <div class="mt-36 w-full bg-red-600 px-16 pb-4 align-bottom">
    <div class="flex justify-between">
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
        @click="showArticlesByCategory('F1')"
      >
        <p class="mt-6 text-lg font-semibold text-white">F1</p>
        <F1Icon class="ml-4 bg-white" />
      </div>
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
        @click="showArticlesByCategory('F2')"
      >
        <p class="mt-6 text-lg font-semibold text-white">F2</p>
        <F2Icon class="ml-4 bg-white" />
      </div>
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
        @click="showArticlesByCategory('F3')"
      >
        <p class="mt-6 text-lg font-semibold text-white">F3</p>
        <F3Icon class="ml-4 bg-white" />
      </div>
    </div>
    <div class="mt-10 flex justify-between">
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
        @click="showArticlesByCategory('WEC')"
      >
        <p class="mt-6 text-lg font-semibold text-white">WEC</p>
        <WecIcon class="ml-4 bg-white" />
      </div>
      <div
        class="flex transition-transform duration-300 ease-in-out hover:cursor-pointer"
        @click="showArticlesByCategory('MotoGP')"
      >
        <p class="mt-6 text-lg font-semibold text-white">MotoGP</p>
        <MotogpIcon class="ml-4 bg-white" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import F1Icon from '../icons/F1Icon.vue'
import F2Icon from '../icons/F2Icon.vue'
import F3Icon from '../icons/F3Icon.vue'
import WecIcon from '../icons/WecIcon.vue'
import MotogpIcon from '../icons/MotogpIcon.vue'

const emit = defineEmits<{
  (e: 'showArticlesByCategory', title: string): void
}>()

function showArticlesByCategory(title: string) {
  emit('showArticlesByCategory', title)
}
</script>
