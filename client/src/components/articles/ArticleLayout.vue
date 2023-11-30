<template>
  <div class="mt-10 computer:ml-auto computer:mr-10 computer:w-3/5">
    <RouterLink :to="`/pole-position/category/${getSingleArticle(Number(route.params.id))!.category}`"><TitleSeparator :title="getSingleArticle(Number(route.params.id))!.category" /></RouterLink>
    <SingleArticle :article="getSingleArticle(Number(route.params.id))!" />
    <button
      id="likeButton"
      class="flex h-16 w-28 rounded-xl transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:ml-2 phone:h-14 phone:w-18"
      :class="getLikedClass"
      @click.prevent="likeArticle"
    >
      <LikeIcon />
      <p class="ml-1 mt-2">{{ getSingleArticle(Number(route.params.id))!.likes }}</p>
    </button>
    <div class="mt-12 h-fit w-full rounded-xl bg-white p-2">
      <SortComment />
      <button
        v-if="!isCreateCommentVisible"
        class="mb-6 mt-2 h-12 w-32 bg-gray-300 text-center text-lg text-black hover:cursor-pointer"
        @click="toggleCreateComment"
      >
        Comment
      </button>
      <CreateComment
        v-if="isCreateCommentVisible"
        comment="Create"
        :user="user"
        :userId="loggedInUserId"
        @cancelComment="toggleCreateComment"
      />
      <div v-for="(articleComment, index) in rootComments" :key="index">
        <ArticleComment
          :user="user"
          :comment="articleComment"
        />
        <div v-for="(reply, index) in articleComment.replies" :key="index">
          <div class="ml-40 phone:ml-6">
            <ArticleComment
              v-if="articleComment.replies.length"
              :user="user"
              :comment="reply"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../../stores/ArticleStore'
import { useCommentStore } from '../../stores/CommentStore'
import { useUserStore } from '../../stores/UserStore'
import SingleArticle from './SingleArticle.vue'
import ArticleComment from './ArticleComment.vue'
import CreateComment from './CreateComment.vue'
import SortComment from './SortComment.vue'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'
import LikeIcon from '../icons/LikeIcon.vue'

import { Comment } from '../../types/comment.ts'

const route = useRoute()
const { likedArticle, viewedArticle } = useArticleStore()
const { getSingleArticle } = storeToRefs(useArticleStore())
const { getSortedComments } = storeToRefs(useCommentStore())
const { user, loggedInUserId } = storeToRefs(useUserStore())


const rootComments = computed(() => {
  return getSortedComments.value(Number(route.params.id)).filter((comment: Comment) => !comment.parentId)
})

const isCreateCommentVisible = ref(false)
const isLiked = computed(() => {
  return (getSingleArticle.value(Number(route.params.id))!.likedBy.includes(loggedInUserId.value))
})

const getLikedClass = computed(() => {
  if (!getSingleArticle.value(Number(route.params.id))!) {
    return 'bg-white text-black'
  }
  return !isLiked.value ? 'bg-white text-black' : 'bg-red-600 text-white'
})

function likeArticle() {
  if (!getSingleArticle.value(Number(route.params.id))!) {
    return
  }
  likedArticle(getSingleArticle.value(Number(route.params.id))!, !isLiked.value, loggedInUserId.value)
}

function toggleCreateComment() {
  isCreateCommentVisible.value = !isCreateCommentVisible.value
}

onMounted(() => {
  viewedArticle(getSingleArticle.value(Number(route.params.id))!)
})
</script>
