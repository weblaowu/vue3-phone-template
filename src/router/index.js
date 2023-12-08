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
      path: '/promission',
      component: () => import('@/components/NoPromission.vue'),
    },
    /* 正式项目请去除改路由 */
    {
      path: '/demo',
      component: () => import('@/views/demo.vue'),
    },
  ],
})

export default router
