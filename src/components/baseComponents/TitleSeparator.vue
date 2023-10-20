<template>
  <div
    class="transition-transform duration-300 ease-in-out hover:cursor-pointer hover:text-red-600"
    @click="showArticlesByCategory()"
  >
    <div class="border-2 border-red-600"></div>
    <p class="mb-5 text-left text-base font-bold">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'showArticlesByCategory', title: string): void
}>()

function showArticlesByCategory() {
  emit('showArticlesByCategory', props.title)
}
</script>
