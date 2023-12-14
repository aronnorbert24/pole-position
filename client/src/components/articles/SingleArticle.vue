<template>
  <div class="mb-5 h-fit w-full rounded-xl bg-white px-5 py-5 text-center phone:mb-5">
    <div class="mx-auto my-auto flex max-h-full w-full">
      <img class="mx-auto max-w-full" :src="article.image" />
      <div class="mb-4 ml-[-100%] mt-auto h-fit w-full flex-none rounded-xl bg-red-600/75 p-3 text-center">
        <p class="text-2xl font-semibold text-white phone:text-lg">{{ article.title }}</p>
      </div>
    </div>
    <CommentIcons v-if="userStore.getIsUserAdmin" class="ml-auto mt-2 mb-4" @toggle="toggleArticle" @delete="toggleDeletePopup" />
    <div class="mt-2 flex justify-between">
      <p class="text-md font-medium text-black">By: Pole Position</p>
      <p class="text-md font-medium text-black phone:text-sm">{{ formattedDate }}</p>
    </div>
    <div class="mb-10 mt-5 text-left text-xl font-semibold text-black">
      <p>{{ article.subheading }}</p>
    </div>
    <div>
      <div
        v-for="(paragraph, index) in article.separatedText"
        :key="index"
        class="text-md mt-5 text-left text-black"
        :class="[emphasizeClass(index, paragraph)]"
      >
        <p>{{ paragraph }}</p>
      </div>
    </div>
    <ErrorMessage v-if="errorMessage" :error="errorMessage" />
    <LogoutPopup text="delete this article?" class="mt-96 mx-auto" v-if="isDeletePopupShowing" @toggleDeletePopup="toggleDeletePopup" ref="closeLogoutPopupRef" @confirm="deleteArticle" @cancel="toggleDeletePopup" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core'
import { useArticleStore } from '../../stores/ArticleStore';
import { useUserStore } from '../../stores/UserStore';
import CommentIcons from '../icons/CommentIcons.vue';
import ErrorMessage from '../baseComponents/ErrorMessage.vue';
import LogoutPopup from '../baseComponents/LogoutPopup.vue';
import { formatDate } from '../../helpers/helper.ts'
import { Article } from '../../types/article.ts'

interface Props {
  article: Article
}

const router = useRouter()
const props = defineProps<Props>()

const articleStore = useArticleStore()
const userStore = useUserStore()

const formattedDate = computed(() => {
  return formatDate(props.article.datePublished)
})
const errorMessage = ref('')
const category = ref('')
const isDeletePopupShowing = ref(false)
const closeDeletePopupRef = ref(null)

function emphasizeClass(index: number, paragraph: string) {
  if (index % 2 === 1) {
    return paragraph[0] === '"'
      ? 'border-l-4 border-red-600 bg-gradient-to-r text-lg from-pink-300 to-white font-semibold p-3 leading-2 italic'
      : 'border-l-4 border-red-600 bg-gradient-to-r text-lg from-pink-300 to-white font-semibold p-3 leading-2'
  }
}

async function deleteArticle() {
  try {
  await articleStore.deleteArticle(props.article._id)
  router.push({name: 'dashboard'})
  } catch (error: any) {
    errorMessage.value = error.message
    console.error(error)
    throw error
  }
}

function toggleArticle(type: string) {
  category.value = type
  articleStore.setNewArticle(props.article)
  router.push({name: 'create'})
}

function toggleDeletePopup() {
  isDeletePopupShowing.value = !isDeletePopupShowing.value
}

onClickOutside(closeDeletePopupRef, toggleDeletePopup)
</script>
