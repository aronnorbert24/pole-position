<template>
  <div class="ml-2 mt-10 w-3/5 phone:w-11/12 computer:ml-auto computer:mr-auto">
    <TitleSeparator title="F1" @showArticlesByCategory="showArticlesByCategory" />
    <div class="mb-12 rounded-xl bg-white text-center">
      <ul>
        <li v-for="(article, index) in f1Articles" :key="index">
          <ArticlePreview :article="article" />
        </li>
      </ul>
    </div>
    <TitleSeparator title="F2" @showArticlesByCategory="showArticlesByCategory" />
    <div class="mb-12 rounded-xl bg-white text-center">
      <ul>
        <li v-for="(article, index) in f2Articles" :key="index">
          <ArticlePreview :article="article" />
        </li>
      </ul>
    </div>
    <TitleSeparator title="F3" @showArticlesByCategory="showArticlesByCategory" />
    <div class="mb-12 rounded-xl bg-white text-center">
      <ul>
        <li v-for="(article, index) in f3Articles" :key="index">
          <ArticlePreview :article="article" />
        </li>
      </ul>
    </div>
    <TitleSeparator title="WEC" @showArticlesByCategory="showArticlesByCategory" />
    <div class="mb-12 rounded-xl bg-white text-center">
      <ul>
        <li v-for="(article, index) in wecArticles" :key="index">
          <ArticlePreview :article="article" />
        </li>
      </ul>
    </div>
    <TitleSeparator title="MotoGP" @showArticlesByCategory="showArticlesByCategory" />
    <div class="mb-12 rounded-xl bg-white text-center">
      <ul>
        <li v-for="(article, index) in motogpArticles" :key="index">
          <ArticlePreview :article="article" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticlePreview from './PreviewArticle.vue'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'
import { Article } from '../../types/article.ts'

interface Props {
  f1Articles: Article[]
  f2Articles: Article[]
  f3Articles: Article[]
  wecArticles: Article[]
  motogpArticles: Article[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'showArticlesByCategory', title: string): void
}>()

function showArticlesByCategory(title: string) {
  emit('showArticlesByCategory', title)
}
</script>
