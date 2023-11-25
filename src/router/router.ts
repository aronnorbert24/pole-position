import { createRouter, createWebHistory } from 'vue-router'
import DashboardPole from '../views/DashboardPole.vue'
import CreateArticleView from '../views/CreateArticleView.vue'

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
    /*{
      path: '/author/:username',
      name: 'author',
      component: AuthorView
    },
    {
      path: '/authors',
      name: 'authors',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AuthorsView.vue')
    }*/
  ],
})

export default router
