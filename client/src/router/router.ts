import { createRouter, createWebHistory } from 'vue-router'
import DashboardPole from '../views/DashboardPole.vue'
import Login from '../views/PoleLogin.vue'
import Register from '../views/PoleRegister.vue'
import CreateArticleView from '../views/CreateArticleView.vue'
import ArticlesByCategoryView from '../views/ArticlesByCategoryView.vue'
import SingleArticleView from '../views/SingleArticleView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/pole-position/',
      name: 'dashboard',
      component: DashboardPole,
    },  {
      path: '/pole-position/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/pole-position/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/pole-position/create-article',
      name: 'create',
      component: CreateArticleView,
    },
    {
      path: '/pole-position/category/:id',
      name: 'categories',
      component: ArticlesByCategoryView,
    },
    {
      path: '/pole-position/article/:id',
      name: 'single',
      component: SingleArticleView,
    },
    {
      path: '/pole-position/search',
      name: 'search',
      component: SearchResultsView,
    },
  ],
})

export default router
