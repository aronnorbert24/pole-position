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
        <div class="mt-10 computer:ml-auto computer:mr-10 computer:w-3/5">
          <RouterLink to="/search"><TitleSeparator title="Search Results" @click="toggleSearchBar"/></RouterLink>
          <div class="mb-5 rounded-xl bg-white text-center">
            <ul>
              <li v-for="(article, index) in getSearchedArticlesPopup" :key="index">
                <ArticlePreview :article="article" />
              </li>
            </ul>
          </div>
  </div>
      </div>
    </div>

    <RouterLink to="/search"
      v-if="getSearchedArticlesPopup.length > 3"
      class="bg-gray-300 text-center text-lg font-semibold text-black transition-transform duration-300 ease-in-out hover:cursor-pointer hover:border-0 hover:bg-red-600 hover:text-white"
      @click="toggleSearchBar"
    >
      See more
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../../stores/ArticleStore'
import ArticlePreview from './PreviewArticle.vue'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'
import EmptySearchResult from './EmptySearchResult.vue'
import PoleSearch from './PoleSearch.vue'

const { getSearchedArticlesPopup } = storeToRefs(useArticleStore())

const emit = defineEmits<{
  (e: 'toggleSearchBar'): void
}>()

function toggleSearchBar() {
  emit('toggleSearchBar')
}
</script>
