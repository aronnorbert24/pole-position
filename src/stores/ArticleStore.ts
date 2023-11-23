import { defineStore } from 'pinia'
import { Article } from '../types/article'

export const useArticleStore = defineStore({
  id: 'article',
  state: () => ({
    articles: [] as Article[],
    newArticle: {
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
      if (state.articles.length === 0) {
        return []
      }
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
      return (articleId: )
    }
  },
  actions: {
    async saveToLocalStorage() {
      localStorage.setItem('articles', JSON.stringify(this.articles))
    },
    async getFromLocalStorage() {
      const savedArticles = localStorage.getItem('articles')
      this.articles = savedArticles ? JSON.parse(savedArticles) : []
    },
  },
})
