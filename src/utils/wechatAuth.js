import { getUnionidApi } from '../api/index'
import { showFailToast } from 'vant'
import { Session } from './storage'
// 进入鉴权
export const authorizeAndTrack = (code, next) => {
  if (!code) {
    goToWxAuthorizeUrl()
  } else {
    // 没code，说明是从公众号进来的，需要先去微信鉴权获取code
    getUnionidApi({ code }).then((res) => {
      const { code: status, message, data } = res
      // 获取用户信息
      if ([-1, -2].includes(status)) {
        showFailToast(message)
        return next('/promission')
      }
      const { openid } = data
      if (!openid) return showFailToast('没有获取到用户信息')
      cacheId(openid)
      next()
    })
  }
}

// 重定向获取code
const goToWxAuthorizeUrl = () => {
  const appid = '123456'
  const path = location.href.split('#')[0]
  location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
    path,
  )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

// openid
function cacheId(openid) {
  Session.set('openid', openid)
}
