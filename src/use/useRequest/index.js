import { debounce } from 'lodash-es'
import { mergeData } from '@/utils/data.js'
import { isFunction } from '@/utils/type.js'
import useLoading from '@/store/loading'

// 默认的配置项
const defaultConfig = {
  loadingDelay: 300, // loading 延迟时间
  loadingKeep: 300, // loading 保持时间
  immediate: false, // 是否立即发起请求
  initialData: [], // data 数据格式
  params: {}, // 请求初始化参数
  isReactive: true, // 是否开启响应式参数
  onBefore: (resolve) => resolve(), // 请求发送前的钩子函数
  onSuccess: (res) => res, // 请求成功后的钩子函数
}

/**
 * request usehook 封装
 * @param {function} promiseData api请求，返回promise对象
 * @param {object} options 请求的选项
 * @param {function} options.onSuccess 请求成功的回调方法
 * @param {function} options.onBefore 请求发送前的钩子函数
 * @param {object} options.params 请求的参数
 * @param {object} options.isReactive 是否开启自动响应外部参数的变化
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
  const error = ref({})
  // loading
  const loadStore = useLoading()
  const loading = computed(() => loadStore.loading)
  // 创建 AbortController 实例
  let abortController = new AbortController()
  // 执行请求方法
  const run = async ({ params, ...runOption } = {}) => {
    // 获取当前时间
    const startDate = new Date().getTime()
    // 每次请求前重置 AbortController
    abortController = new AbortController()
    // 执行loading
    handleLoading(loadStore, config.loadingDelay, timerData)
    try {
      // 请求发送前钩子
      await new Promise((resolve) => {
        ;(runOption?.onBefore || config.onBefore)(resolve)
      })
      // 合并初始参数 和 run传入的参数
      const paramsData = { ...unref(config.params), ...unref(params || {}) }
      // 发起请求
      const res = await promiseData(paramsData, {
        signal: abortController.signal,
      })
      // 请求结束后钩子
      data.value = (runOption?.onSuccess || config.onSuccess)(res.data)
      // 取消loading
      cancelLoading(
        startDate,
        config.loadingDelay,
        config.loadingKeep,
        timerData,
      )
      // 处理数据
      return Promise.resolve({ ...res, data: data.value })
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
        loadStore.setLoading(false)
      } else {
        setTimeout(() => {
          loadStore.setLoading(false)
        }, timerData.finallyDelay)
      }
      timerData.finallyDelay = 0
    }
  }
  // 请求节流
  const debouncedRun = debounce(run, 300) // 300ms 防抖时间
  // 响应外部参数的变化
  changeParams(config, options.params, debouncedRun)
  onMounted(() => {
    // 是否立即执行
    if (config.immediate) run(options.params)
  })
  // 取消请求
  const onAbort = () => {
    abortController.abort()
  }
  // 组件卸载时取消请求
  onUnmounted(() => {
    onAbort()
    loadStore.setLoading(false)
  })
  return {
    data,
    run,
    error,
    loading,
    onAbort,
  }
}

// 执行loading
function handleLoading(loadStore, loadingDelay, timerData) {
  clearTimer(timerData)
  timerData.timerLoad = setTimeout(() => {
    loadStore.setLoading(true)
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

// 响应外部参数的变化
function changeParams(config, params, run) {
  if (!config.isReactive) return
  // 监听参数变化；自动重新请求
  watch(
    () => params,
    (newParams) => {
      if (newParams) {
        run(newParams)
      }
    },
    {
      // 如果 params 是一个复杂对象，则需要深度监听
      deep: true,
    },
  )
}

export default useRequest
