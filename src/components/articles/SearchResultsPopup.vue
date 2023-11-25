<template>
  <div
    class="absolute left-20 top-12 z-50 m-auto ml-96 h-fit w-6/12 rounded-2xl border-2 border-black bg-white p-2 phone:left-0 phone:top-6 phone:ml-4 phone:w-11/12"
  >
    <p
      class="text-right text-2xl font-semibold text-black transition-transform duration-300 ease-in-out hover:cursor-pointer hover:text-gray-400"
      @click="toggleSearchBar"
    >
      X
    </p>
    <PoleSearch />
    <div>
      <EmptySearchResult v-if="getSearchedArticlesPopup.length === 0" title="Search Results" />
      <div v-if="getSearchedArticlesPopup.length" class="mb-5 rounded-xl bg-white text-center">
        <ArticlesByCategory
          class="computer:mr-auto computer:w-9/12"
          :articles="getSearchedArticlesPopup"
          title="Search Results"
          @showArticle="showArticle"
        />
      </div>
    </div>

    <button
      v-if="getSearchedArticlesPopup.length > 3"
      class="bg-gray-300 text-center text-lg font-semibold text-black transition-transform duration-300 ease-in-out hover:cursor-pointer hover:border-0 hover:bg-red-600 hover:text-white"
      @click="showSearchedArticles"
    >
      See more
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../../stores/ArticleStore'
import ArticlesByCategory from './ArticlesByCategory.vue'
import EmptySearchResult from './EmptySearchResult.vue'
import PoleSearch from './PoleSearch.vue'
import { Article } from '../../types/article.ts'

const { getSearchedArticlesPopup } = storeToRefs(useArticleStore())

interface Props {
  articles: Article[]
  title: string
  length: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'showArticle', article: Article): void
  (e: 'showSearchedArticles'): void
  (e: 'searchArticles', searchQuery: string): void
  (e: 'toggleSearchBar'): void
}>()

function showArticle(article: Article) {
  emit('showArticle', article)
}
function showSearchedArticles() {
  emit('showSearchedArticles')
}

function toggleSearchBar() {
  emit('toggleSearchBar')
}
</script>
