import { wechatOauthApi, saveDot } from '../../api/index'
import { showFailToast } from 'vant'
import 'vant/es/toast/style'

// 公众号鉴权
const goToWxAuthorizeUrl = () => {
	// 微信公众号 appid
	const appid = 'wx5e27cbdd9d88764c'
	const url = location.href
	// 重定向获取code
	location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
		url
	)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

/**
 * 进入素材详情页：
 * 判断进入当前页的路由是否包含share标识，如果有表示从分享链接来源，那就走公众号鉴权；否则走企微鉴权
 */

const wxPromission = (to, _, next) => {
	const { share, code, materialId, userId } = to.query
	console.log('wxPromission:to.query:~~~~~ ', to.query)
	if (!code) {
		// 如果是来自分享，就走公众号鉴权；标识：share = 1；
		if (share != 1) return next()
		goToWxAuthorizeUrl()
	} else {
		// 已走过公众号鉴权，获取公众号用户信息
		wechatOauthApi({ code }).then((res) => {
			const { code: status, message, data } = res
			// 获取用户信息
			if ([-2, -7].includes(status)) {
				showFailToast(message)
				return next('/promission')
			}
			const { openId } = data
			if (!openId) return showFailToast('没有获取到openId')
			querySaveDot({ materialId, userId, openId })
			next()
		})
	}
}

// 调用埋点
function querySaveDot(params) {
	// console.log('执行埋点~~~~')
	saveDot(params)
}

export default wxPromission
