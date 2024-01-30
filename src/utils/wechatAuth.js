import { getUserIdApi } from '../api/index'
import { showFailToast } from 'vant'
import { Session } from './storage'
// 进入鉴权
export const authorizeAndTrack = (code, next) => {
  if (!code) {
    goToWxAuthorizeUrl()
  } else {
    // 用户鉴权
    getUserIdApi({ code }).then((res) => {
      const { code: status, message, data } = res
      if ([-1, -2].includes(status)) {
        showFailToast(message)
        return next('/promission')
      }
      cacheInfo(data)
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

function cacheInfo(data) {
  Session.set('user_info', data)
}
