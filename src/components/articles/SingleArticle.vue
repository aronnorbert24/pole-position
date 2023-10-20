<template>
  <div>
    <div class="flex h-52 py-5">
      <div class="my-auto mr-5 w-3/12">
        <img class="mx-auto phone:h-28 phone:w-24 computer:w-40" :src="article.image" />
      </div>
      <div class="my-auto ml-5 w-9/12 flex-col text-left">
        <p class="text-2xl font-semibold text-red-600 phone:text-lg">{{ article.title }}</p>
        <p class="text-lg text-black phone:text-sm">{{ previewText }}...</p>
      </div>
    </div>
    <button @click.prevent="likedArticle">{{ article.likes }} Like(s)</button>
  </div>
</template>

<script setup lang="ts">
import { Article } from '../../types/article.ts'

interface Props {
  article: Article
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'likedArticle', likes: number, date: Date): void
}>()

function likedArticle() {
  const updatedLikes = props.article.likes + 1
  emit('likedArticle', updatedLikes, props.article.datePublished)
}
</script>
