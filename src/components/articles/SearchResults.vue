<template>
  <div>
    <ArticlesByCategory :articles="articles" :title="title" @showArticle="showArticle" />
  </div>
</template>

<script setup lang="ts">
import ArticlesByCategory from './ArticlesByCategory.vue'
import { Article } from '../../types/article.ts'

interface Props {
  articles: Article[]
  title: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'showArticle', article: Article): void
}>()

function showArticle(article: Article) {
  emit('showArticle', article)
}
</script>
