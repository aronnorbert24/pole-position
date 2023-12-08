<template>
    <div class="flex h-40 px-4 phone:px-0" @click="getSingleArticle">
      <div
        class="mx-auto my-auto w-3/12 transition-transform duration-300 ease-in-out hover:cursor-pointer phone:w-5/12"
      >
        <img class="mx-auto phone:w-24 computer:max-h-32 computer:w-40" :src="article.image" />
      </div>
      <div class="my-auto ml-5 mr-5 w-9/12 flex-col text-left phone:w-7/12">
        <p
          class="text-2xl font-semibold text-red-600 transition-transform duration-300 ease-in-out hover:cursor-pointer hover:underline phone:text-lg"
        >
          {{ article.title }}
        </p>
        <p class="text-lg text-black phone:text-sm">{{ previewText }}...</p>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useArticleStore } from '../../stores/ArticleStore';
import { Article } from '../../types/article.ts'

const router = useRouter()

const articleStore = useArticleStore()

interface Props {
  article: Article
}

const props = defineProps<Props>()
const subheading = props.article.subheading
const previewText = subheading.slice(0, 100)

function getSingleArticle() {
  try {
    articleStore.getArticleById(props.article._id)
    router.push({path: `/pole-position/article/${props.article._id}`})
  } catch (error) {
    console.error
    throw error
  }
}

</script>
