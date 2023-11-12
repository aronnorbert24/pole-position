<template>
  <div v-for="category in categories" :key="category.title">
    <ArticlesByCategory
      :title="category.title"
      :articles="category.category"
      @showArticle="showArticle"
      @showArticlesByCategory="showArticlesByCategory"
    />
  </div>
</template>

<script setup lang="ts">
import ArticlesByCategory from './ArticlesByCategory.vue'
import { Article } from '../../types/article.ts'

interface Props {
  f1Articles: Article[]
  f2Articles: Article[]
  f3Articles: Article[]
  wecArticles: Article[]
  motogpArticles: Article[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'showArticlesByCategory', title: string): void
  (e: 'showArticle', article: Article): void
}>()

const f1 = props.f1Articles

const categories = [
  {
    category: f1,
    title: 'F1',
  },
  {
    category: props.f2Articles,
    title: 'F2',
  },
  {
    category: props.f3Articles,
    title: 'F3',
  },
  {
    category: props.wecArticles,
    title: 'WEC',
  },
  {
    category: props.motogpArticles,
    title: 'MotoGP',
  },
]

function showArticlesByCategory(title: string) {
  emit('showArticlesByCategory', title)
}

function showArticle(article: Article) {
  emit('showArticle', article)
}
</script>
