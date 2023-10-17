import { defineStore } from 'pinia'

export const useLoad = defineStore('loading', () => {
  const loading = ref(false)
  function setLoading(load) {
    loading.value = load
  }
  return { loading, setLoading }
})
