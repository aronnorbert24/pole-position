<template>
  <div class="mx-auto flex h-20 w-3/12">
    <img class="h-16 w-16 rounded-full border-2 border-red-600" :src="user.userPicture" />
  </div>
  <div class="text-left">
    <p class="mt-2 text-lg font-semibold text-black">{{ user.username }}</p>
    <p class="text-sm text-slate-500">{{ formattedDate }}</p>
    <p class="mt-4 text-lg text-black">{{ comment.body }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from '../../helpers/helper.ts'
import { User } from '../../types/user.ts'
import { Comment } from '../../types/comment.ts'

interface Props {
  user: User
  comment: Comment
}

const props = defineProps<Props>()

const formattedDate = ref(formatDate(props.comment.date))
</script>
