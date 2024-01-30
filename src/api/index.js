import http from './http'

/**
 * 注：api示例，可以结合 mock 使用：src/mock/index.js
 * @param {Object} data 请求参数
 * @param {Object} signal signal 是取消请求的令牌参数，如需支持取消请求，务必传入该参数；只有配合 useRequest 才生效；
 * @returns
 */
export const queryListApi = (data, signal) => {
  return http.post('/fox/test', data, { ...signal })
}

// mock用户信息
export const getUserIdApi = (params) => http.get('/mock/userId', { params })
