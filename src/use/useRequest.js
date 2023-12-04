import axios from 'axios'
import { mergeData } from '@/utils/data.js'
import { isFunction } from '@/utils/type.js'

// 默认的配置项
const defaultConfig = {
  loadingDelay: 300, // loading 延迟时间
  loadingKeep: 300, // loading 保持时间
  immediate: false, // 是否立即发起请求
  initialData: [], // data 数据格式
  params: {}, // 请求初始化参数
  onBefore: (res) => res, // 请求发送前的钩子函数
  onSuccess: (res) => res, // 请求成功后的钩子函数
}

/**
 * request usehook 封装
 * @param {function} promiseData api请求，返回promise对象
 * @param {object} options 请求的选项
 * @param {function} options.onSuccess 请求成功的回调方法
 * @param {object} options.params 请求的参数
 * @param {object} options.config 配置项，覆盖默认配置 defaultConfig
 * @returns {} data loading error run
 */
const useRequest = (promiseData, options = {}) => {
  if (!isFunction(promiseData)) {
    throw new Error('promiseData is required： must be a promise')
  }
  // 执行 loading 的定时器
  let timerData = { timerLoad: null, finallyDelay: 0 }
  // 合并配置项
  const config = mergeData(defaultConfig, options)
  // 返回的 data
  const data = ref(config.initialData)
  const error = ref('')
  const loading = ref(false)
  /*TODO: 创建 Axios 取消令牌 */
  const cancelTokenSource = axios.CancelToken.source()
  // 执行请求方法
  const run = async ({ params, ...runOption } = {}) => {
    // 获取当前时间
    const startDate = new Date().getTime()
    // 执行loading
    handleLoading(loading, config.loadingDelay, timerData)
    try {
      // 请求发送前钩子
      ;(runOption?.onBefore || config.onBefore)()
      // 合并初始参数 和 run传入的参数
      const paramsData = { ...config.params, ...(params || {}) }
      // 发起请求
      const res = await promiseData(paramsData)
      console.log('run 方法内部res: ', res)
      // 请求结束后钩子
      data.value = (runOption?.onSuccess || config.onSuccess)(res)
      // 处理数据
      return Promise.resolve(data.value)
    } catch (err) {
      // 取消loading
      cancelLoading(
        startDate,
        config.loadingDelay,
        config.loadingKeep,
        timerData,
      )
      error.value = err
      return Promise.reject(err)
    } finally {
      // 是否需要延迟执行
      if (timerData.finallyDelay === 0) {
        loading.value = false
      } else {
        setTimeout(() => {
          loading.value = false
        }, timerData.finallyDelay)
      }
      timerData.finallyDelay = 0
    }
  }

  // 监听参数变化；自动重新请求
  watch(
    () => options.params,
    (newParams) => {
      if (newParams) {
        run(newParams)
      }
    },
    {
      deep: true, // 如果 params 是一个复杂对象，则需要深度监听
    },
  )
  // 是否立即执行
  if (config.immediate) run(options.params)
  // 组件卸载时取消请求
  onUnmounted(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Component unmounted：cancel request')
    }
  })
  return {
    data,
    run,
    error,
    loading,
  }
}

// 执行loading
function handleLoading(loading, loadingDelay, timerData) {
  clearTimer(timerData)
  timerData.timerLoad = setTimeout(() => {
    loading.value = true
  }, loadingDelay)
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

// 清除定时器
function clearTimer(timerData) {
  clearTimeout(timerData.timerLoad)
  timerData.timerLoad = null
}

export default useRequest
