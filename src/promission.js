import router from './router'
import { getUserIdApi } from './api/index'
import { showFailToast } from 'vant'

// 重定向获取code
const goToWxAuthorizeUrl = () => {
	const appid = '123456'
	const path = location.href.split('#')[0]
	location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
		path
	)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

// 进入鉴权
export const authorizeAndTrack = (code, next, cb) => {
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
			cb && cb(code, openId)
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
	authorizeAndTrack(code, next, (code, openId) => {
		cacheCode(code, openId)
		next()
	})
})

// 缓存code和openid
function cacheCode(code, openId) {
	sessionStorage.setItem('code', code)
	sessionStorage.setItem('openid', openId)
}
