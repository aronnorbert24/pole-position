<template>
  <div class="z-0 h-fit w-screen">
    <div v-if="isChampionshipPopupShowing" class="absolute z-10 h-full w-full bg-black opacity-50"></div>
    <PoleHeader @showHome="showHome" @showPopup="toggleChampionshipPopup" />
    <PoleLink @showCreate="showCreate" @showArticlesByCategory="showArticlesByCategory" />
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
      @showArticlesByCategory="showArticlesByCategory"
      @showArticle="showArticle"
    />
    <ArticlesByCategory
      v-if="isArticlesByCategoryShowing"
      :title="categoryTitle"
      :articles="articlesByCategory"
      @showArticle="showArticle"
    />
    <SingleArticle
      v-if="isSingleArticleShowing"
      :article="singleArticle"
      :userId="user.userId"
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
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import CreateArticle from '../components/articles/CreateArticle.vue'
import ArticleList from '../components/articles/ArticleList.vue'
import SingleArticle from '../components/articles/SingleArticle.vue'
import ArticlesByCategory from '../components/articles/ArticlesByCategory.vue'
import ChampionshipPopup from '../components/articles/ChampionshipPopup.vue'
import PoleHeader from '../components/header/PoleHeader.vue'
import PoleLink from '../components/header/PoleLink.vue'
import { Article } from '../types/article.ts'
import { User } from '../types/user.ts'

const isCreateArticleShowing = ref(false)
const isHomePageShowing = ref(true)
const isChampionshipPopupShowing = ref(false)
const isArticlesByCategoryShowing = ref(false)
const isSingleArticleShowing = ref(false)
const closeChampionshipPopupRef = ref(null)
const articles = ref<Article[]>([])
const singleArticle = ref<Article>({
  title: '',
  subheading: '',
  text: '',
  separatedText: [],
  image: '',
  category: '',
  datePublished: new Date(),
  likedBy: [],
  likes: 0,
  views: 0,
})
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
const articlesByCategory = ref<Article[]>([])
const categoryTitle = ref('')
const user = ref<User>({
  userId: '12345',
  username: 'Anonymous',
  password: 'qwertyqwerty',
  userPicture:
    'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd',
})
const article = ref<Article>({
  title: 'Article Title',
  subheading: 'Lorem ipsum dolor amet conquiro hongkong monkey so on so forth yadi yada lalalala yeyeye',
  text: 'Lorem ipsum dolor amet conquiro hongkong monkey so on so forth yadi yada lalalala yeyeye',
  separatedText: [],
  image: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd',
  category: 'F1',
  datePublished: new Date(),
  likedBy: [],
  likes: 0,
  views: 0,
})

function saveToLocalStorage() {
  localStorage.setItem('articles', JSON.stringify(articles.value))
}

function getFromLocalStorage() {
  const savedArticles = localStorage.getItem('articles')
  articles.value = savedArticles ? JSON.parse(savedArticles) : []
}

function showHome() {
  if (!articles.value) {
    return
  }
  previewArticles()
  isCreateArticleShowing.value = false
  isArticlesByCategoryShowing.value = false
  isHomePageShowing.value = true
  isSingleArticleShowing.value = false
}

function showCreate() {
  isHomePageShowing.value = false
  isArticlesByCategoryShowing.value = false
  isCreateArticleShowing.value = true
  isSingleArticleShowing.value = false
}

function showArticlesByCategory(title: string) {
  title === 'F1'
    ? (articlesByCategory.value = f1Articles.value)
    : title === 'F2'
    ? (articlesByCategory.value = f2Articles.value)
    : title === 'F3'
    ? (articlesByCategory.value = f3Articles.value)
    : title === 'WEC'
    ? (articlesByCategory.value = wecArticles.value)
    : (articlesByCategory.value = motogpArticles.value)
  categoryTitle.value = title
  isArticlesByCategoryShowing.value = true
  isHomePageShowing.value = false
  isCreateArticleShowing.value = false
  isSingleArticleShowing.value = false
}

function showArticle(article: Article) {
  singleArticle.value = article
  article.views = viewedArticle(article.views)
  isArticlesByCategoryShowing.value = false
  isHomePageShowing.value = false
  isCreateArticleShowing.value = false
  isSingleArticleShowing.value = true
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
  saveToLocalStorage()
}

function filterArticles() {
  f1Articles.value = articles.value.filter((article) => article.category === 'F1')
  f2Articles.value = articles.value.filter((article) => article.category === 'F2')
  f3Articles.value = articles.value.filter((article) => article.category === 'F3')
  wecArticles.value = articles.value.filter((article) => article.category === 'WEC')
  motogpArticles.value = articles.value.filter((article) => article.category === 'MotoGP')
}

function previewArticles() {
  f1LatestArticles.value = f1Articles.value.slice(0, 3)
  f2LatestArticles.value = f2Articles.value.slice(0, 3)
  f3LatestArticles.value = f3Articles.value.slice(0, 3)
  wecLatestArticles.value = wecArticles.value.slice(0, 3)
  motogpLatestArticles.value = motogpArticles.value.slice(0, 3)
}

function viewedArticle(views: number) {
  views++
  saveToLocalStorage()
  return views
}

function likedArticle(likes: number, isPostLiked: boolean, date: Date, userId: string) {
  const updatedArticle = articles.value.find((article) => article.datePublished === date)
  if (updatedArticle) {
    updatedArticle.likes = likes
    if (isPostLiked) {
      console.log(updatedArticle.likedBy)
      updatedArticle.likedBy.push(userId)
    } else {
      const index = updatedArticle.likedBy.findIndex((user) => user === userId)
      if (index) {
        updatedArticle.likedBy.splice(index, 1)
      }
    }
  }
  saveToLocalStorage()
}

onMounted(async () => {
  await getFromLocalStorage()
  await filterArticles()
  previewArticles()
})

onClickOutside(closeChampionshipPopupRef, toggleChampionshipPopup)
</script>
