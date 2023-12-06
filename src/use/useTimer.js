// 定时器状态
export const timerState = ref({
  timerId: null,
  isActive: false,
})

// 开启
export function setTimer(callback, delay) {
  clearTimer() // 清除现有定时器
  timerState.value.timerId = setTimeout(callback, delay)
  timerState.value.isActive = true
}

// 清除
export function clearTimer(callback) {
  if (timerState.value.isActive) {
    clearTimeout(timerState.value.timerId)
    timerState.value.timerId = null
    timerState.value.isActive = false
    callback && callback()
  }
}

onUnmounted(() => {
  clearTimer()
})
