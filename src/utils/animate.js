/**
 * Lottie 动画
 * @param {document} elem DOM对象
 * @param {json} animationData json数据
 * @param {object} opt 额外选项
 * @returns
 */
export const lottieAnimate = (elem, animationData, opt = {}) => {
	// return lottie.loadAnimation({
	// 	container: elem, // 绑定dom节点
	// 	renderer: 'svg', // 渲染方式:svg、canvas
	// 	loop: false, // 是否循环播放，默认：false
	// 	autoplay: true, // 是否自动播放, 默认true
	// 	animationData: animationData, // AE动画使用bodymovie导出为json数据
	// 	...opt,
	// })
}

/**
 * animate 封装，需借助第三方库 Animate.css
 * @param {string} element 要获取的DOM元素的classNam或id
 * @param {string} animation 需要实现的动画className
 */
export function animateCSS(element, animation, prefix = 'animate__') {
	// We create a Promise and return it
	new Promise((resolve) => {
		const animationName = `${prefix}${animation}`
		const node =
			element instanceof Element ? element : document.querySelector(element)
		node.classList.add(`${prefix}animated`, animationName)
		// When the animation ends, we clean the classes and resolve the Promise
		function handleAnimationEnd(event) {
			event.stopPropagation()
			node.classList.remove(`${prefix}animated`, animationName)
			resolve('Animation ended')
		}
		node.addEventListener('animationend', handleAnimationEnd, { once: true })
	})
}
