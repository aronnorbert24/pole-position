<template>
  <div v-if="isCurrentCommentVisible" class="mt-5 flex">
    <div class="flex h-20 w-3/12">
      <img class="h-16 w-16 rounded-full border-2 border-red-600" :src="user.userPicture" />
    </div>
    <div class="pb-4 pr-2 text-left">
      <p class="text-lg font-semibold text-black">{{ user.username }}</p>
      <p class="text-sm text-slate-500">{{ formattedDate }}</p>
      <p class="mt-4 text-lg text-black">{{ comment.body }}</p>
    </div>
    <div
      v-if="isUserTheAuthor"
      class="ml-4 transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
      @click.prevent="toggleComment('Edit')"
    >
      <EditIcon />
    </div>
    <div
      v-if="isUserTheAuthor"
      class="ml-4 transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
      @click.prevent="deleteComment"
    >
      <EditIcon />
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
      :user="user"
      :comment="updatedComment"
      @saveComment="saveReply"
      @editComment="editComment"
      @cancelComment="toggleComments"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CreateComment from './CreateComment.vue'
import EditIcon from '../icons/EditIcon.vue'
import LikeIcon from '../icons/LikeIcon.vue'
import { formatDate } from '../../helpers/helper.ts'
import { User } from '../../types/user.ts'
import { Comment } from '../../types/comment.ts'

interface Props {
  user: User
  comment: Comment
  createComment: Comment
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'likedComment', comment: Comment, likes: number, isCommentLiked: boolean, commentId: number, userId: string): void
  (e: 'saveReply', parentComment: Comment, reply: Comment): void
  (e: 'editComment', editedComment: Comment): void
  (e: 'deleteComment', comment: Comment): void
}>()

const updatedComment = ref<Comment>(props.comment)
const createComment = computed(() => {
  return props.createComment
})
const category = ref('Reply')

const isUserTheAuthor = computed(() => {
  return props.user.userId === props.comment.userId
})

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
const isCurrentCommentVisible = ref(true)

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
  comment.parentId = props.comment.commentId
  toggleReplyComment()
  emit('saveReply', props.comment, comment)
}

function editComment(comment: Comment) {
  toggleComments()
  emit('editComment', comment)
}

function deleteComment() {
  emit('deleteComment', props.comment)
}

function toggleComment(type: string) {
  updatedComment.value = type === 'Reply' ? createComment.value : props.comment
  category.value = type
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
