<template>
  <div class="mt-5 flex">
    <div class="flex h-20 w-3/12">
      <img class="h-16 w-16 rounded-full border-2 border-red-600" :src="user.userPicture" />
    </div>
    <div class="pb-4 pr-2 text-left">
      <p class="text-lg font-semibold text-black">{{ user.username }}</p>
      <p class="text-sm text-slate-500">{{ formattedDate }}</p>
      <p class="mt-4 text-lg text-black">{{ comment.body }}</p>
    </div>
  </div>
  <div class="flex justify-between">
    <div
      class="flex h-12 w-16 rounded-xl transition-transform duration-300 ease-in-out hover:scale-125 hover:cursor-pointer phone:ml-2 phone:h-10 phone:w-16"
      :class="getLikedClass"
      @click.prevent="likedComment"
    >
      <LikeIcon />
      <p class="ml-1 mt-2">{{ updatedLikes }}</p>
    </div>
    <button
      v-if="!comment.parentId"
      class="text-md h-12 w-24 bg-gray-300 text-black hover:cursor-pointer"
      @click="toggleReplyComment"
    >
      Reply
    </button>
  </div>
  <div class="mb-8 ml-28 mt-8 w-10/12">
    <CreateComment :user="user" :comment="comment" v-if="isReplyCommentVisible" @saveComment="saveReply" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CreateComment from './CreateComment.vue'
import LikeIcon from '../icons/LikeIcon.vue'
import { formatDate } from '../../helpers/helper.ts'
import { User } from '../../types/user.ts'
import { Comment } from '../../types/comment.ts'

interface Props {
  user: User
  comment: Comment
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'likedComment', comment: Comment, likes: number, isCommentLiked: boolean, commentId: number, userId: string): void
  (e: 'saveReply', parentComment: Comment, reply: Comment): void
}>()

const formattedDate = computed(() => {
  return formatDate(props.comment.date)
})
const isCommentLiked = computed(() => {
  return props.comment.likedBy.includes(props.user.userId)
})
const updatedLikes = computed(() => {
  return props.comment.likes
})

const getLikedClass = computed(() => {
  return !isCommentLiked.value ? 'bg-white text-black' : 'bg-red-600 text-white'
})

const isReplyCommentVisible = ref(false)
const updatedComment = props.comment

function likedComment() {
  emit(
    'likedComment',
    props.comment,
    updatedLikes.value,
    !isCommentLiked.value,
    props.comment.commentId,
    props.user.userId
  )
}

function saveReply(comment: Comment) {
  comment.parentId = updatedComment.commentId
  toggleReplyComment()
  emit('saveReply', updatedComment, comment)
}

function toggleReplyComment() {
  isReplyCommentVisible.value = !isReplyCommentVisible.value
}
</script>
