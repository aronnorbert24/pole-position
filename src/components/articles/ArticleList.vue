<template>
  <div>
    <ul>
      <li v-for="article in articles" :key="article.title">
        <ArticlePreview :article="article" @likedArticle="likedArticle" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ArticlePreview from './PreviewArticle.vue'
import Article from '../../types/Article'

interface Props {
  articles: Article[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'likedArticle', likes: number, date: Date): void
}>()

function likedArticle(likes: number, date: Date) {
  emit('likedArticle', likes, date)
}
</script>
