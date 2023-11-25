import { createRouter, createWebHistory } from 'vue-router'
import DashboardPole from '../views/DashboardPole.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPole,
    },
    /*{
      path: '/post/:id',
      name: 'post',
      component: PostView
    },
    {
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
