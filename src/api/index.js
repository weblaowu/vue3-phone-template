import http from './http'

// 获取公众号用户信息
export const getUserIdApi = (data) =>
  http.post('/certificate/wechatOauth', data)

// 获取js-sdk签名
export const sdkOauthApi = (data) => {
  return http.post('/material/shareMaterial', data)
}

// test
export const queryListApi = (data) => {
  return http.post('/fox/test', data)
}
