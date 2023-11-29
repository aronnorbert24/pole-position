<template>
  <div class="flex">
    <RouterLink to="/create-article"
      ><ButtonLink text="Create Article" class="ml-7 mr-6 tablet:ml-24 tabletLandscape:ml-16" @click="showCreate"
    /></RouterLink>
    <div class="flex tablet:ml-auto tablet:mr-6 tabletLandscape:ml-auto tabletLandscape:mr-8">
      <p class="text-header relative mr-3 mt-7 text-sm text-white" @click="showCreate">Anonymous</p>
      <div class="relative mr-6 mt-5 h-10 w-10 rounded-full border-2 border-red-600 bg-white">
        <PolePositionIcon class="relative ml-0.5 mt-0.5 h-8 w-8" />
      </div>
    </div>
    <ButtonLink class="mr-7 tablet:mr-24 tabletLandscape:mr-20" text="Log Out" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PolePositionIcon from '../icons/PolePositionIcon.vue'
import ButtonLink from './ButtonLink.vue'

const emit = defineEmits(['showCreate'])

function showCreate() {
  emit('showCreate')
}
</script>
