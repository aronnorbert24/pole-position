<template>
  <div class="flex h-56 w-full">
    <PolePosition
      class="m-5 rounded-full border-2 border-red-600 transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:scale-100 computer:scale-110"
      @click="showHome"
    />
  </div>
</template>
<script setup lang="ts">
import PolePosition from '../icons/PolePositionIcon.vue'

const emit = defineEmits(['showHome'])

function showHome() {
  emit('showHome')
}
</script>
