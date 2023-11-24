<template>
  <div class="mb-5 h-fit w-full rounded-xl bg-white px-5 py-5 text-center phone:mb-5">
    <div class="mx-auto my-auto flex max-h-full w-full">
      <img class="mx-auto max-w-full" :src="article.image" />
      <div class="mb-4 ml-[-100%] mt-auto h-fit w-full flex-none rounded-xl bg-red-600/75 p-3 text-center">
        <p class="text-2xl font-semibold text-white phone:text-lg">{{ article.title }}</p>
      </div>
    </div>
    <div class="mt-2 flex justify-between">
      <p class="text-md font-medium text-black">By: Pole Position</p>
      <p class="text-md font-medium text-black phone:text-sm">{{ formattedDate }}</p>
    </div>
    <div class="mb-10 mt-5 text-left text-xl font-semibold text-black">
      <p>{{ article.subheading }}</p>
    </div>
    <div>
      <div
        v-for="(paragraph, index) in article.separatedText"
        :key="index"
        class="text-md mt-5 text-left text-black"
        :class="[emphasizeClass(index, paragraph)]"
      >
        <p>{{ paragraph }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '../../helpers/helper.ts'
import { Article } from '../../types/article.ts'

interface Props {
  article: Article
}

const props = defineProps<Props>()

const formattedDate = computed(() => {
  return formatDate(props.article.datePublished)
})

function emphasizeClass(index: number, paragraph: string) {
  if (index % 2 === 1) {
    return paragraph[0] === '"'
      ? 'border-l-4 border-red-600 bg-gradient-to-r text-lg from-pink-300 to-white font-semibold p-3 leading-2 italic'
      : 'border-l-4 border-red-600 bg-gradient-to-r text-lg from-pink-300 to-white font-semibold p-3 leading-2'
  }
}
</script>
