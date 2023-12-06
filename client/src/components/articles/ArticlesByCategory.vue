<template>
  <div class="mt-10 computer:ml-auto computer:mr-10 computer:w-3/5">
    <TitleSeparator :title="route.params.id" />
    <div class="mb-5 rounded-xl bg-white text-center">
      <ul>
        <li v-for="(article, index) in articleStore.getArticlesByCategory(route.params.id)" :key="index">
          <ArticlePreview :article="article"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useArticleStore } from '../../stores/ArticleStore';
import ArticlePreview from './PreviewArticle.vue'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'

const route = useRoute()
const articleStore = useArticleStore()


</script>
