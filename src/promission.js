import router from './router'
import { getUserIdApi } from './api/index'
import { showFailToast } from 'vant'
import 'vant/es/toast/style'

// 重定向获取code
const goToWxAuthorizeUrl = () => {
	const appid = '123456'
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
		getUserIdApi({ code }).then((res) => {
			const { code: status, message, data } = res
			// 获取用户信息
			if ([-1, -2].includes(status)) {
				showFailToast(message)
				return next('/promission')
			}
			const { openId } = data
			if (!openId) return showFailToast('没有获取到openId')
			callback && callback(code, openId)
		})
	}
}

// 路由进入之前
router.beforeEach((to, _, next) => {
	// 无权限页面直接进入
	if (to.path === '/promission') return next()
	const sessionCode = sessionStorage.getItem('code')
	// 如果 sessionCode 存在，表示已经经过微信授权，获取到了code
	if (sessionCode) return next()
	const code = import.meta.env.MODE === 'production' ? to.query.code : '123'
	authorizeAndTrack(
		code,
		(code, openId) => {
			cacheCode(code, openId)
			next()
		},
		next
	)
})

// 缓存code和openid
function cacheCode(code, openId) {
	sessionStorage.setItem('code', code)
	sessionStorage.setItem('openid', openId)
}
