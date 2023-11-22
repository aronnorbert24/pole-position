<template>
  <RedRectangle class="phone:mt-44 tablet:mt-60" />
  <div class="ml-40 mr-5 flex justify-between phone:ml-4 tablet:ml-20 tabletLandscape:ml-16">
    <IconLinks @showArticlesByCategory="showArticlesByCategory" @showSearchBar="showSearchBar" />
    <ButtonLinks class="hidden computer:flex" @showCreate="showCreate" />
  </div>
  <RedRectangle class="tablet:top-3 tablet:mt-72 tabletLandscape:top-3 tabletLandscape:mt-72 computer:hidden" />
  <ButtonLinks class="computer:hidden" @showCreate="showCreate" />
</template>

<script setup lang="ts">
import RedRectangle from '../baseComponents/RedLinkRectangle.vue'
import ButtonLinks from '../baseComponents/ButtonLinks.vue'
import IconLinks from '../baseComponents/IconLinks.vue'

const emit = defineEmits<{
  (e: 'showCreate'): void
  (e: 'showArticlesByCategory', title: string): void
  (e: 'showSearchBar'): void
}>()

function showCreate() {
  emit('showCreate')
}
function showArticlesByCategory(title: string) {
  emit('showArticlesByCategory', title)
}
function showSearchBar() {
  emit('showSearchBar')
}
</script>
