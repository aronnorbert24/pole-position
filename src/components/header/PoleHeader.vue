<template>
  <div class="z-0 mb-16 flex w-full justify-between phone:mb-0">
    <div class="m-5 flex justify-between">
      <PolePositionIcon
        class="scale-110 rounded-full border-2 border-red-600 bg-white transition-transform duration-300 ease-in-out hover:cursor-pointer phone:scale-100 computer:hover:scale-125"
        @click="showHome"
      />
    </div>
    <div class="flex justify-between">
      <ChampionshipIcon
        class="m-5 scale-110 rounded-2xl border-2 border-red-600 transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:scale-100"
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
