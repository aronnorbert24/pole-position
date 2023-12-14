<template>
  <div class="mt-10" v-for="category in categories" :key="category.title">
    <div class="computer:ml-auto computer:mr-10 computer:w-3/5">
    <TitleSeparator :title="category.title" @getArticlesByCategory="getArticlesByCategory(category.title)" />
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '../../stores/ArticleStore'
import TitleSeparator from '../baseComponents/TitleSeparator.vue';
import ArticlePreview from './PreviewArticle.vue';

const router = useRouter()
const articleStore = useArticleStore()

const categories = ref<any>([
  {
    category: [],
    title: 'F1',
  },
  {
    category: [],
    title: 'F2',
  },
  {
    category: [],
    title: 'F3',
  },
  {
    category: [],
    title: 'WEC',
  },
  {
    category: [],
    title: 'MotoGP',
  },
])

function getArticlesByCategory(category: string) {
  try {
    articleStore.getArticlesByCategory(category)
    router.push({path: `/pole-position/category/${category}`})    
  } catch (error) {
    console.error(error)
    throw error
  }
}

onMounted(async() => {
  try {
    categories.value[0].category = await articleStore.getArticlesByCategory('F1')
    categories.value[1].category = await articleStore.getArticlesByCategory('F2')
    categories.value[2].category = await articleStore.getArticlesByCategory('F3')
    categories.value[3].category = await articleStore.getArticlesByCategory('WEC')
    categories.value[4].category = await articleStore.getArticlesByCategory('MotoGP')
  } catch (error) {
    console.error(error)
    throw error
  }
})
</script>
