<template>
  <div class="relative mr-6 mt-10 flex h-10">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search here for an article..."
      class="rounded-3xl bg-white pl-2"
      @input="liveSearch"
      @keyup.enter="submitSearch"
    />
    <button class="ml-28 bg-white text-black hover:border-black hover:bg-red-600 phone:ml-3" @click="submitSearch">
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from '../../helpers/helper.ts'

const emit = defineEmits<{
  (e: 'searchArticles', searchQuery: string): void
}>()

const searchQuery = ref('')

const liveSearch = ref(debounce(submitSearch, 300))

function submitSearch() {
  emit('searchArticles', searchQuery.value)
}
</script>
