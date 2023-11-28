import { createRouter, createWebHistory } from 'vue-router'
import DashboardPole from '../views/DashboardPole.vue'
import CreateArticleView from '../views/CreateArticleView.vue'
import ArticlesByCategoryView from '../views/ArticlesByCategoryView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPole,
    },
    {
      path: '/create-article',
      name: 'create',
      component: CreateArticleView,
    },
    {
      path: '/category/:id',
      name: 'categories',
      component: ArticlesByCategoryView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResultsView,
    },
  ],
})

export default router
