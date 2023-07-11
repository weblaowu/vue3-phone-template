import { createRouter, createWebHistory } from 'vue-router'

const isProd = import.meta.env.PROD

const router = createRouter({
	history: createWebHistory(isProd ? '/qxb/marketing-material' : '/'),
	routes: [
		{
			path: '/',
			component: () => import('@/views/home.vue'),
		},
		{
			path: '/promission',
			component: () => import('@/components/NoPromission.vue'),
		},
	],
})

export default router
