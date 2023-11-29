<template>
  <div class="mt-10" v-for="category in categories" :key="category.title">
    <div class="computer:ml-auto computer:mr-10 computer:w-3/5">
    <RouterLink :to="`/category/${category.title}`"><TitleSeparator :title="category.title" /></RouterLink>
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

const { getArticlesByCategory } = useArticleStore()


const categories = [
  {
    category: getArticlesByCategory('F1'),
    title: 'F1',
  },
  {
    category: getArticlesByCategory('F2'),
    title: 'F2',
  },
  {
    category: getArticlesByCategory('F3'),
    title: 'F3',
  },
  {
    category: getArticlesByCategory('WEC'),
    title: 'WEC',
  },
  {
    category: getArticlesByCategory('MotoGP'),
    title: 'MotoGP',
  },
]
</script>
