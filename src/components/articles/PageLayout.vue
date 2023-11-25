<template>
  <div
    v-if="isChampionshipPopupShowing || isSearchBarShowing"
    class="absolute z-10 h-full w-full bg-black opacity-50"
  ></div>
  <div class="z-0 flex h-fit w-screen flex-col">
    <PoleHeader @showPopup="toggleChampionshipPopup" />
    <PoleLink @showSearchBar="toggleSearchBar" />
    <div class="tabletLandscape:flex computer:flex">
      <div class="mx-auto w-7/12 phone:w-11/12 tablet:w-9/12 tabletLandscape:ml-16 computer:mx-0">
        <component :is="currentComponent"></component>
      </div>
      <div class="mx-auto w-3/12 phone:w-11/12 tablet:w-9/12 tabletLandscape:mr-20 computer:mx-0 computer:ml-10">
        <PoleTrending />
      </div>
    </div>
    <PoleFooter class="mt-auto" />
    <ChampionshipPopup
      v-if="isChampionshipPopupShowing"
      textf1="Soon to show the F1 standings"
      textmotogp="Sooon to show the MotoGP standings"
      @closeChampionship="toggleChampionshipPopup"
      ref="closeChampionshipPopupRef"
    />
    <SearchResultsPopup v-if="isSearchBarShowing" @toggleSearchBar="toggleSearchBar" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useArticleStore } from '../../stores/ArticleStore'
import ArticleList from './ArticleList.vue'
import CreateArticle from './CreateArticle.vue'
import PoleTrending from './PoleTrending.vue'
import ChampionshipPopup from './ChampionshipPopup.vue'
import SearchResultsPopup from './SearchResultsPopup.vue'
import PoleHeader from '../header/PoleHeader.vue'
import PoleLink from '../header/PoleLink.vue'
import PoleFooter from '../footer/PoleFooter.vue'

interface Props {
  component: string
}

const props = defineProps<Props>()

const { clearSearchQuery } = useArticleStore()

const isSearchBarShowing = ref(false)
const closeChampionshipPopupRef = ref(null)
const closeSearchBarRef = ref(null)
const isChampionshipPopupShowing = ref(false)

const currentComponent = computed(() => {
  return props.component === 'Home' ? ArticleList : props.component === 'Create' ? CreateArticle : ArticleList
})

/*function showArticle(article: Article) {
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
}*/

function toggleChampionshipPopup() {
  isChampionshipPopupShowing.value = !isChampionshipPopupShowing.value
}

function toggleSearchBar() {
  isSearchBarShowing.value = !isSearchBarShowing.value
  if (isSearchBarShowing.value) {
    clearSearchQuery()
  }
}

onClickOutside(closeChampionshipPopupRef, toggleChampionshipPopup)
onClickOutside(closeSearchBarRef, toggleSearchBar)
</script>
