<template>
  <div class="mt-10">
    <TitleSeparator title="Trending" />
    <div class="h-fit bg-white text-left">
      <div
        v-for="(article, index) in trending"
        :key="index"
        class="py-1 transition-transform duration-300 ease-in-out hover:cursor-pointer hover:bg-slate-400 hover:underline"
      >
        <p class="text-md px-2 font-medium text-red-600">{{ article.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleSeparator from '../baseComponents/TitleSeparator.vue'
import Article from '../../types/article.ts'

interface Props {
  trending: Article[]
}

const props = defineProps<Props>()
</script>
