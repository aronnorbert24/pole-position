<template>
  <div class="z-0 mb-16 flex w-full justify-between phone:mb-0">
    <div class="m-5 flex justify-between phone:ml-2">
      <PolePositionIcon
        class="scale-110 rounded-full border-2 border-red-600 bg-white transition-transform duration-300 ease-in-out hover:cursor-pointer phone:scale-100 computer:hover:scale-125"
        @click="showHome"
      />
    </div>
    <div class="flex justify-between">
      <ChampionshipIcon
        class="my-5 mr-10 scale-110 rounded-2xl border-2 border-red-600 bg-white transition-transform duration-300 ease-in-out hover:cursor-pointer phone:mr-2 phone:scale-100 computer:hover:scale-125"
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
