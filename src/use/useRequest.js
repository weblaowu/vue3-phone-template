import { mergeData, isFunction } from '@/tools/utils/index.js'
// 默认的配置项
const defaultConfig = {
	loadingDelay: 500, // loading 延迟时间
	loadingKeep: 300, // loading 保持时间
	initialData: [], // data 数据格式
	immediate: false, // 是否立即发起请求
}

/**
 * 基于 axios 的 request hook
 * @param {Promise} promiseData promise对象
 * @param {Object} param1 参数对象
 * @param {Object} param1.params 请求入参
 * @param {Function} param1.onSuccess 请求成功的回调
 * @param {Object} param1.options 初始化配置参数
 * @returns {Object} 对象
 */
const useRequest = (
	promiseData,
	{ onSuccess, params: outParams, ...options } = {}
) => {
	if (!isFunction(promiseData)) {
		throw new Error('useRequest第一个参数必须是函数并且它返回一个promise对象')
	}
	const paramsRef = unref(outParams)
	// console.log('paramsRef: ', { ...paramsRef })
	// 执行 loading 的定时器
	let temp = { timerLoad: null, finallyDelay: 0 }
	// 合并传入的自定义参数
	const { loadingDelay, loadingKeep, immediate, initialData } = mergeData(
		defaultConfig,
		options
	)
	// 返回的 data
	const data = ref(initialData)
	const error = ref(null)
	const loading = ref(false)
	// 执行请求方法
	const run = async (inParams, runSuccess) => {
		handleLoading(loading, loadingDelay, temp)
		const startDate = new Date().getTime()
		// params 是执行 run 方法传入的请求参数
		const params = { ...paramsRef, ...inParams }
		return promiseData(params)
			.then((res) => {
				// 取消loading
				cancelLoading(startDate, loadingDelay, loadingKeep, temp)
				// 处理数据
				const success = onSuccess || runSuccess
				data.value = success ? success(res.data) : res.data
				return res
			})
			.catch((err) => {
				cancelLoading(startDate, loadingDelay, loadingKeep, temp)
				error.value = err
			})
			.finally(() => {
				// 是否需要延迟执行
				if (temp.finallyDelay === 0) {
					loading.value = false
				} else {
					setTimeout(() => {
						loading.value = false
					}, temp.finallyDelay)
				}
				temp.finallyDelay = 0
			})
	}
	// 是否立即执行
	if (immediate) run(outParams)
	return {
		data,
		run,
		error,
		loading,
	}
}

// 执行loading
function handleLoading(loading, time, temp) {
	clearTimer(temp)
	temp.timerLoad = setTimeout(() => {
		loading.value = true
	}, time)
}
// 取消loading
function cancelLoading(startDate, loadingDelay, loadingKeep, temp) {
	clearTimer(temp)
	const endDate = new Date().getTime()
	const gap = endDate - startDate
	// 如果请求的时间减去loading延迟的时间比loadingKeep小
	if (gap - loadingDelay > 0 && gap - loadingDelay < loadingKeep) {
		temp.finallyDelay = loadingKeep
	}
}

function clearTimer(temp) {
	clearTimeout(temp.timerLoad)
	temp.timerLoad = null
}

export default useRequest
