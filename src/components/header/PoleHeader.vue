<template>
  <div class="flex h-56 w-full">
    <PolePosition
      class="m-5 rounded-full border-2 border-red-600 transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:scale-100 computer:scale-110"
      @click="showHome"
    />
    <Championship
      class="m-5 ml-auto rounded-full border-2 border-red-600 transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:scale-100 computer:scale-110"
      @click="showPopup"
    />
  </div>
</template>
<script setup lang="ts">
import PolePosition from '../icons/PolePositionIcon.vue'
import Championship from '../icons/ChampionshipIcon.vue'

const emit = defineEmits(['showHome'])

function showHome() {
  emit('showHome')
}
</script>
