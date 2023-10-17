/** 初始化微信
 * @param {object} conf
 * @param {string} conf.appId 公众号的唯一标识
 * @param {string} conf.timestamp 生成签名的时间戳
 * @param {string} conf.nonceStr 生成签名的随机串
 * @param {string} conf.signature 签名
 * @param {string} conf.jsApiList 需要使用的JS接口列表
 * @returns {Promise<boolean>} promise对象
 */
export function initWxConf(conf = {}) {
  return new Promise((resolve) => {
    window.wx.config({
      debug: false,
      appId: conf.appId,
      timestamp: conf.timestamp,
      nonceStr: conf.nonceStr,
      signature: conf.signature,
      jsApiList: [
        // 需要调用的JS接口列表
        'hideMenuItems',
        'onMenuShareAppMessage', // 分享
        // 'onMenuShareTimeline', // 分享朋友圈
      ],
      // 小程序跳转sdk
      // openTagList: ['wx-open-launch-weapp'],
    })
    window.wx.ready(() => {
      window.wx.hideMenuItems({
        menuList: hideMenuList(),
      })
      resolve(true)
    })
  })
}

/** 初始化企业微信
 * @param {object} conf
 * @param {string} conf.timestamp 生成签名的时间戳
 * @param {string} conf.nonceStr 生成签名的随机串
 * @param {string} conf.signature 签名
 * @param {string} conf.jsApiList 需要使用的JS接口列表
 * @returns {Promise<boolean>} promise对象
 */
export function initQwxConf(conf = {}) {
  return new Promise((resolve) => {
    window.wx.agentConfig({
      beta: true,
      debug: true,
      corpid: '',
      agentid: '',
      timestamp: conf.timestamp,
      nonceStr: conf.nonceStr,
      signature: conf.signature,
      jsApiList: [
        // 需要调用的JS接口列表
        'hideMenuItems',
        'onMenuShareAppMessage', // 分享
        // 'onMenuShareTimeline', // 分享朋友圈
      ],
      success: () => {
        window.wx.hideMenuItems({
          menuList: hideMenuList(),
        })
        resolve(true)
      },
      fail: (res) => {
        console.log('agentConfig: fail', res)
        if (res.errMsg.indexOf('function not exist') > -1) {
          window.alert('版本过低请升级')
        }
      },
    })
  })
}

/** 注册分享
 * @param {Object} info 分享参数
 * @param {string} info.title  分享标题
 * @param {string} info.desc  分享描述
 * @param {string} info.link  分享链接：可以不是当前页面，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param {string} info.imgUrl  分享缩略图
 * @param {Function} onSuccess  成功回调参数
 */
export function onQwxShare(info, onSuccess) {
  window.wx.onMenuShareAppMessage({
    title: info.title,
    desc: info.desc,
    link: info.link,
    imgUrl: info.imgUrl,
  })
  onSuccess && onSuccess()
}

/**
 * 图片预览
 * @param {array} urls
 */
export function previewImage(urls) {
  window.wx.previewImage({
    current: urls[0], // 当前显示图片的http链接
    urls, // 需要预览的图片http链接列表
  })
}

function hideMenuList() {
  return [
    'menuItem:copyUrl',
    'menuItem:favorite',
    'menuItem:share:qq',
    'menuItem:share:QZone',
    'menuItem:refresh',
    'menuItem:openWithSafari',
    'menuItem:openWithQQBrowser',
  ]
}
