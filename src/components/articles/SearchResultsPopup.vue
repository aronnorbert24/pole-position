<template>
  <div class="relative z-50 mt-10 w-screen phone:mt-4">
    <div class="ml-14 w-5/12 rounded-2xl bg-white p-4 phone:ml-6 phone:w-9/12">
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
      <button
        v-if="length > 3"
        class="bg-gray-300 text-center text-lg font-semibold text-black transition-transform duration-300 ease-in-out hover:cursor-pointer hover:border-0 hover:bg-red-600 hover:text-white"
        @click="showSearchedArticles"
      >
        See more
      </button>
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
  length: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'showArticle', article: Article): void
  (e: 'showSearchedArticles'): void
}>()

function showArticle(article: Article) {
  emit('showArticle', article)
}
function showSearchedArticles(article: Article) {
  emit('showSearchedArticles', article)
}
</script>
