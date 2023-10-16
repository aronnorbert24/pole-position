<template>
  <div class="flex pb-3">
    <img class="ml-5 mr-5" :src="article.image" width="100" />
    <div class="ml-5 mt-5 flex-col text-left">
      <p class="text-ellipsis text-2xl font-semibold text-red-600">{{ previewTitle }}</p>
      <p class="text-ellipsis text-lg text-black">{{ previewText }}...</p>
    </div>
  </div>
  <div></div>
</template>

<script setup lang="ts">
import { Article } from '../../types/article.ts'

interface Props {
  article: Article
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'likedArticle', likes: number, date: Date): void
}>()

const previewTitle = props.article.title.slice(0, 100)
const previewText = props.article.text.slice(0, 100)
</script>
