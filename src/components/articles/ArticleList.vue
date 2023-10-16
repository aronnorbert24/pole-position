<template>
  <div class="ml-auto mr-auto mt-10 w-3/5">
    <TitleSeparator title="Formula 1" />
    <div class="mb-12 rounded-xl bg-white text-center">
      <ul>
        <li v-for="article in f1Articles" :key="article.datePublished">
          <ArticlePreview :article="article" @likedArticle="likedArticle" />
        </li>
      </ul>
    </div>
    <TitleSeparator title="Formula 2" />
    <div class="mb-12 rounded-xl bg-white text-center">
      <ul>
        <li v-for="article in f2Articles" :key="article.datePublished">
          <ArticlePreview :article="article" @likedArticle="likedArticle" />
        </li>
      </ul>
    </div>
    <TitleSeparator title="Formula 3" />
    <div class="mb-12 rounded-xl bg-white text-center">
      <ul>
        <li v-for="article in f3Articles" :key="article.datePublished">
          <ArticlePreview :article="article" @likedArticle="likedArticle" />
        </li>
      </ul>
    </div>
    <TitleSeparator title="WEC" />
    <div class="mb-12 rounded-xl bg-white text-center">
      <ul>
        <li v-for="article in wecArticles" :key="article.datePublished">
          <ArticlePreview :article="article" @likedArticle="likedArticle" />
        </li>
      </ul>
    </div>
    <TitleSeparator title="MotoGP" />
    <div class="mb-12 rounded-xl bg-white text-center">
      <ul>
        <li v-for="article in motogpArticles" :key="article.datePublished">
          <ArticlePreview :article="article" @likedArticle="likedArticle" />
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
  (e: 'likedArticle', likes: number, date: Date): void
}>()

function likedArticle(likes: number, date: Date) {
  emit('likedArticle', likes, date)
}
</script>
