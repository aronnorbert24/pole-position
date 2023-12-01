<template>
  <div
    v-if="isChampionshipPopupShowing || isSearchBarShowing || isLogoutPopupShowing"
    class="absolute z-10 h-full w-full bg-black opacity-50"
  ></div>
  <div class="z-0 flex h-fit w-screen flex-col">
    <PoleHeader @showPopup="toggleChampionshipPopup" />
    <PoleLink @showSearchBar="toggleSearchBar" @showLogout="toggleLogoutPopup" />
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
    <SearchResultsPopup v-if="isSearchBarShowing" @toggleSearchBar="toggleSearchBar" ref="closeSearchBarRef" />
    <LogoutPopup v-if="isLogoutPopupShowing" @toggleLogoutPopup="toggleLogoutPopup" ref="closeLogoutPopupRef" @confirm="logout" @cancel="toggleLogoutPopup" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { useArticleStore } from '../../stores/ArticleStore'
import { useCommentStore } from '../../stores/CommentStore'
import { useUserStore } from '../../stores/UserStore'
import ArticleList from './ArticleList.vue'
import CreateArticle from './CreateArticle.vue'
import ArticlesByCategory from './ArticlesByCategory.vue'
import ArticleLayout from './ArticleLayout.vue'
import SearchResults from './SearchResults.vue'
import PoleTrending from './PoleTrending.vue'
import ChampionshipPopup from './ChampionshipPopup.vue'
import SearchResultsPopup from './SearchResultsPopup.vue'
import PoleHeader from '../header/PoleHeader.vue'
import PoleLink from '../header/PoleLink.vue'
import PoleFooter from '../footer/PoleFooter.vue'
import LogoutPopup from '../baseComponents/LogoutPopup.vue'

interface Props {
  component: string
}

const props = defineProps<Props>()

const { clearSearchQuery, getArticlesFromLocalStorage } = useArticleStore()
const { getCommentsFromLocalStorage } = useCommentStore()
const { getItemsFromLocalStorage, logOutUser } = useUserStore()

const router = useRouter()

getItemsFromLocalStorage()
getArticlesFromLocalStorage()
getCommentsFromLocalStorage()

const isSearchBarShowing = ref(false)
const closeChampionshipPopupRef = ref(null)
const closeSearchBarRef = ref(null)
const isChampionshipPopupShowing = ref(false)
const isLogoutPopupShowing = ref(false)
const closeLogoutPopupRef = ref(null)

const itemsToDelete = ['username', 'password', 'email', 'userId', 'userPicture']

const currentComponent = computed(() => {
  
  return props.component === 'Home' ? ArticleList 
  : props.component === 'Create' ? CreateArticle 
  : props.component === 'Category' ? ArticlesByCategory
  : props.component === 'Single' ? ArticleLayout
  : props.component === 'Search' ? SearchResults
  : ArticleList
})

function logout() {
  logOutUser()
  itemsToDelete.forEach(i => localStorage.removeItem(i))
  router.currentRoute.value.name === 'dashboard' ? location.reload() : router.push({name: 'dashboard'})

}

function toggleChampionshipPopup() {
  isChampionshipPopupShowing.value = !isChampionshipPopupShowing.value
}

function toggleLogoutPopup() {
  isLogoutPopupShowing.value = !isLogoutPopupShowing.value
}

function toggleSearchBar() {
  isSearchBarShowing.value = !isSearchBarShowing.value
  if (isSearchBarShowing.value) {
    clearSearchQuery()
  }
}

onClickOutside(closeChampionshipPopupRef, toggleChampionshipPopup)
onClickOutside(closeSearchBarRef, toggleSearchBar)
onClickOutside(closeLogoutPopupRef, toggleLogoutPopup)
</script>
