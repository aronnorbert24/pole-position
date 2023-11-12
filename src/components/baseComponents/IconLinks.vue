<template>
  <div class="flex gap-x-40">
    <div v-for="category in categories" :key="category.title">
      <component :is="category.icon" class="bg-white" @click="showArticlesByCategory(category.title)"></component>
    </div>
    <SearchIcon @click="showSearchBar" />
  </div>
</template>

<script setup lang="ts">
import F1Icon from '../icons/F1Icon.vue'
import F2Icon from '../icons/F2Icon.vue'
import F3Icon from '../icons/F3Icon.vue'
import WecIcon from '../icons/WecIcon.vue'
import MotogpIcon from '../icons/MotogpIcon.vue'
import SearchIcon from '../icons/SearchIcon.vue'

const emit = defineEmits<{
  (e: 'showArticlesByCategory', title: string): void
  (e: 'showSearchBar'): void
}>()

const categories = [
  {
    icon: F1Icon,
    title: 'F1',
  },
  {
    icon: F2Icon,
    title: 'F2',
  },
  {
    icon: F3Icon,
    title: 'F3',
  },
  {
    icon: WecIcon,
    title: 'WEC',
  },
  {
    icon: MotogpIcon,
    title: 'MotoGP',
  },
]

function showArticlesByCategory(title: string) {
  emit('showArticlesByCategory', title)
}

function showSearchBar() {
  emit('showSearchBar')
}
</script>
