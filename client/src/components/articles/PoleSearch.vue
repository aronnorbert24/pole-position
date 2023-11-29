<template>
  <div class="relative z-50 mt-4 flex w-screen">
    <div class="ml-14 h-16 w-5/12 rounded-2xl bg-white py-3 phone:ml-6 phone:w-9/12">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search here for an article..."
        class="mx-auto h-10 w-4/12 rounded-3xl bg-gray-300 pl-2 phone:w-6/12"
        @input="liveSearch"
        @keyup.enter="search"
      />
      <button class="ml-28 bg-gray-300 text-black hover:border-black hover:bg-red-600 phone:ml-3" @click="search">
        Search
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useArticleStore } from '../../stores/ArticleStore'
import { debounce } from '../../helpers/helper.ts'

const { searchArticles } = useArticleStore()

const searchQuery = ref('')

const liveSearch = ref(debounce(search, 300))

function search() {
  searchArticles(searchQuery.value)
}
</script>
