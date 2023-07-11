import { isObject } from './type'

export function queryString(data) {
	let keyValue = ''
	Object.keys(data).forEach((key) => {
		keyValue += `${key}=${data[key]}`
	})
	return keyValue
}

/**
 * 导出json文件
 * @param {blob} data blob文件流
 * @param {string} fileName 文件名
 */
export function exportToJSON(data, fileName = '导出.xls') {
	const uri = window.URL.createObjectURL(new Blob([data]))
	// 通过创建a标签实现
	const link = document.createElement('a')
	link.href = uri
	// 对下载的文件命名
	link.download = fileName
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	window.URL.revokeObjectURL(uri)
}

/**
 * 格式化时间
 * @param {object | string} params
 * @param {string} params.date 时间字符串
 * @param {string} params.separator 年月日时间分隔符
 * @param {boolean} params.showHour 是否显示时分秒
 */
export function formatDate(params) {
	// 判断params的数据格式
	let date = null,
		separator = '-',
		showHour = true
	if (isObject(params)) {
		params.date && (date = new Date(params.date))
		params.separator && (separator = params.separator)
		params.showHour !== undefined && (showHour = params.showHour)
	} else {
		date = params ? new Date(params) : new Date()
	}
	//获取年月日，时间
	const year = date.getFullYear()
	const mon =
		date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
	const data = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	const min =
		date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	const seon =
		date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	const _newYear = `${year}${separator}${mon}${separator}${data}`
	const _newHour = `${hour}:${min}:${seon}`
	const _newDate = showHour ? `${_newYear} ${_newHour}` : _newYear
	return _newDate
}
