<template>
  <div class="mt-10" v-for="category in categories" :key="category.title">
    <ArticlesByCategory
      :title="category.title"
      :articles="category.category"
      @showArticle="showArticle"
      @showArticlesByCategory="showArticlesByCategory"
    />
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from '../../stores/ArticleStore'
import ArticlesByCategory from './ArticlesByCategory.vue'
import { Article } from '../../types/article.ts'

const emit = defineEmits<{
  (e: 'showArticlesByCategory', title: string): void
  (e: 'showArticle', article: Article): void
}>()

const { getArticlesByCategory } = useArticleStore()

const categories = [
  {
    category: getArticlesByCategory('F1'),
    title: 'F1',
  },
  {
    category: getArticlesByCategory('F2'),
    title: 'F2',
  },
  {
    category: getArticlesByCategory('F3'),
    title: 'F3',
  },
  {
    category: getArticlesByCategory('WEC'),
    title: 'WEC',
  },
  {
    category: getArticlesByCategory('MotoGP'),
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
