import router from './router'
import { getUserIdApi } from './api/index'
import { showFailToast } from 'vant'
import 'vant/es/toast/style'

// 重定向获取code
const goToWxAuthorizeUrl = () => {
	// 企微appId
	const appid = 'wxe8c2710f51e9ee56'
	const path = location.href.split('?')
	const url = path[0] || ''
	location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
		url
	)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

// 进入鉴权
export const authorizeAndTrack = (code, callback, next) => {
	if (!code) {
		goToWxAuthorizeUrl()
	} else {
		// 没code，说明是从公众号进来的，需要先去微信鉴权获取code
		// 说明是微信鉴权之后，需要通过code换取用户信息
		getUserIdApi({ code }).then((res) => {
			const { code: status, message, data } = res
			// 获取用户信息
			if ([-1, -2].includes(status)) {
				showFailToast(message)
				return next('/promission')
			}
			const { userId } = data
			if (!userId) return showFailToast('没有获取到userId')
			callback && callback(code, userId)
		})
	}
}

// 路由进入之前
router.beforeEach((to, _, next) => {
	// 无权限页面直接进入
	if (to.path === '/promission') return next()
	// 微信鉴权
	const sessionCode = sessionStorage.getItem('code')
	// 如果 sessionCode 存在，表示已经经过微信授权，获取到了code
	if (sessionCode || to.path === '/detail') return next()
	const code = import.meta.env.MODE === 'production' ? to.query.code : '123456'
	authorizeAndTrack(
		code,
		(code, userId) => {
			cacheCode(code, userId)
			next()
		},
		next
	)
})

// 缓存code和openid
function cacheCode(code, userId) {
	sessionStorage.setItem('code', code)
	sessionStorage.setItem('userId', userId)
}
