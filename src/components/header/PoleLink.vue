<template>
  <RedRectangle />
  <div class="ml-40 mr-5 flex justify-between">
    <div class="flex">
      <div
        class="relative mt-5 h-10 w-10 rounded-full border-2 border-red-600 bg-white transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer"
      >
        <F1Icon class="relative ml-0.5 mt-0.5" />
      </div>
      <div
        class="relative ml-40 mt-5 h-10 w-10 rounded-full border-2 border-red-600 bg-white transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer"
      >
        <F2Icon class="relative ml-0.5 mt-0.5" />
      </div>
      <div
        class="relative ml-40 mt-5 h-10 w-10 rounded-full border-2 border-red-600 bg-white transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer"
      >
        <F3Icon class="relative ml-0.5 mt-0.5" />
      </div>
      <div
        class="relative ml-40 mt-5 h-10 w-10 rounded-full border-2 border-red-600 bg-white transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer"
      >
        <WecIcon class="relative ml-0.5 mt-0.5" />
      </div>
      <div
        class="relative ml-40 mt-5 h-10 w-10 rounded-full border-2 border-red-600 bg-white transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer"
      >
        <MotogpIcon class="relative ml-0.5 mt-0.5" />
      </div>
    </div>
    <div class="flex">
      <button
        class="relative mr-10 mt-4 border-2 border-red-600 transition-transform duration-300 ease-in-out hover:scale-110"
        @click="showCreate"
      >
        Create Article
      </button>
      <p class="text-header relative mr-5 mt-7 rounded-xl text-white" @click="showCreate">Anonymous</p>
      <div class="relative mr-10 mt-5 h-10 w-10 rounded-full border-2 border-red-600 bg-white">
        <PolePositionIcon class="relative ml-0.5 mt-0.5 h-8 w-8" />
      </div>
      <button
        class="relative mr-5 mt-4 border-2 border-red-600 transition-transform duration-300 ease-in-out hover:scale-110"
      >
        Log Out
      </button>
    </div>
  </div>
  <RedRectangle class="computer:hidden" />
</template>

<script setup lang="ts">
import F1Icon from '../icons/F1Icon.vue'
import F2Icon from '../icons/F2Icon.vue'
import F3Icon from '../icons/F3Icon.vue'
import WecIcon from '../icons/WecIcon.vue'
import MotogpIcon from '../icons/MotogpIcon.vue'
import PolePositionIcon from '../icons/PolePositionIcon.vue'
import RedRectangle from '../baseComponents/RedLinkRectangle.vue'

const emit = defineEmits(['showCreate'])

function showCreate() {
  emit('showCreate')
}
</script>
