<template>
  <div>
    <input type="text" maxlength="100" placeholder="article" v-model="updatedArticle.title" />
    <button @click.prevent="saveArticle()">Save</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Article from '../types/article'

interface Props {
  article: Article
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'saveArticle', article: Article): void
}>()

const updatedArticle = ref<Article>({
  title: props.article.title,
  datePublished: props.article.datePublished,
  likes: props.article.likes,
})

function saveArticle() {
  if (!updatedArticle.value.title.length) {
    return
  }
  updatedArticle.value.datePublished = new Date(Date.now())

  emit('saveArticle', updatedArticle.value)
}
</script>
