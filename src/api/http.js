import axios from 'axios'
import { showToast } from 'vant'

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
})

/** 添加请求拦截器 * */
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

/** 添加响应拦截器  * */
instance.interceptors.response.use(
  (response) => {
    const { data, status } = response
    if (status === 200) {
      const { code, message } = data
      return code === 200 ? data : Promise.inject({ code, message })
    }
  },
  (error) => {
    if (!error.response) return Promise.reject(error)
    const { data, status } = error.response
    return Promise.reject({ data, status })
  },
)

export default instance
