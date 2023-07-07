<template>
	<div class="card-wrapper">
		<img src="@/assets/image/banner.png" class="bg" />
		<div class="content">
			<div class="head">
				<slot name="head"></slot>
			</div>
			<div class="body">
				<div class="title">
					<img :src="data.icon" height="20" />
					<div>{{ data.title }}</div>
				</div>
				<div class="desc">
					<div v-html="data.desc"></div>
				</div>
			</div>
		</div>
		<div class="foot">
			<slot name="foot" />
		</div>
	</div>
</template>

<script setup>
defineProps({
	data: {
		type: Object,
		default: () => ({
			title: '产品介绍',
			icon: '',
			desc: '',
		}),
	},
})
</script>

<style lang="scss" scoped>
.card-wrapper {
	height: 100vh;
	background-color: #f2f2f2;
	width: 100vw;
	display: flex;
	flex-direction: column;
	.bg {
		width: 100%;
	}
	.content {
		height: 100%;
		padding: 20px;
		&::before {
			display: table;
			content: ' ';
		}
		.head {
			margin-bottom: 30px;
			background-color: #fff;
			border-radius: 14px;
			padding: 40px 30px;
			:deep(.van-cell .van-cell__value) {
				border-radius: 34px;
				border: 1px solid #e6e5e5;
				height: 69px;
				line-height: 69px;
				padding: 0 26px;
			}
			:deep(.van-cell .van-cell__title) {
				font-size: 32px;
				margin-bottom: 10px;
			}
		}
		.body {
			padding: 30px;
			background-color: #fff;
			border-radius: 14px;
			display: flex;
			flex-direction: column;
			.title {
				display: flex;
				gap: 10px;
				align-items: center;
			}
			.desc {
				height: 100%;
				font-size: 26px;
				color: #78787a;
				margin-top: 20px;
				line-height: 1.5;
				padding: 0 10px;
			}
		}
	}
	.foot {
	}
}
</style>
