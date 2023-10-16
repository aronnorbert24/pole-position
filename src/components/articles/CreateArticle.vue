<template>
  <div>
    <input type="text" maxlength="80" :placeholder="article.title" v-model="updatedArticle.title" />
    <input type="text" :placeholder="article.text" v-model="updatedArticle.text" />
    <input type="radio" id="f1" name="category" value="F1" v-model="updatedArticle.category" />
    <label for="f1">F1</label>
    <input type="radio" id="f2" name="category" value="F2" v-model="updatedArticle.category" />
    <label for="f2">F2</label>
    <input type="radio" id="f3" name="category" value="F3" v-model="updatedArticle.category" />
    <label for="f3">F3</label>
    <input type="radio" id="wec" name="category" value="WEC" v-model="updatedArticle.category" />
    <label for="wec">WEC</label>
    <input type="radio" id="motogp" name="category" value="MotoGP" v-model="updatedArticle.category" />
    <label for="motogp">MotoGP</label>
    <button @click.prevent="saveArticle()">Save</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

function saveArticle() {
  if (!updatedArticle.value.title.length) {
    return
  }
  updatedArticle.value.datePublished = new Date(Date.now())

  emit('saveArticle', updatedArticle.value)
}
</script>
