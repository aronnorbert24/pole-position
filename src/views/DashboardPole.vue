<template>
  <div
    v-if="isChampionshipPopupShowing || isSearchBarShowing"
    class="absolute z-10 h-full w-full bg-black opacity-50"
  ></div>
  <div class="z-0 flex h-fit w-screen flex-col">
    <PoleHeader @showHome="showHome" @showPopup="toggleChampionshipPopup" />
    <PoleLink
      @showCreate="showCreate"
      @showArticlesByCategory="showArticlesByCategory"
      @showSearchBar="toggleSearchBar"
    />
    <div class="tabletLandscape:flex computer:flex">
      <div class="mx-auto w-7/12 phone:w-11/12 tablet:w-9/12 tabletLandscape:ml-16 computer:mx-0">
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
      </div>
      <div class="mx-auto w-3/12 phone:w-11/12 tablet:w-9/12 tabletLandscape:mr-20 computer:mx-0 computer:ml-10">
        <PoleTrending :trending="trendingArticles" @showArticle="showArticle" />
      </div>
    </div>
    <PoleFooter class="mt-auto" @showArticlesByCategory="showArticlesByCategory" />
    <ChampionshipPopup
      v-if="isChampionshipPopupShowing"
      textf1="Soon to show the F1 standings"
      textmotogp="Sooon to show the MotoGP standings"
      @closeChampionship="toggleChampionshipPopup"
      ref="closeChampionshipPopupRef"
    />
    <SearchResultsPopup
      v-if="isSearchBarShowing"
      title="Search Results"
      :length="searchedArticles.length"
      :articles="searchedArticlesPopup"
      @showArticle="showArticle"
      @showSearchedArticles="showSearchedArticles"
      @toggleSearchBar="toggleSearchBar"
      @searchArticles="searchArticles"
      ref="closeSearchBarRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ArticleList from '../components/articles/ArticleList.vue'
import PoleTrending from '../components/articles/PoleTrending.vue'
import ChampionshipPopup from '../components/articles/ChampionshipPopup.vue'
import SearchResultsPopup from '../components/articles/SearchResultsPopup.vue'
import PoleHeader from '../components/header/PoleHeader.vue'
import PoleLink from '../components/header/PoleLink.vue'
import PoleFooter from '../components/footer/PoleFooter.vue'
import { sortComment } from '../helpers/helper.ts'
import { Article } from '../types/article.ts'
import { User } from '../types/user.ts'
import { Comment } from '../types/comment.ts'

const isSearchBarShowing = ref(false)
const closeChampionshipPopupRef = ref(null)
const closeSearchBarRef = ref(null)

// Create the preview articles from the pinia store here.

function showArticle(article: Article) {
  singleArticle.value = article
  article.views = viewedArticle(article.views)
  isArticlesByCategoryShowing.value = false
  isHomePageShowing.value = false
  isCreateArticleShowing.value = false
  isSearchResultShowing.value = false
  isSingleArticleShowing.value = true
}

function showSearchedArticles() {
  isArticlesByCategoryShowing.value = false
  isHomePageShowing.value = false
  isCreateArticleShowing.value = false
  isSingleArticleShowing.value = false
  isSearchResultShowing.value = true
  toggleSearchBar()
}

function toggleChampionshipPopup() {
  isChampionshipPopupShowing.value = !isChampionshipPopupShowing.value
}

function toggleSearchBar() {
  isSearchBarShowing.value = !isSearchBarShowing.value
  if (isSearchBarShowing.value) {
    showHome()
    searchQuery.value = ''
  }
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

function searchArticles(search: string) {
  searchQuery.value = search
}

function viewedArticle(views: number) {
  views++
  saveToLocalStorage()
  return views
}

function likedArticle(article: Article, likes: number, isPostLiked: boolean, date: Date, userId: string) {
  const updatedArticle = {
    articleId: article.articleId,
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
  let updatedLikes = likes
  if (isPostLiked) {
    updatedLikes++
  } else if (updatedLikes >= 1) {
    updatedLikes--
  } else {
    return
  }
  if (updatedArticle) {
    const index = updatedArticle.likedBy.findIndex((user) => user === userId)
    updatedArticle.likes = updatedLikes
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
  trending()
  showArticle(singleArticle.value)
}

function likedComment(likes: number, isCommentLiked: boolean, commentId: number) {
  const comment = comments.value.find((comment) => comment.commentId === commentId)
  const updatedComment = ref<Comment>(comment ? comment : createComment.value)

  if (isCommentLiked) {
    likes++
  } else if (likes >= 1) {
    likes--
  } else {
    return
  }
  if (updatedComment.value) {
    const index = updatedComment.value.likedBy.findIndex((user) => user === updatedComment.value.userId)
    updatedComment.value.likes = likes
    if (isCommentLiked && index < 0) {
      updatedComment.value.likedBy.push(updatedComment.value.userId)
    } else {
      if (index >= 0) {
        updatedComment.value.likedBy.splice(index, 1)
      }
    }
  }
  if (updatedComment.value.parentId) {
    const parentComment = comments.value.find((comment) => comment.commentId === updatedComment.value.parentId)
    if (parentComment) {
      const index = parentComment.replies.findIndex(
        (comment: Comment) => comment.commentId === updatedComment.value.commentId
      )
      parentComment.replies[index] = updatedComment.value
    }
  } else {
    const i = comments.value.findIndex((comment) => comment.commentId === commentId)
    comments.value[i] = updatedComment.value
  }
  filterArticles()
  previewArticles()
  saveToLocalStorage()
  trending()
  showArticle(singleArticle.value)
}

onMounted(async () => {
  await getFromLocalStorage()
  await filterArticles()
  await previewArticles()
  trending()
})

onClickOutside(closeChampionshipPopupRef, toggleChampionshipPopup)
onClickOutside(closeSearchBarRef, toggleSearchBar)
</script>
