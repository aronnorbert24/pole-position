<template>
  <div class="ml-auto mr-auto mt-10 w-3/5 phone:w-11/12">
    <TitleSeparator :title="article.category" />
    <div class="mb-12 h-fit w-full rounded-xl bg-white px-5 py-5 text-center">
      <div class="mx-auto my-auto flex max-h-full w-full">
        <img class="mx-auto max-w-full" :src="article.image" />
        <div class="mb-4 ml-[-100%] mt-auto h-fit w-full flex-none rounded-xl bg-red-600/75 p-3 text-center">
          <p class="text-2xl font-semibold text-white phone:text-lg">{{ article.title }}</p>
        </div>
      </div>
      <div class="flex justify-between">
        <p class="text-md font-medium text-black">By: Pole Position</p>
        <p class="text-lg text-black phone:text-sm">{{ formattedDate }}</p>
      </div>
    </div>
    <button @click.prevent="likedArticle">{{ article.likes }} Like(s)</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'
import { formatDate } from '../../helpers/helper.ts'
import { Article } from '../../types/article.ts'

interface Props {
  article: Article
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'likedArticle', likes: number, date: Date): void
}>()

const formattedDate = ref(formatDate(props.article.datePublished))

function likedArticle() {
  const updatedLikes = props.article.likes + 1
  emit('likedArticle', updatedLikes, props.article.datePublished)
}
</script>
