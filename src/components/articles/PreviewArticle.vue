<template>
  <div class="flex h-40">
    <div
      class="mx-auto my-auto w-3/12 transition-transform duration-300 ease-in-out hover:cursor-pointer phone:w-5/12"
      @click="showArticle"
    >
      <img class="mx-auto phone:w-24 computer:max-h-32 computer:w-40" :src="article.image" />
    </div>
    <div class="my-auto ml-5 mr-5 w-9/12 flex-col text-left phone:w-7/12">
      <p
        class="text-2xl font-semibold text-red-600 transition-transform duration-300 ease-in-out hover:cursor-pointer hover:underline phone:text-lg"
        @click="showArticle"
      >
        {{ article.title }}
      </p>
      <p class="text-lg text-black phone:text-sm">{{ previewText }}...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Article } from '../../types/article.ts'

interface Props {
  article: Article
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'showArticle', article: Article): void
}>()

const previewText = props.article.subheading.slice(0, 100)

function showArticle() {
  emit('showArticle', props.article)
}
</script>
