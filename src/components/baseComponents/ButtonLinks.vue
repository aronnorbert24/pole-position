<template>
  <div class="flex">
    <ButtonLink text="Create Article" class="tablet:ml-24 tabletLandscape:ml-16 ml-7 mr-6" @click="showCreate" />
    <div class="tablet:mr-6 tablet:ml-auto tabletLandscape:ml-auto tabletLandscape:mr-8 flex">
      <p class="text-header relative mr-3 mt-7 text-sm text-white" @click="showCreate">Anonymous</p>
      <div class="relative mr-6 mt-5 h-10 w-10 rounded-full border-2 border-red-600 bg-white">
        <PolePositionIcon class="relative ml-0.5 mt-0.5 h-8 w-8" />
      </div>
    </div>
    <ButtonLink class="tablet:mr-24 tabletLandscape:mr-20 mr-7" text="Log Out" />
  </div>
</template>

<script setup lang="ts">
import PolePositionIcon from '../icons/PolePositionIcon.vue'
import ButtonLink from './ButtonLink.vue'

const emit = defineEmits(['showCreate'])

function showCreate() {
  emit('showCreate')
}
</script>
