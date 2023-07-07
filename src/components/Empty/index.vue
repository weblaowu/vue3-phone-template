<template>
	<div class="empty-wrap" :style="{ position: position }">
		<div class="empty-wrap_content">
			<div class="empty">
				<img :src="image" :width="width" />
				<slot>
					<p class="title">{{ title }}</p>
					<p class="content">{{ content }}</p>
				</slot>
			</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	width: {
		type: [String, Number],
		default: '120',
	},
	image: {
		type: String,
		default: '',
	},
	tip: {
		type: String,
		default: '您暂无领取记录',
	},
	position: {
		type: String,
		default: 'absolute',
	},
	title: {
		type: String,
		default: '',
	},
	content: {
		type: String,
		default: '暂无数据',
	},
})
</script>

<style lang="scss" scoped>
.empty-wrap {
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: #fff;
	&_content {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.empty {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		top: 50%;
		// transform: translate(-50%, -50%);

		.title {
			margin-top: 30px;
			font-weight: 700;
			color: #1f1e1e;
			font-size: 28px;
		}
		.content {
			color: #687383;
			font-size: 28px;
			margin: 20px;
		}
	}
}
</style>
