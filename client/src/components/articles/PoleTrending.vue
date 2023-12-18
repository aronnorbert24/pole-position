<template>
  <div class="mb-12 mt-10 phone:mt-24">
    <TitleSeparator title="Trending" />
    <div class="h-fit bg-white text-left">
      <div
        v-for="(article, index) in articleStore.getTrendingArticles"
        :key="index"
        class="py-1 transition-transform duration-300 ease-in-out hover:cursor-pointer hover:bg-slate-400 hover:underline"
      >
        <p class="text-md px-2 font-medium text-red-600" @click="getSingleArticle(article._id)">{{ article.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useArticleStore } from '../../stores/ArticleStore'
import TitleSeparator from '../baseComponents/TitleSeparator.vue'
import { useCommentStore } from '../../stores/CommentStore';

const router = useRouter()
const articleStore = useArticleStore()
const commentStore = useCommentStore()

async function getSingleArticle(id: string) {
  try {
    await articleStore.getArticleById(id)
    await commentStore.getSingleArticleComments(id)
    router.push({path: `/pole-position/article/${id}`})
  } catch (error) {
    console.error
    throw error
  }
}
</script>
