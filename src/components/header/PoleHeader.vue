<template>
  <div class="flex justify-between mb-16 w-full">
    <div class="justify-between flex m-5">
      <PolePositionIcon
        class="rounded-full bg-white border-2 border-red-600 transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:scale-100 scale-110"
        @click="showHome"
      />
    </div>
      <div class="justify-between flex">
      <ChampionshipIcon
        class="m-5 rounded-2xl border-2 border-red-600 transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:scale-100 scale-110"
        @click="showPopup"
      />
      </div>
  </div>
</template>
<script setup lang="ts">
import PolePositionIcon from '../icons/PolePositionIcon.vue'
import ChampionshipIcon from '../icons/ChampionshipIcon.vue'

const emit = defineEmits(['showHome', 'showPopup'])

function showHome() {
  emit('showHome')
}

function showPopup() {
  emit('showPopup')
}
</script>
