<template>
  <RedRectangle class="phone:mt-44 tablet:mt-60" />
  <div class="ml-40 mr-5 flex justify-between phone:ml-4 tablet:ml-20 tabletLandscape:ml-16">
    <IconLinks @showSearchBar="showSearchBar" />
    <ButtonLinks class="phone:hidden tablet:hidden flex" @showLogout="showLogout" />
  </div>
  <RedRectangle class="tablet:top-3 tablet:mt-72 computer:hidden tabletLandscape:hidden" />
  <ButtonLinks class="computer:hidden tabletLandscape:hidden" @showLogout="showLogout" />
</template>

<script setup lang="ts">
import RedRectangle from '../baseComponents/RedLinkRectangle.vue'
import ButtonLinks from '../baseComponents/ButtonLinks.vue'
import IconLinks from '../baseComponents/IconLinks.vue'

const emit = defineEmits<{
  (e: 'showSearchBar'): void
  (e: 'showLogout'): void
}>()

function showSearchBar() {
  emit('showSearchBar')
}

function showLogout() {
  emit('showLogout')
}
</script>
