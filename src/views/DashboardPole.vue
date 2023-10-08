<template>
  <div>
    <input type="text" maxlength="100" placeholder="article" v-model="article.title" />
    <button @click.prevent="saveArticle()">Save</button>
  </div>
  <div>
    <ul v-for="article in articles" :key="article.title">
      <li>{{ article.title }}</li>
      <button @click.prevent="likedArticle(article)">{{ article.likes }} Like(s)</button>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Article from '../types/article'

const articles = ref<Article[]>([])
const article = ref<Article>({
  title: 'Article Title',
  likes: 0,
})

function saveArticle() {
  if (!article.value.title.length) {
    return
  }
  console.log(article.value)
  articles.value.push(article.value)
}

function likedArticle(article: Article) {
  return article.likes++
}
</script>
