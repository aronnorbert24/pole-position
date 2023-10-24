<template>
  <div class="mt-5 h-fit w-full bg-white p-2">
    <img class="h-16 w-16 rounded-full border-2 border-red-600" :src="user.userPicture" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '../../types/User.ts'
import { Comment } from '../../types/Comment.ts'

interface Props {
  user: User
  comment: Comment
}

const props = defineProps<Props>()
</script>
