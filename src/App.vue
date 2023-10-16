<template>
	<RouterView />
	<!-- 底部安全区 -->
	<div class="van-safe-area-bottom"></div>
	<van-overlay
		class="loading"
		:show="load.loading"
		z-index="2100"
		duration="0.3"
	>
		<van-loading color="#333" size="20px" vertical />
	</van-overlay>
</template>
<script setup lang="ts">
import { useLoad } from '@/store/loading'
import { setToastDefaultOptions } from 'vant'
setToastDefaultOptions({ duration: 2000 })

const load = useLoad()
</script>
<style scoped lang="scss">
.van-loading {
	position: fixed !important;
	top: 50%;
	left: 50%;
	z-index: 1010;
	transform: translateX(-50%);
}
.loading.van-overlay {
	background: rgba(0, 0, 0, 0.3);
}

.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	.lottie_loading {
		width: 100px;
		height: 100px;
	}
}
</style>
