<template>
  <div class="flex">
    <F1Icon class="bg-white" @click="showArticlesByCategory('F1')" />
    <F2Icon class="ml-40 bg-white" @click="showArticlesByCategory('F2')" />
    <F3Icon class="ml-40 bg-white" @click="showArticlesByCategory('F3')" />
    <WecIcon class="ml-40 bg-white" @click="showArticlesByCategory('WEC')" />
    <MotogpIcon class="ml-40 bg-white" @click="showArticlesByCategory('MotoGP')" />
  </div>
</template>

<script setup lang="ts">
import F1Icon from '../icons/F1Icon.vue'
import F2Icon from '../icons/F2Icon.vue'
import F3Icon from '../icons/F3Icon.vue'
import WecIcon from '../icons/WecIcon.vue'
import MotogpIcon from '../icons/MotogpIcon.vue'

const emit = defineEmits<{
  (e: 'showArticlesByCategory', title: string): void
}>()

function showArticlesByCategory(title: string) {
  emit('showArticlesByCategory', title)
}
</script>
