<template>
  <div class="z-0 h-fit w-screen">
    <div v-if="isChampionshipPopupShowing" class="absolute z-10 h-full w-full bg-black opacity-50"></div>
    <PoleHeader @showHome="showHome" @showPopup="toggleChampionshipPopup" />
    <PoleLink @showCreate="showCreate" />
    <CreateArticle v-if="isCreateArticleShowing" :article="article" class="mt-10" @saveArticle="saveArticle" />
    <ArticleList
      v-if="isHomePageShowing"
      :f1Articles="f1LatestArticles"
      :f2Articles="f2LatestArticles"
      :f3Articles="f3LatestArticles"
      :wecArticles="wecLatestArticles"
      :motogpArticles="motogpLatestArticles"
      class="mt-10"
      @likedArticle="likedArticle"
    />
    <ChampionshipPopup
      v-if="isChampionshipPopupShowing"
      textf1="Soon to show the F1 standings"
      textmotogp="Sooon to show the MotoGP standings"
      @closeChampionship="toggleChampionshipPopup"
      ref="closeChampionshipPopupRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import CreateArticle from '../components/articles/CreateArticle.vue'
import ArticleList from '../components/articles/ArticleList.vue'
import ChampionshipPopup from '../components/articles/ChampionshipPopup.vue'
import PoleHeader from '../components/header/PoleHeader.vue'
import PoleLink from '../components/header/PoleLink.vue'
import { Article } from '../types/article.ts'

const isCreateArticleShowing = ref(false)
const isHomePageShowing = ref(true)
const isChampionshipPopupShowing = ref(false)
const closeChampionshipPopupRef = ref(null)
const articles = ref<Article[]>([])
const f1Articles = ref<Article[]>([])
const f2Articles = ref<Article[]>([])
const f3Articles = ref<Article[]>([])
const wecArticles = ref<Article[]>([])
const motogpArticles = ref<Article[]>([])
const f1LatestArticles = ref<Article[]>([])
const f2LatestArticles = ref<Article[]>([])
const f3LatestArticles = ref<Article[]>([])
const wecLatestArticles = ref<Article[]>([])
const motogpLatestArticles = ref<Article[]>([])
const article = ref<Article>({
  title: 'Article Title',
  text: 'Lorem ipsum dolor amet conquiro hongkong monkey so on so forth yadi yada lalalala yeyeye',
  image: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd',
  category: 'F1',
  datePublished: new Date(),
  likes: 0,
  views: 0,
})

function showHome() {
  if (!articles.value) {
    return
  }
  previewArticles()
  isCreateArticleShowing.value = false
  isHomePageShowing.value = true
  isChampionshipPopupShowing.value = false
}

function showCreate() {
  isHomePageShowing.value = false
  isCreateArticleShowing.value = true
  isChampionshipPopupShowing.value = false
}

function toggleChampionshipPopup() {
  isChampionshipPopupShowing.value = !isChampionshipPopupShowing.value
}

function saveArticle(article: Article) {
  const category = article.category
  articles.value.unshift(article)
  category === 'F1'
    ? f1Articles.value.unshift(article)
    : category === 'F2'
    ? f2Articles.value.unshift(article)
    : category === 'F3'
    ? f3Articles.value.unshift(article)
    : category === 'WEC'
    ? wecArticles.value.unshift(article)
    : motogpArticles.value.unshift(article)
  showHome()
}

function previewArticles() {
  f1LatestArticles.value = f1Articles.value.slice(0, 3)
  f2LatestArticles.value = f2Articles.value.slice(0, 3)
  f3LatestArticles.value = f3Articles.value.slice(0, 3)
  wecLatestArticles.value = wecArticles.value.slice(0, 3)
  motogpLatestArticles.value = motogpArticles.value.slice(0, 3)
}

function likedArticle(likes: number, date: Date) {
  const updatedArticle = articles.value.find((article) => article.datePublished === date)
  if (updatedArticle) {
    updatedArticle.likes = likes
  }
}

onClickOutside(closeChampionshipPopupRef, toggleChampionshipPopup)
</script>
