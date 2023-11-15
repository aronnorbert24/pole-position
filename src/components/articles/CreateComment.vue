<template>
  <div class="flex">
    <img class="h-16 w-16 rounded-full border-2 border-red-600" :src="user.userPicture" />
    <textarea
      type="text"
      maxlength="500"
      class="ml-8 h-24 w-10/12 rounded-2xl border-black bg-slate-300 pl-2 text-left text-lg font-medium text-black"
      :placeholder="comment.body"
      v-model="updatedComment.body"
    ></textarea>
  </div>
  <div
    class="ml-auto mr-2 mt-4 h-10 w-24 rounded-2xl bg-red-600 text-white transition-transform ease-in-out hover:scale-110 hover:cursor-pointer"
    @click="saveComment"
  >
    <p class="pt-1 font-header text-lg font-semibold">Comment</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '../../types/user.ts'
import { Comment } from '../../types/comment.ts'

interface Props {
  user: User
  comment: Comment
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'saveComment', comment: Comment): void
}>()

const updatedComment = ref<Comment>({
  articleId: props.comment.articleId,
  userId: props.user.userId,
  parentId: props.comment.parentId,
  replies: props.comment.replies,
  commentId: props.comment.commentId,
  body: props.comment.body,
  date: props.comment.date,
  likes: props.comment.likes,
  dislikes: props.comment.dislikes,
  likedBy: props.comment.likedBy,
  dislikedBy: props.comment.dislikedBy,
})

function saveComment() {
  if (!updatedComment.value.body.length) {
    return
  }

  updatedComment.value.date = new Date()
  updatedComment.value.commentId = new Date().getTime()

  emit('saveComment', updatedComment.value)
}
</script>
