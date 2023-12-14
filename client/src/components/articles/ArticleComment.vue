<template>
  <div v-if="isCurrentCommentVisible" class="mt-5 flex">
    <div class="flex phone:mr-6 h-20 w-3/12 phone:w-full">
      <img class="h-16 w-16 rounded-full border-2 border-red-600" :src="comment.userPicture" />
    </div>
    <div class="pb-4 pr-2 text-left">
      <p class="text-lg font-semibold text-black">{{ comment.username }}</p>
      <p class="text-sm text-slate-500">{{ formattedDate }}</p>
      <p class="mt-4 text-lg text-black">{{ comment.body }}</p>
    </div>
    <CommentIcons v-if="isUserTheAuthor" @toggle="toggleComment" @delete="deleteComment" />
  </div>
  <div v-if="userStore.getUserId" class="flex justify-between">
    <button
      class="flex h-16 w-28 rounded-xl transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:ml-2 phone:h-14 phone:w-18"
      :class="getLikedClass"
      @click.prevent="liked"
    >
      <LikeIcon />
      <p class="ml-1 mt-2">{{ props.comment.likes }}</p>
    </button>
    <button
      v-if="!comment.parentId && isCurrentCommentVisible"
      class="text-md h-12 w-24 bg-gray-300 text-black hover:cursor-pointer"
      @click="toggleComment('Reply')"
    >
      Reply
    </button>
  </div>
  <div class="mb-8 ml-28 mt-8 w-10/12">
    <CreateComment
      v-if="isReplyCommentVisible"
      :comment="category"
      @cancelComment="toggleComments"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCommentStore } from '../../stores/CommentStore'
import { useUserStore } from '../../stores/UserStore'
import CreateComment from './CreateComment.vue'
import LikeIcon from '../icons/LikeIcon.vue'
import CommentIcons from '../icons/CommentIcons.vue'
import { formatDate } from '../../helpers/helper.ts'
import { Comment } from '../../types/comment.ts'

const commentStore = useCommentStore()
const userStore = useUserStore()

interface Props {
  comment: Comment
}

const props = defineProps<Props>()

const category = ref('Reply')

const isUserTheAuthor = computed(() => props.comment.userId === userStore.getUserId)

const formattedDate = computed(() => {
  return formatDate(props.comment.date)
})
const isCommentLiked = computed(() => {
  return props.comment.likedBy.includes(userStore.getUserId)
})

const getLikedClass = computed(() => {
  return !isCommentLiked.value ? 'bg-white text-black' : 'bg-red-600 text-white'
})

const isReplyCommentVisible = ref(false)
const isCurrentCommentVisible = ref(true)

function liked() {
  commentStore.likedComment(props.comment, !isCommentLiked.value, userStore.getUserId)
}

function deleteComment() {
  commentStore.deleteComment(props.comment)
}

function toggleComment(type: string) {
  category.value = type
  commentStore.setSingleComment(props.comment)
  if (category.value === 'Edit') {
    toggleCurrentComment()
  }
  toggleReplyComment()
}

function toggleReplyComment() {
  isReplyCommentVisible.value = !isReplyCommentVisible.value
}

function toggleCurrentComment() {
  isCurrentCommentVisible.value = !isCurrentCommentVisible.value
}

function toggleComments() {
  toggleReplyComment()
  if (category.value === 'Edit') {
    toggleCurrentComment()
  }
}
</script>
