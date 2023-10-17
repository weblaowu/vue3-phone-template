// 判断promise 类型
export function isPromise(p) {
  return Object.prototype.toString.call(p) === '[object Promise]'
}

export function isFunction(p) {
  return Object.prototype.toString.call(p) === '[object Function]'
}

export function isObject(p) {
  return Object.prototype.toString.call(p) === '[object Object]'
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
