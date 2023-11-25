<template>
  <div class="mb-12 mt-10 phone:mt-24">
    <TitleSeparator title="Trending" />
    <div class="h-fit bg-white text-left">
      <div
        v-for="(article, index) in getTrendingArticles"
        :key="index"
        class="py-1 transition-transform duration-300 ease-in-out hover:cursor-pointer hover:bg-slate-400 hover:underline"
        @click="showArticle(article)"
      >
        <p class="text-md px-2 font-medium text-red-600">{{ article.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../../stores/ArticleStore'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'
import { Article } from '../../types/article.ts'

const { getTrendingArticles } = storeToRefs(useArticleStore())

const emit = defineEmits<{
  (e: 'showArticle', article: Article): void
}>()

function showArticle(article: Article) {
  emit('showArticle', article)
}
</script>
