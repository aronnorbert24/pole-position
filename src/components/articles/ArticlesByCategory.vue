<template>
  <div class="mt-10 computer:ml-auto computer:mr-10 computer:w-3/5">
    <TitleSeparator :title="title" @click="showArticlesByCategory(title)" />
    <div class="mb-5 rounded-xl bg-white text-center">
      <ul>
        <li v-for="(article, index) in articles" :key="index">
          <ArticlePreview :article="article" @showArticle="showArticle" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticlePreview from './PreviewArticle.vue'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'
import { Article } from '../../types/article.ts'

interface Props {
  articles: Article[]
  title: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'showArticle', article: Article): void
  (e: 'showArticlesByCategory', title: string): void
}>()

function showArticlesByCategory(title: string) {
  emit('showArticlesByCategory', title)
}

function showArticle(article: Article) {
  emit('showArticle', article)
}
</script>
