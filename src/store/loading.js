import { defineStore } from 'pinia'

const useLoading = defineStore('loading', () => {
  const loading = ref(false)
  function setLoading(load) {
    loading.value = load
  }
  // 监听load
  function changeLoading(load) {
    watch(
      () => load.value,
      (value) => {
        setLoading(value)
      },
    )
  }
  return { loading, setLoading, changeLoading }
})

export default useLoading
