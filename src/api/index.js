import http from './http'

// 获取公众号用户信息
export const getUserIdApi = (data) =>
  http.post('/certificate/wechatOauth', data)

// 获取js-sdk签名
export const sdkOauthApi = (data) => {
  return http.post('/material/shareMaterial', data)
}

// test 注：signal 是取消请求的令牌参数，如需支持取消请求，务必传入该参数
export const queryListApi = (data, signal) => {
  return http.post('/fox/test', data, signal)
}
