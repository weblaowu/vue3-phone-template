// 控制定时器
export const useTimeout = (fn, time) => {
  let timer = ref(null)
  function stopTimer() {
    clearInterval(timer)
    timer = null
  }
  function startTimer() {
    timer = setInterval(() => {
      fn && fn()
    }, time)
  }
  onMounted(() => {
    startTimer()
  })
  onUnmounted(() => {
    stopTimer()
  })
  return {
    timer,
    stopTimer,
    startTimer,
  }
}
