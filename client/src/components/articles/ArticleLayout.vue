<template>
  <div class="mt-10 computer:ml-auto computer:mr-10 computer:w-3/5">
    <RouterLink :to="`/pole-position/category/${singleArticle.category}`"><TitleSeparator :title="singleArticle.category" /></RouterLink>
    <SingleArticle :article="singleArticle" />
    <button
      v-if="userStore.getUserId"
      id="likeButton"
      class="flex h-16 w-28 rounded-xl transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:ml-2 phone:h-14 phone:w-18"
      :class="getLikedClass"
      @click.prevent="likeArticle"
    >
      <LikeIcon />
      <p class="ml-1 mt-2">{{ singleArticle.likes }}</p>
    </button>
    <div class="mt-12 h-fit w-full rounded-xl bg-white p-2">
      <SortComment v-if="rootComments.length"/>
      <button
        v-if="!isCreateCommentVisible && userStore.getUserId"
        class="mb-6 mt-2 h-12 w-32 bg-gray-300 text-center text-lg text-black hover:cursor-pointer"
        @click="toggleCreateComment"
      >
        Comment
      </button>
      <CreateComment
        v-if="isCreateCommentVisible"
        comment="Create"
        @cancelComment="toggleCreateComment"
      />
      <div v-for="(articleComment, index) in rootComments" :key="index">
        <ArticleComment
          :comment="articleComment"
        />
        <div v-for="(reply, index) in articleComment.replies" :key="index">
          <div class="ml-40 phone:ml-6">
            <ArticleComment
              v-if="articleComment.replies.length"
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
const articleStore = useArticleStore()
const commentStore = useCommentStore()
const userStore = useUserStore()

const link = computed(() => route.params.id)
const singleArticle = computed(() => articleStore.getArticleById(link.value)!)

const rootComments = computed(() => {
  return commentStore.getSortedComments(link.value).filter((comment: Comment) => !comment.parentId)
})

const isCreateCommentVisible = ref(false)
const isLiked = computed(() => {
  return (singleArticle.value.likedBy.includes(userStore.getUserId))
})

const getLikedClass = computed(() => {
  if (!singleArticle.value) {
    return 'bg-white text-black'
  }
  return !isLiked.value ? 'bg-white text-black' : 'bg-red-600 text-white'
})

function likeArticle() {
  if (!singleArticle.value) {
    return
  }
  articleStore.likedArticle(singleArticle.value, !isLiked.value, userStore.getUserId)
}

function toggleCreateComment() {
  isCreateCommentVisible.value = !isCreateCommentVisible.value
}

onMounted(() => {
  articleStore.viewedArticle(singleArticle.value)
})
</script>
