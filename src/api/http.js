import axios from 'axios'
import { showToast } from 'vant'
import 'vant/es/toast/style'

// 请求取消
const CancelToken = axios.CancelToken
const source = CancelToken.source()

// 创建axios实例
const instance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 20000,
	// 取消请求（比如你进入某个路由后，可能就停在了这个页面就1s时间， 就立马进入了下个路由，这时，前边这个路由的请求就可以取消掉了）
	cancelToken: source.token,
	// withCredentials: true,
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
	}
)

/** 添加响应拦截器  * */
instance.interceptors.response.use(
	(response) => {
		const { data, status } = response
		if (status === 200) {
			const { code, message } = data
			if (code === 9999) {
				showToast({ message, icon: 'fail' })
			} else {
				return data
			}
		}
	},
	(error) => {
		if (error.response) {
			console.log('error: ', error)
		}
	}
)

export default instance
