<template>
  <div class="rounded-xl bg-white p-2 text-center computer:ml-auto computer:mr-10 computer:w-3/5">
    <label class="text-md mt-5 font-normal text-red-600">Please enter the title of the article:</label>
    <input
      type="text"
      maxlength="80"
      class="mt-2 w-full rounded-2xl bg-slate-200 p-2 text-black"
      :placeholder="articleStore.newArticle.title"
      v-model="updatedArticle.title"
    />
    <label class="text-md mt-5 text-red-600"> Please enter the subheading of your article:</label>
    <textarea
      type="text"
      class="mt-5 h-32 w-full rounded-2xl bg-slate-200 p-2 text-black"
      :placeholder="articleStore.newArticle.subheading"
      v-model="updatedArticle.subheading"
    >
    </textarea>

    <label class="text-md mt-5 font-normal text-red-600">Please write the content of the article here.</label>
    <label class="text-md font-semibold text-red-600">
      If you would like to emphasize a part of your article, include them in stars (* *):</label
    >
    <textarea
      type="text"
      class="mt-5 h-96 w-full rounded-2xl bg-slate-200 p-2 text-black"
      :placeholder="text"
      v-model="text"
    >
    </textarea>
    <label class="text-md mt-5 font-normal text-red-600"
      >Please select the category of motorsport you are writing about in the article:</label
    >
    <ArticleCategory :category="updatedArticle.category" @updateNewCategory="updateCategory" />
    <label class="text-md font-normal text-red-600">Please select an image suitable to the article:</label>
    <input type="file" accept="image/*" class="ml-56 mt-5 w-full phone:ml-16" @change="uploadImage" />
    <RouterLink to="/pole-position/" class="mt-5 bg-slate-200" @click.prevent="save()">Save</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useArticleStore } from '../../stores/ArticleStore.ts'
import ArticleCategory from './ArticleCategory.vue'
import { Article } from '../../types/article.ts'

const articleStore = useArticleStore()

const numberOfOccurences = ref<number>()
const text = ref('Lorem ipsum dolor amet conquiro hongkong monkey so on so forth yadi yada lalalala yeyeye')
const updatedArticle = ref<Article>({
  articleId: articleStore.newArticle.articleId,
  title: articleStore.newArticle.title,
  subheading: articleStore.newArticle.subheading,
  separatedText: articleStore.newArticle.separatedText,
  category: articleStore.newArticle.category,
  image: articleStore.newArticle.image,
  datePublished: articleStore.newArticle.datePublished,
  likedBy: articleStore.newArticle.likedBy,
  likes: articleStore.newArticle.likes,
  views: articleStore.newArticle.views,
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

function findChars(body: string, char: string) {
  const numberOfOccurences = body.split('').filter((element) => element === char).length
  return numberOfOccurences ?? 0
}

function emphasizeText(body: string) {
  return body.split('*')
}

function save() {
  if (!updatedArticle.value.title.length) {
    return
  }

  numberOfOccurences.value = findChars(text.value, '*')
  numberOfOccurences.value % 2 === 0
    ? (updatedArticle.value.separatedText = emphasizeText(text.value))
    : updatedArticle.value.separatedText.push(text.value)

  updatedArticle.value.datePublished = new Date()
  updatedArticle.value.articleId = new Date().getTime()

  articleStore.saveArticle(updatedArticle.value)
}
</script>
