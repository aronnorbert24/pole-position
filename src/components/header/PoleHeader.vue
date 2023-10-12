<template>
  <div class="flex">
    <div>
      <PolePosition
        class="m-5 rounded-full border-2 border-red-600 transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:scale-100 computer:scale-110"
        @click="showHome"
      />
    </div>
    <div>
      <ChampionshipIcon
        class="m-5 ml-96 rounded-2xl border-2 border-red-600 transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:scale-100 computer:scale-110"
        @click="showPopup"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import PolePosition from '../icons/PolePositionIcon.vue'
import ChampionshipIcon from './ChampionshipIcon.vue'

const emit = defineEmits(['showHome'])

function showHome() {
  emit('showHome')
}
</script>
