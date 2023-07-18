<template>
	<van-button
		class="send-code"
		size="small"
		type="primary"
		:loading="countdown.loading"
		:disabled="countdown.disabled"
		@click="handleSend"
	>
		<span v-if="countdown.disabled">{{ countdown.count }}</span>
		<span v-else> {{ label }} </span>
	</van-button>
</template>

<script setup>
import { isPromise } from '@utils/type'
import { regPhone } from '@utils/rule'

import { showFailToast } from 'vant'
import 'vant/es/toast/style'

const props = defineProps({
	phone: {
		type: [String, Number],
		required: true,
	},
	sendMethod: {
		type: Function,
		required: true,
	},
	label: {
		type: String,
		default: '发送验证码',
	},
})

const TIME = 60 // 倒计时间 60 s
let countdown = ref({
	count: TIME,
	timer: null,
	disabled: false,
	loading: false,
})

// 发送验证码
function handleSend() {
	// 验证手机号格式
	if (!regPhone.test(props.phone)) {
		return showFailToast('请输入正确的手机号码')
	}
	// 发送短信
	const promiseMethod = props.sendMethod()
	if (!isPromise(promiseMethod)) {
		throw new Error('sendMethod 必须返回一个promise对象')
	}
	countdown.value.loading = true
	promiseMethod
		.then((res) => {
			const { code, message } = res
			if (code !== 200) {
				return showFailToast(message)
			}
			startCountdown()
		})
		.finally(() => {
			countdown.value.loading = false
		})
}

// 启动倒计时
function startCountdown() {
	clearTimer()
	console.log('进入倒计时~~~~~~~~~')
	countdown.value.disabled = true
	countdown.value.timer = setInterval(() => {
		countdown.value.count--
		if (countdown.value.count < 0) {
			console.log('进入clearTime~~~~~~~')
			clearTimer()
		}
	}, 1000)
}

// clear timer
function clearTimer() {
	clearInterval(countdown.value.timer)
	countdown.value = {
		count: TIME,
		timer: null,
		disabled: false,
		loading: false,
	}
}

onUnmounted(() => {
	clearTimer()
})
</script>

<style lang="scss" scoped>
.send-code {
	min-width: 160px;
}
</style>
