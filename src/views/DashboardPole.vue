<template>
  <div class="z-0 h-fit w-screen">
    <div v-if="isChampionshipPopupShowing" class="absolute z-10 h-full w-full bg-black opacity-50"></div>
    <PoleHeader @showHome="showHome" @showPopup="toggleChampionshipPopup" />
    <PoleLink @showCreate="showCreate" @showArticlesByCategory="showArticlesByCategory" />
    <div class="computer:flex">
      <div class="w-7/12">
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
          @showArticlesByCategory="showArticlesByCategory"
        />
      </div>
      <div class="ml-10 w-3/12">
        <PoleTrending :trending="trendingArticles" @showArticle="showArticle" />
      </div>
    </div>
    <PoleFooter @showArticlesByCategory="showArticlesByCategory" />
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
import PoleTrending from '../components/articles/PoleTrending.vue'
import ChampionshipPopup from '../components/articles/ChampionshipPopup.vue'
import PoleHeader from '../components/header/PoleHeader.vue'
import PoleLink from '../components/header/PoleLink.vue'
import PoleFooter from '../components/footer/PoleFooter.vue'
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
const trendingArticles = ref<Article[]>([])
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

function sortArticles() {
  return articles.value.sort((a: Article, b: Article) => {
    return a.views < b.views ? 1 : a.views > b.views ? -1 : 0
  })
}

function trending() {
  const sortedArticles: Article[] = sortArticles()
  trendingArticles.value = sortedArticles.slice(0, 5)
}

function viewedArticle(views: number) {
  views++
  saveToLocalStorage()
  return views
}

function likedArticle(article: Article, likes: number, isPostLiked: boolean, date: Date, userId: string) {
  const updatedArticle = {
    title: article.title,
    subheading: article.subheading,
    separatedText: article.separatedText,
    image: article.image,
    category: article.category,
    datePublished: article.datePublished,
    likedBy: article.likedBy,
    likes: article.likes,
    views: article.views,
  }
  if (updatedArticle) {
    const index = updatedArticle.likedBy.findIndex((user) => user === userId)
    updatedArticle.likes = likes
    if (isPostLiked && index < 0) {
      updatedArticle.likedBy.push(userId)
    } else {
      if (index >= 0) {
        updatedArticle.likedBy.splice(index, 1)
      }
    }
  }
  const i = articles.value.findIndex((article) => article.datePublished === date)
  articles.value[i] = updatedArticle
  singleArticle.value = updatedArticle
  filterArticles()
  previewArticles()
  saveToLocalStorage()
}

onMounted(async () => {
  await getFromLocalStorage()
  await filterArticles()
  await previewArticles()
  trending()
})

onClickOutside(closeChampionshipPopupRef, toggleChampionshipPopup)
</script>
