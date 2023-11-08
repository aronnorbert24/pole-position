<template>
  <div class="relative z-50 mt-10 w-screen">
    <div class="ml-14 w-5/12 rounded-2xl bg-white p-4">
      <TitleSeparator class="pt-4" :title="title" />
      <div v-if="articles.length === 0" class="mb-5 h-32 rounded-xl bg-white text-center">
        <p class="pt-12 text-2xl font-semibold text-slate-500">There are no articles including this search term.</p>
      </div>
      <div v-if="articles.length" class="mb-5 rounded-xl bg-white text-center">
        <ul>
          <li v-for="(article, index) in articles" :key="index">
            <ArticlePreview :article="article" @showArticle="showArticle" />
          </li>
        </ul>
      </div>
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
}>()

function showArticle(article: Article) {
  emit('showArticle', article)
}
</script>
