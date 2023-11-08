<template>
  <div class="relative z-50 mt-4 flex w-screen">
    <div class="ml-14 h-16 w-5/12 rounded-2xl bg-white py-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search here for an article..."
        class="mx-auto h-10 w-4/12 rounded-3xl bg-gray-300 pl-2"
        @input="liveSearch"
        @keyup.enter="submitSearch"
      />
      <button class="ml-28 bg-gray-300 text-black hover:border-black hover:bg-red-600 phone:ml-3" @click="submitSearch">
        Search
      </button>
    </div>
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
