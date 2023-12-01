<template>
  <div class="mb-12 mt-10 phone:mt-24">
    <TitleSeparator title="Trending" />
    <div class="h-fit bg-white text-left">
      <div
        v-for="(article, index) in getTrendingArticles"
        :key="index"
        class="py-1 transition-transform duration-300 ease-in-out hover:cursor-pointer hover:bg-slate-400 hover:underline"
      >
        <RouterLink :to="`/pole-position/article/${article.articleId}`"><p class="text-md px-2 font-medium text-red-600">{{ article.title }}</p></RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../../stores/ArticleStore'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'

const { getTrendingArticles } = storeToRefs(useArticleStore())
</script>
