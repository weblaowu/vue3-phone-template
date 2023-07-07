import http from './http'

// 获取企业微信用户信息
export const getUserIdApi = (data) =>
	http.post('/certificate/enterpriseWechatOauth', data)

// 获取微信公众号用户信息
export const wechatOauthApi = (data) =>
	http.post('/certificate/wechatOauth', data)

// 获取js-SDK签名
export const sdkOauthApi = (data) => {
	return http.post('/material/shareMaterial', data)
}

// 埋点
export const saveDot = (data) => {
	return http.post('/material/saveDot', data)
}

/**
 * 查询素材
 * @param {object} data 入参
 * @returns promise
 */
export const getMaterialInfoApi = (data) => {
	return http.post('/material/getMaterialInfo', data)
}

// 查询菜单
export const getMenuFullApi = (data) => {
	return http.post('/material/getMenuFull', data)
}

// 查询标签
export const getLabelApi = (data) => {
	return http.post('/material/getLabel', data)
}

// 素材详情
export const getMaterialDetailApi = (data) => {
	return http.post('/material/getMaterialDetail', data)
}

// 分享素材
export const shareMaterialApi = (data) => {
	return http.post('/material/shareMaterial', data)
}
