<template>
  <div class="mt-10" v-for="category in categories" :key="category.title">
    <div class="computer:ml-auto computer:mr-10 computer:w-3/5">
    <RouterLink :to="`/pole-position/category/${category.title}`"><TitleSeparator :title="category.title" /></RouterLink>
    <div class="mb-5 rounded-xl bg-white text-center">
      <ul>
        <li v-for="(article, index) in category.category" :key="index">
          <ArticlePreview :article="article"/>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from '../../stores/ArticleStore'
import TitleSeparator from '../baseComponents/TitleSeparator.vue';
import ArticlePreview from './PreviewArticle.vue';

const articleStore = useArticleStore()


const categories = [
  {
    category: articleStore.getArticlesByCategory('F1').slice(0, 3),
    title: 'F1',
  },
  {
    category: articleStore.getArticlesByCategory('F2').slice(0, 3),
    title: 'F2',
  },
  {
    category: articleStore.getArticlesByCategory('F3').slice(0, 3),
    title: 'F3',
  },
  {
    category: articleStore.getArticlesByCategory('WEC').slice(0, 3),
    title: 'WEC',
  },
  {
    category: articleStore.getArticlesByCategory('MotoGP').slice(0, 3),
    title: 'MotoGP',
  },
]
</script>
