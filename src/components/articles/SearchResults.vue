<template>
  <div class="mt-10 computer:ml-auto computer:mr-10 computer:w-3/5">
    <TitleSeparator title="Search Results" />
    <div class="mb-5 rounded-xl bg-white text-center">
      <ul>
        <li v-for="(article, index) in getSearchedArticles" :key="index">
          <ArticlePreview :article="article" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../../stores/ArticleStore';
import ArticlePreview from './PreviewArticle.vue'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'

const { getSearchedArticles } = storeToRefs(useArticleStore())

</script>
