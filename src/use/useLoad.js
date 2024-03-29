import { isFunction } from '@/utils/type.js'

/**
 * 基于 van-list 的hook封装, 封装了onload实现，在组件层面使用只需传入需要加载的API和参数
 * @param {() => Promise } run api接口
 * @param {() => { total, list }} [handleData] 处理api返回的数据，返回的格式： { total, list }
 * @returns finished, loading, onLoad, loadData, initLoad
 */
const useLoad = (run, handleData) => {
  let totalItems = 0 // 总数据
  let currentPage = 1 // 记录加载的页码
  const finished = ref(false)
  const loading = ref(false)
  const loadData = ref([])
  // 滚动加载
  const onLoad = async (params = {}) => {
    if (!isFunction(run)) {
      throw new Error('useLoad第一个参数必须是个函数并且它返回的是promise对象')
    }
    try {
      loading.value = true
      const res = await run({ pageNum: currentPage, ...params })
      if (!res || !res.data) {
        throw new Error('useLoad: Invalid response structure')
      }
      const { total, list } = handleData ? handleData(res.data) : res.data || {}
      totalItems = total
      loadData.value = [...loadData.value, ...list] // Append new records
      currentPage++
      if (loadData.value.length >= totalItems) {
        finished.value = true
      }
    } catch (err) {
      console.error('Load data error:', err.message)
      finished.value = true
    } finally {
      loading.value = false
    }
  }
  // 初始化状态
  const initState = () => {
    currentPage = 1
    totalItems = 0
    loadData.value = []
    finished.value = false
  }
  // 初始化加载
  const initLoad = () => {
    initState()
    onLoad()
  }
  onUnmounted(() => initState())
  return {
    finished,
    loading,
    onLoad,
    loadData,
    initLoad,
  }
}

export default useLoad
