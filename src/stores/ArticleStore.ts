import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Article } from '../types/article'

export const useArticleStore = defineStore({
  id: 'article',
  state: () => ({
    articles: [] as Article[],
    newArticle: {
      articleId: 0,
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
      articleId: 0,
      title: '',
      subheading: '',
      separatedText: [],
      image: '',
      category: '',
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
    getArticlesByCategory: (state) => {
      return (title: string) =>
        title === 'F1'
          ? state.articles.filter((article) => article.category === 'F1')
          : title === 'F2'
            ? state.articles.filter((article) => article.category === 'F2')
            : title === 'F3'
              ? state.articles.filter((article) => article.category === 'F3')
              : title === 'WEC'
                ? state.articles.filter((article) => article.category === 'WEC')
                : state.articles.filter((article) => article.category === 'MotoGP')
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
      return (articleId: number) => state.articles.find((article) => article.articleId === articleId)
    },
  },
  actions: {
    async saveToLocalStorage() {
      localStorage.setItem('articles', JSON.stringify(this.articles))
    },
    async getFromLocalStorage() {
      const savedArticles = localStorage.getItem('articles')
      this.articles = savedArticles ? JSON.parse(savedArticles) : []
    },
    viewedArticle(article: Article) {
      const updatedArticle = article
      const index = this.articles.findIndex((a) => a.articleId === article.articleId)
      updatedArticle.views++
      this.articles[index] = updatedArticle
      this.saveToLocalStorage()
    },
    saveArticle(article: Article) {
      this.articles.unshift(article)
      this.saveToLocalStorage()
    },
    searchArticles(search: string) {
      this.searchQuery = search
    },
    clearSearchQuery() {
      this.searchQuery = ''
    },
    likedArticle(article: Article, isPostLiked: boolean, userId: string) {
      const updatedArticle = ref<Article>(article)
      if (isPostLiked) {
        updatedArticle.value.likes++
      } else if (updatedArticle.value.likes >= 1) {
        updatedArticle.value.likes--
      } else {
        return
      }
      if (updatedArticle.value) {
        const index = updatedArticle.value.likedBy.findIndex((user) => user === userId)
        if (isPostLiked && index < 0) {
          updatedArticle.value.likedBy.push(userId)
        } else {
          if (index >= 0) {
            updatedArticle.value.likedBy.filter((id) => id !== userId)
          }
        }
      }
      const i = this.articles.findIndex((a) => a.articleId === updatedArticle.value.articleId)
      this.articles[i] = updatedArticle.value
      this.saveToLocalStorage()
    },
  },
})