<template>
  <div class="flex"></div>
  <div>
    <button @click.prevent="likedArticle">{{ article.likes }} Like(s)</button>
  </div>
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

function likedArticle() {
  const updatedLikes = props.article.likes + 1
  emit('likedArticle', updatedLikes, props.article.datePublished)
}
</script>
