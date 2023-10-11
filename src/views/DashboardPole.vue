<template>
  <PoleHeader />
  <button @click="toggleCreate">Create Article</button>
  <CreateArticle v-if="isCreateArticleShowing" :article="article" @saveArticle="saveArticle" />
  <ArticleList :articles="articles" @likedArticle="likedArticle" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateArticle from '../components/articles/CreateArticle.vue'
import ArticleList from '../components/articles/ArticleList.vue'
import PoleHeader from '../components/header/PoleHeader.vue'
import { Article } from '../types/article.ts'

const isCreateArticleShowing = ref(false)
const articles = ref<Article[]>([])
const article = ref<Article>({
  title: 'Article Title',
  datePublished: new Date(),
  likes: 0,
})

function toggleCreate() {
  isCreateArticleShowing.value = !isCreateArticleShowing.value
}

function saveArticle(article: Article) {
  articles.value.push(article)
  toggleCreate()
}

function likedArticle(likes: number, date: Date) {
  const updatedArticle = articles.value.find((article) => article.datePublished === date)
  if (updatedArticle) {
    updatedArticle.likes = likes
  }
}
</script>
