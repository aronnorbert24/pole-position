<template>
  <div class="flex">
    <img class="h-16 w-16 rounded-full border-2 border-red-600" :src="user.userPicture" />
    <textarea
      type="text"
      maxlength="500"
      class="ml-8 h-24 w-10/12 rounded-2xl border-black bg-slate-300 pl-2 text-left text-lg font-medium text-black"
      :placeholder="updatedComment.body"
      v-model="updatedComment.body"
    ></textarea>
  </div>
  <div class="flex">
    <div
      class="ml-auto mr-2 mt-4 h-10 w-24 rounded-2xl bg-red-600 text-white transition-transform ease-in-out hover:scale-110 hover:cursor-pointer"
      @click="saveComment"
    >
      <p class="pt-1 font-header text-lg font-semibold">Comment</p>
    </div>
    <div
      class="mr-4 mt-4 h-10 w-24 rounded-2xl bg-gray-300 text-red-600 transition-transform ease-in-out hover:scale-110 hover:cursor-pointer"
      @click="cancelComment"
    >
      <p class="pt-1 font-header text-lg font-semibold">Cancel</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '../../types/user.ts'
import { Comment } from '../../types/comment.ts'

interface Props {
  comment: Comment
  user: User
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'saveComment', comment: Comment): void
  (e: 'editComment', comment: Comment): void
  (e: 'cancelComment'): void
}>()

const updatedComment = ref<Comment>({
  articleId: props.comment.articleId,
  userId: props.comment.userId,
  parentId: props.comment.parentId,
  replies: props.comment.replies,
  commentId: props.comment.commentId,
  body: props.comment.body,
  date: props.comment.date,
  likes: props.comment.likes,
  likedBy: props.comment.likedBy,
})

function saveComment() {
  if (!updatedComment.value.body.length) {
    return
  }

  if (!updatedComment.value.commentId) {
    updatedComment.value.date = new Date()
    updatedComment.value.commentId = new Date().getTime()
    emit('saveComment', updatedComment.value)
    return
  }
  emit('editComment', updatedComment.value)
}

function cancelComment() {
  emit('cancelComment')
}
</script>
