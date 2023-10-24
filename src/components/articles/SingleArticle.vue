<template>
  <div class="mt-10 computer:ml-auto computer:mr-10 computer:w-3/5">
    <TitleSeparator :title="article.category" @showArticlesByCategory="showArticlesByCategory" />
    <div class="mb-12 h-fit w-full rounded-xl bg-white px-5 py-5 text-center phone:mb-5">
      <div class="mx-auto my-auto flex max-h-full w-full">
        <img class="mx-auto max-w-full" :src="article.image" />
        <div class="mb-4 ml-[-100%] mt-auto h-fit w-full flex-none rounded-xl bg-red-600/75 p-3 text-center">
          <p class="text-2xl font-semibold text-white phone:text-lg">{{ article.title }}</p>
        </div>
      </div>
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
    </div>
    <div
      id="likeButton"
      class="flex h-12 w-24 rounded-xl transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer"
      :class="getLikedClass"
      @click.prevent="likedArticle"
    >
      <LikeIcon />
      <p class="ml-1 mt-2">{{ props.article.likes }}</p>
    </div>
    <div>
      <ArticleComment :user="user" :comment="comment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ArticleComment from './ArticleComment.vue'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'
import LikeIcon from '../icons/LikeIcon.vue'
import { formatDate } from '../../helpers/helper.ts'
import { Article } from '../../types/article.ts'
import { User } from '../../types/user.ts'

interface Props {
  article: Article
  user: User
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'likedArticle', article: Article, likes: number, isPostLiked: boolean, date: Date, userId: string): void
  (e: 'showArticlesByCategory', title: string): void
}>()

const isPostLiked = ref(findUserId())
const formattedDate = ref(formatDate(props.article.datePublished))

function emphasizeClass(index: number, paragraph: string) {
  if (index === 1) {
    return paragraph[0] === '"'
      ? 'border-l-4 border-red-600 bg-gradient-to-r text-lg from-pink-300 to-white font-semibold p-3 leading-2 italic'
      : 'border-l-4 border-red-600 bg-gradient-to-r text-lg from-pink-300 to-white font-semibold p-3 leading-2'
  }
}

const getLikedClass = computed(() => {
  return !isPostLiked.value ? 'bg-white text-black' : 'bg-red-600 text-white'
})

function findUserId() {
  if (props.article.likedBy.length === 0) {
    return false
  }
  return props.article.likedBy.includes(props.user.userId)
}

function likedArticle() {
  isPostLiked.value = !isPostLiked.value
  let updatedLikes = props.article.likes
  if (isPostLiked.value) {
    updatedLikes++
  } else if (updatedLikes >= 1) {
    updatedLikes--
  } else {
    return
  }
  emit('likedArticle', props.article, updatedLikes, isPostLiked.value, props.article.datePublished, props.user.userId)
}

function showArticlesByCategory(title: string) {
  emit('showArticlesByCategory', title)
}
</script>
