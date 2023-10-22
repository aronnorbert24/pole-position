<template>
  <div class="ml-2 w-3/5 rounded-xl bg-white p-2 text-center phone:w-11/12 computer:ml-auto computer:mr-auto">
    <label class="text-md mt-5 font-normal text-red-600">Please enter the title of the article:</label>
    <input
      type="text"
      maxlength="80"
      class="mt-2 w-full rounded-2xl bg-slate-200 p-2"
      :placeholder="article.title"
      v-model="updatedArticle.title"
    />
    <label class="text-md mt-5 text-red-600"> Please enter the subheading of your article:</label>
    <textarea
      type="text"
      class="mt-5 h-32 w-full rounded-2xl bg-slate-200 p-2"
      :placeholder="article.subheading"
      v-model="updatedArticle.subheading"
    >
    </textarea>

    <label class="text-md mt-5 font-normal text-red-600">Please write the content of the article here.</label>
    <label class="text-md font-semibold text-red-600">
      If you would like to emphasize a part of your article, include them in stars (* *):</label
    >
    <textarea
      type="text"
      class="mt-5 h-96 w-full rounded-2xl bg-slate-200 p-2"
      :placeholder="article.text"
      v-model="updatedArticle.text"
    >
    </textarea>
    <label class="text-md mt-5 font-normal text-red-600"
      >Please select the category of motorsport you are writing about in the article:</label
    >
    <ArticleCategory :category="updatedArticle.category" @updateNewCategory="updateCategory" />
    <label class="text-md font-normal text-red-600">Please select an image suitable to the article:</label>
    <input type="file" accept="image/*" class="ml-16 mt-5 w-full computer:ml-96" @change="uploadImage" />
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

const numberOfOccurences = ref<number>()
const updatedArticle = ref<Article>({
  title: props.article.title,
  subheading: props.article.subheading,
  text: props.article.text,
  separatedText: props.article.separatedText,
  category: props.article.category,
  image: props.article.image,
  datePublished: props.article.datePublished,
  likes: props.article.likes,
  views: props.article.views,
})

function updateCategory(category: string) {
  updatedArticle.value.category = category
}

function uploadImage(e: any) {
  const image = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onload = (e) => {
    if (!e.target) {
      return
    }
    if (e.target.result) {
      updatedArticle.value.image = e.target.result as string
    }
  }
}

function findChars(text: string, char: string) {
  const numberOfOccurences = text.split('').filter((element) => element === char).length
  return !numberOfOccurences ? 0 : numberOfOccurences
}

function emphasizeText(text: string) {
  const regex = /"([^"]+)"/g
  text = text.replace(regex, `<em>'$1'</em>`)
  return text.split('*')
}

function saveArticle() {
  numberOfOccurences.value = findChars(updatedArticle.value.text, '*')
  if (numberOfOccurences.value === 2) {
    updatedArticle.value.separatedText = emphasizeText(updatedArticle.value.text)
  } else {
    updatedArticle.value.separatedText.push(updatedArticle.value.text)
  }
  if (!updatedArticle.value.title.length) {
    return
  }
  updatedArticle.value.datePublished = new Date(Date.now())

  emit('saveArticle', updatedArticle.value)
}
</script>
