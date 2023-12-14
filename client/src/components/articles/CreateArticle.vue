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
    <ErrorMessage v-if="errorMessage" :error="errorMessage" />
    <button class="mt-5 bg-slate-200" @click.prevent="save()">Save</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '../../stores/ArticleStore.ts'
import ArticleCategory from './ArticleCategory.vue'
import ErrorMessage from '../baseComponents/ErrorMessage.vue'
import { Article } from '../../types/article.ts'

const router = useRouter()
const articleStore = useArticleStore()

const numberOfOccurences = ref<number>()
const errorMessage = ref('')
const text = ref('Lorem ipsum dolor amet conquiro hongkong monkey so on so forth yadi yada lalalala yeyeye')
const updatedArticle = ref<Article>({
  _id: articleStore.newArticle._id,
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

async function save() {
  if (!updatedArticle.value.title.length) {
    return
  }

  numberOfOccurences.value = findChars(text.value, '*')
  numberOfOccurences.value % 2 === 0
    ? (updatedArticle.value.separatedText = emphasizeText(text.value))
    : updatedArticle.value.separatedText.push(text.value)

  if (!updatedArticle.value.separatedText.length) {
    errorMessage.value = 'Please enter something in the body of your article.'
  }
  updatedArticle.value.datePublished = new Date()

  try {
    articleStore.newArticle._id ? await articleStore.editArticle(updatedArticle.value) : await articleStore.saveArticle(updatedArticle.value)
    router.go(-1)
  } catch (error: any) {
    errorMessage.value = error.message
    console.error(error)
    throw error
  }
}
</script>
