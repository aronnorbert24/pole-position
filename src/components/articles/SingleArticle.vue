<template>
  <div class="ml-auto mr-auto mt-10 w-3/5 phone:w-11/12">
    <TitleSeparator :title="article.category" />
    <div class="mb-12 h-fit rounded-xl bg-white py-5 text-center">
      <div class="mx-auto my-auto w-full px-5">
        <img class="mx-auto max-w-full" :src="article.image" />
      </div>
      <div class="my-auto ml-5 w-9/12 text-left">
        <p class="text-2xl font-semibold text-red-600 phone:text-lg">{{ article.title }}</p>
        <p class="text-lg text-black phone:text-sm">{{ previewText }}...</p>
      </div>
    </div>
    <button @click.prevent="likedArticle">{{ article.likes }} Like(s)</button>
  </div>
</template>

<script setup lang="ts">
import TitleSeparator from '../baseComponents/TitleSeparator.vue'
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
