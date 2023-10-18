<template>
  <div class="flex pb-3">
    <div class="mr-5 w-4/12">
      <img class="ml-5 mr-5 phone:h-36 phone:w-32 computer:w-40" :src="article.image" />
    </div>
    <div class="ml-5 mt-5 w-8/12 flex-col text-left">
      <p class="text-2xl font-semibold text-red-600 phone:text-lg">{{ previewTitle }}</p>
      <p class="text-lg text-black phone:text-sm">{{ previewText }}...</p>
    </div>
  </div>
  <div></div>
</template>

<script setup lang="ts">
import { Article } from '../../types/article.ts'

interface Props {
  article: Article
}

const props = defineProps<Props>()

const previewTitle = props.article.title.slice(0, 100)
const previewText = props.article.text.slice(0, 100)
</script>
