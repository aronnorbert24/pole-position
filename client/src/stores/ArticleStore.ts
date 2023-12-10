import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Article } from '../types/article'
import { save, getArticles, getArticlesByCategory, getSingleArticle, editArticle, deleteArticle } from '../services/article'

export const useArticleStore = defineStore({
  id: 'article',
  state: () => ({
    articles: [] as Article[],
    articlesBySport: [] as Article[],
    newArticle: {
      _id: '',
      title: 'Article Title',
      subheading: 'Lorem ipsum dolor amet conquiro hongkong monkey so on so forth yadi yada lalalala yeyeye',
      separatedText: [],
      image:
        'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd',
      category: 'F1',
      datePublished: new Date(),
      likedBy: [],
      likes: 0,
      views: 0,
    } as Article,
    singleArticle: {
      _id: '',
      title: 'Article Title',
      subheading: 'Lorem ipsum dolor amet conquiro hongkong monkey so on so forth yadi yada lalalala yeyeye',
      separatedText: [],
      image:
        'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eexpq2iz9v2mv5lmj5fd',
      category: 'F1',
      datePublished: new Date(),
      likedBy: [],
      likes: 0,
      views: 0,
    } as Article,
    searchQuery: '',
    searchedArticles: [] as Article[],
  }),
  getters: {
    getSearchedArticles: (state) => {
      if (!state.searchQuery) {
        state.searchedArticles = []
        return []
      }

      state.searchedArticles = state.articles.filter((article: Article) => {
        const filterSmall = state.searchQuery.toLowerCase()
        const titleSmall = article.title.toLowerCase()
        const subheadingSmall = article.subheading.toLowerCase()
        return titleSmall.includes(filterSmall) || subheadingSmall.includes(filterSmall)
      })
      return state.searchedArticles
    },
    getSearchedArticlesPopup: (state) => {
      if (state.searchedArticles.length === 0) {
        return []
      }
      return state.searchedArticles.slice(0, 3)
    },
    getArticlesBySport: (state) => {
      return state.articlesBySport
    },
    getTrendingArticles: (state) => {
      if (state.articles.length === 0) {
        return []
      }
      return state.articles
        .sort((a: Article, b: Article) => {
          return a.views < b.views ? 1 : a.views > b.views ? -1 : 0
        })
        .slice(0, 5)
    },
    getSingleArticle: (state) => {
      return state.singleArticle
    }
  },
  actions: {
    async saveArticlesToLocalStorage() {
      localStorage.setItem('articles', JSON.stringify(this.articles))
    },
    async getArticlesFromDatabase() {
      try {
        this.articles = await getArticles()
        this.getArticlesByCategory('F1')
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async getArticleById(articleId: string | string[]) {
      const article: Article = await getSingleArticle(articleId)
      this.singleArticle = article ? article : this.newArticle
    },
    async getArticlesByCategory(category: string | string[]) {
      const articles: Article[] = await getArticlesByCategory(category)
      this.articlesBySport = articles ? articles : []
      return articles
    },
    setNewArticle(article: Article) {
      this.newArticle = article
    },
    async saveArticle(article: Article) {
      try {
        await save(article)
        const id: string = localStorage.getItem('articleId')!
        const newArticle: Article = {
          _id: id,
          title: article.title,
          subheading: article.subheading,
          separatedText: article.separatedText,
          image: article.image,
          category: article.category,
          datePublished: article.datePublished,
          likedBy: article.likedBy,
          likes: article.likes,
          views: article.views,       
        }
        this.articles.unshift(newArticle)
        this.saveArticlesToLocalStorage()
      } catch (error) {
        console.error(error)
        throw error
      }
      
    },
    searchArticles(search: string) {
      this.searchQuery = search
      this.getSearchedArticles
    },
    clearSearchQuery() {
      this.searchQuery = ''
    },
    likedArticle(article: Article, isPostLiked: boolean, userId: string) {
      const updatedArticle = ref<Article>(article)
      if (updatedArticle.value) {
        const index = updatedArticle.value.likedBy.findIndex((user) => user === userId)
        if (isPostLiked) {
          if (index < 0) {
            updatedArticle.value.likedBy.push(userId)
          }
          updatedArticle.value.likes++
        } else if (updatedArticle.value.likes >= 1) {
          if (index >= 0) {
            updatedArticle.value.likedBy.splice(index, 1)
          }
          updatedArticle.value.likes--
        } else {
          return
        }
      }
      const i = this.articles.findIndex((a) => a._id === updatedArticle.value._id)
      this.articles[i] = updatedArticle.value
      this.getArticleById(updatedArticle.value._id)
      this.saveArticlesToLocalStorage()
    },
    async editArticle(article: Article) {
      const newArticle = await editArticle(article)
      const index = this.articles.findIndex((article: Article) => article._id === newArticle._id)
      this.articles[index] = newArticle
      this.saveArticlesToLocalStorage()
    },
    async deleteArticle(id: string) {
      await deleteArticle(id)
      this.articles = this.articles.filter((article) => article._id !== id)
      this.saveArticlesToLocalStorage()
    },
    emptyNewArticle() {
      this.newArticle._id = ''
    }
  },
})
