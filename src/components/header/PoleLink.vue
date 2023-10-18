<template>
  <RedRectangle />
  <div class="ml-40 mr-5 flex justify-between phone:ml-8">
    <IconLinks @showArticlesByCategory="showArticlesByCategory" />
    <ButtonLinks class="phone:hidden" @showCreate="showCreate" />
  </div>
  <RedRectangle class="computer:hidden" />
  <ButtonLinks class="computer:hidden" @showCreate="showCreate" />
</template>

<script setup lang="ts">
import RedRectangle from '../baseComponents/RedLinkRectangle.vue'
import ButtonLinks from '../baseComponents/ButtonLinks.vue'
import IconLinks from '../baseComponents/IconLinks.vue'

const emit = defineEmits<{
  (e: 'showCreate'): void
  (e: 'showArticlesByCategory', title: string): void
}>()

function showCreate() {
  emit('showCreate')
}
function showArticlesByCategory(title: string) {
  emit('showArticlesByCategory', title)
}
</script>
