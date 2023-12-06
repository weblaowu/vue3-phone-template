import { createRouter, createWebHistory } from 'vue-router'

const baseUrl = import.meta.env.VITE_APP_BASE_URL

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: '/',
      component: () => import('@/views/index.vue'),
    },
    {
      path: '/home',
      component: () => import('@/views/home.vue'),
    },
    {
      path: '/promission',
      component: () => import('@/components/NoPromission.vue'),
    },
  ],
})

export default router
