import lottie from 'lottie-web'
//格式化时间
export function formatDate({ date, separator = '-' }) {
	//获取年月日，时间
	var year = date.getFullYear()
	var mon =
		date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
	var data = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	var seon =
		date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

	var newDate =
		year +
		separator +
		mon +
		separator +
		data +
		' ' +
		hour +
		':' +
		min +
		':' +
		seon
	return newDate
}

// 校验数字加英文字母
export const validateEnAndNum = /^[0-9a-zA-Z]+$/gi

// 读取图片
export const getImgUrl = (img, format = 'svg') => {
	return new URL(`../../assets/image/${img}.${format}`, import.meta.url).href
}

// 判断promise 类型
export function isPromise(p) {
	return Object.prototype.toString.call(p) === '[object Promise]'
}

export function isFunction(p) {
	return Object.prototype.toString.call(p) === '[object Function]'
}

// 合并目标数据到源数据，不改变源数据结构和值，返回新的数据
export function mergeData(source, target = {}) {
	const data = { ...source }
	for (let key of Object.keys(data)) {
		const value = target[key]
		if (value !== undefined) {
			data[key] = value
		}
	}
	return data
}

// 判断是否是IOS
export const isIOS = (() => {
	return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
})()

// 判断是否是安卓
export const isAndroid = (() => {
	return /android/.test(navigator.userAgent.toLowerCase())
})()

// 判断是否是微信内置浏览器
export function isWeixin() {
	var ua = navigator.userAgent.toLowerCase()
	return ua.match(/MicroMessenger/i) == 'micromessenger'
}

// animate 封装，需借助第三方库 animate.css
export function animateCSS(element, animation, prefix = 'animate__') {
	new Promise((resolve) => {
		// const animationName = `${prefix}${animation}`
		const node = document.querySelector(element)
		if (!node) return resolve(null)
		node.classList.add(`${prefix}animated`, animation)
		// When the animation ends, we clean the classes and resolve the Promise
		function handleAnimationEnd(event) {
			event.stopPropagation()
			node.classList.remove(`${prefix}animated`, animation)
			resolve('Animation ended')
		}
		node.addEventListener('animationend', handleAnimationEnd, { once: true })
	})
}

// Lottie 动画
export const lottieAnimate = (el, animationData, opt = {}) => {
	return lottie.loadAnimation({
		container: document.getElementById(el), // 绑定dom节点
		renderer: 'svg', // 渲染方式:svg、canvas
		loop: false, // 是否循环播放，默认：false
		autoplay: true, // 是否自动播放, 默认true
		animationData, // AE动画使用bodymovie导出为json数据
		...opt,
	})
}

export const getSessionStore = (info) => {
	let data = {}
	try {
		// sessionStorage.getItem()
		data = JSON.parse(info) || {}
	} catch (err) {
		console.log('JSON.parse err', err)
		return {}
	}
	return data
}

// 手机号正则
export const regPhone =
	/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
