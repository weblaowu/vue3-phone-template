// 控制弹框取消和确定
export const useModal = () => {
	const visible = ref(false)
	const close = (data) => {
		visible.value = false
	}
	const onConfirm = () => {
		// cb && cb()
	}
	return {
		visible,
		close,
		onConfirm,
	}
}
