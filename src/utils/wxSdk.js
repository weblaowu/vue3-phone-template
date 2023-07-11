import wx from 'weixin-js-sdk'

// 注入sdk，初始化设置
/**
 * @param {Object} conf
 * @param {string} conf.appId 公众号的唯一标识
 * @param {string} conf.timestamp 生成签名的时间戳
 * @param {string} conf.nonceStr 生成签名的随机串
 * @param {string} conf.signature 签名
 * @param {string} conf.jsApiList 需要使用的JS接口列表
 * @returns {Promise<boolean>} promise对象
 */
export function initWxConf(conf = {}) {
	return new Promise((resolve) => {
		wx.config({
			debug: false,
			appId: conf.appId,
			timestamp: conf.timestamp,
			nonceStr: conf.nonceStr,
			signature: conf.signature,
			// 分享朋友，分享朋友圈
			jsApiList: [
				'hideMenuItems',
				'updateAppMessageShareData',
				'updateTimelineShareData',
			],
			// 小程序跳转
			// openTagList: ['wx-open-launch-weapp'],
		})
		wx.ready(() => {
			wx.hideMenuItems({
				menuList: [
					'menuItem:copyUrl',
					'menuItem:favorite',
					'menuItem:share:qq',
					'menuItem:share:QZone',
				],
			})
			resolve(true)
		})
	})
}

/**
 * 微信分享
 * @param {Object} info 分享参数
 * @param {string} info.title  分享标题
 * @param {string} info.desc  分享描述
 * @param {string} info.link  分享链接：可以不是当前页面，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param {string} info.imgUrl  分享缩略图
 * @param {Function} onSuccess  成功回调参数
 */
export function setShareInfo(info, onSuccess) {
	// 分享朋友
	wx.updateAppMessageShareData({
		title: info.title,
		desc: info.desc,
		link: info.link,
		imgUrl: info.imgUrl,
		onSuccess: () => {
			console.log('updateAppMessageShareData: 1111')
		},
	})
	// 分享朋友圈
	wx.updateTimelineShareData({
		title: info.title,
		link: info.link,
		imgUrl: info.imgUrl,
		onSuccess: () => {
			console.log('updateTimelineShareData: 2222')
		},
	})
	onSuccess && onSuccess()
}
