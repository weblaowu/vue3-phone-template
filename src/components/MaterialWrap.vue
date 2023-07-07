<template>
	<div ref="materialWrap" class="material-wrap">
		<Empty
			v-if="!data.length"
			style="background-color: #f3f8fe"
			:image="getImgUrl('not_icon')"
			v-bind="$attrs"
		/>
		<div class="material-wrap_content">
			<div
				v-for="item in data"
				:key="item.id"
				class="item"
				@click="() => openDetail(item)"
			>
				<img :src="item.materialCover" />
				<div class="desc">
					<p class="title van-multi-ellipsis--l2">
						{{ item.materialName }}
					</p>
					<div class="type">
						<img :src="getImgUrl(item.iconName)" class="icon" />
						<span class="icon_tip">{{ item.materialTypeName }}</span>
					</div>
				</div>
			</div>
		</div>
		<div v-if="data.length && !loading" class="load-more">
			<van-button v-if="!finished" size="small" @click="load"
				>加载更多</van-button
			>
			<van-loading v-else-if="loading" size="24">加载中...</van-loading>
			<div v-else class="load-more_tip">没有更多了</div>
		</div>
	</div>
</template>

<script setup>
import Empty from '@/components/Empty/index.vue'
import { getImgUrl } from '@/tools/utils/index'
import useLoadData from '@/use/useLoad'

const { data, loading, finished, load } = useLoadData()
const router = useRouter()

const materialWrap = ref(null)

const props = defineProps({
	showEmpty: {
		type: Boolean,
		default: true,
	},
	showHot: {
		type: Boolean,
		default: false,
	},
})

const height = ref('18vh')

// 打开详情预览
const openDetail = ({ materialId }) => {
	router.push({
		path: '/detail',
		query: { materialId, userId: sessionStorage.getItem('userId') },
	})
}

// watch(
// 	() => props.showHot,
// 	() => {
// 		setHeight()
// 	}
// )

onMounted(() => {
	setHeight()
})

// 设置height
function setHeight() {
	if (materialWrap.value) {
		nextTick(() => {
			const top = materialWrap.value?.offsetTop
			height.value = `${top}px`
		})
	}
}
</script>

<style lang="scss" scoped>
.material-wrap {
	position: relative;
	padding: 20px 20px 0;
	min-height: calc(100vh - v-bind(height));
	&_content {
		column-count: 2;
		column-gap: 20px;
		column-rule: #b6b6b6;
		.item {
			width: 100%;
			border-radius: 4px;
			background-color: #fff;
			margin-bottom: 20px;
			break-inside: avoid;
			padding: 0;
			img {
				border-radius: 4px;
				width: 100%;
			}
			.desc {
				padding: 12px 16px;
				text-align: start;
				.title {
					color: #030303;
				}
				.type {
					display: flex;
					gap: 10px;
					// align-items: center;
					.icon {
						width: 24px;
						height: 24px;
					}
					margin-top: 8px;
					font-size: 24px;
					color: #b6b6b6;
				}
			}
		}
	}
	.load-more {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 120px;
		&_tip {
			color: #969799;
			font-size: 24px;
		}
	}
}
.loading-detail {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 120px;
}
</style>
