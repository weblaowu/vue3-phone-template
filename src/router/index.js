import { createRouter, createWebHistory } from 'vue-router'
import wxPromission from '../tools/utils/wxPromission.js'

const isProd = import.meta.env.PROD

const router = createRouter({
	history: createWebHistory(isProd ? '/qxb/marketing-material' : '/'),
	routes: [
		{
			path: '/',
			component: () => import('@/views/home.vue'),
		},
		{
			path: '/detail',
			component: () => import('@/views/detail.vue'),
			beforeEnter: [wxPromission],
		},
		{
			path: '/search',
			component: () => import('@/views/search.vue'),
		},
		{
			path: '/promission',
			component: () => import('@/components/NoPromission.vue'),
		},
	],
})

export default router
