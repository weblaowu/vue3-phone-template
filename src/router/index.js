import { createRouter, createWebHistory } from 'vue-router'

const baseUrl = import.meta.env.VITE_PUBLIC_PATH

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
    /* 正式环境删除该路由 */
    {
      path: '/demo',
      component: () => import('@/views/demo.vue'),
    },
  ],
})

export default router
