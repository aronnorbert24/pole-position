<template>
  <div class="ml-auto mr-auto w-3/5 rounded-xl bg-white p-2 text-center">
    <label class="text-md mt-5 font-normal text-red-600">Please enter the title of the article:</label>
    <input
      type="text"
      maxlength="80"
      class="mt-2 w-full rounded-2xl bg-slate-200 p-2"
      :placeholder="article.title"
      v-model="updatedArticle.title"
    />

    <label class="text-md mt-5 font-normal text-red-600">Please write the content of the article here.</label>
    <label class="text-md font-semibold text-red-600">
      If you would like to emphasize a part of your article, include them in quotes (" "):</label
    >
    <textarea
      type="text"
      class="mt-5 w-full rounded-2xl bg-slate-200 p-2"
      :placeholder="article.text"
      v-model="updatedArticle.text"
    >
    </textarea>
    <label class="text-md mt-5 font-normal text-red-600"
      >Please select the category of motorsport you are writing about in the article:</label
    >
    <ArticleCategory :category="updatedArticle.category" @updateNewCategory="updateCategory" />
    <button class="mt-5 bg-slate-200" @click.prevent="saveArticle()">Save</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArticleCategory from './ArticleCategory.vue'
import { Article } from '../../types/article.ts'

interface Props {
  article: Article
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'saveArticle', article: Article): void
}>()

const updatedArticle = ref<Article>({
  title: props.article.title,
  text: props.article.text,
  category: props.article.category,
  image: props.article.image,
  datePublished: props.article.datePublished,
  likes: props.article.likes,
  views: props.article.views,
})

function updateCategory(category: string) {
  updatedArticle.value.category = category
}

function saveArticle() {
  if (!updatedArticle.value.title.length) {
    return
  }
  updatedArticle.value.datePublished = new Date(Date.now())

  emit('saveArticle', updatedArticle.value)
}
</script>
