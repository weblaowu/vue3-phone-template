<template>
	<div class="search-wrap">
		<div class="head">
			<div class="input">
				<van-field
					v-model="keyword"
					autofocus
					clearable
					left-icon="search"
					placeholder="请输入关键词进行搜索"
					@focus="visible = true"
				/>
			</div>
		</div>
		<div class="search-body">
			<div class="hot-list">
				<div class="title">
					<img id="hot-label" :src="getImgUrl('label_icon')" />
					<span>热门标签</span>
				</div>
				<van-space v-if="labelData.length" wrap class="tags" :size="10">
					<van-tag
						v-for="(tag, idx) in labelData"
						:key="idx"
						size="large"
						color="#EBEBEB"
						text-color="#8B8B8B"
						round
						@click="() => handleClickTag(tag)"
					>
						{{ tag }}
					</van-tag>
				</van-space>
				<div v-else class="empty-label">暂无标签</div>
			</div>
			<MaterialWrap />
		</div>
	</div>
</template>

<script setup>
import { animateCSS, getImgUrl } from '@/tools/utils/index'
import MaterialWrap from '@/components/MaterialWrap.vue'
import useRequest from '@/use/useRequest'
import { useTimeout } from '@/use/useTools'
import { debounce } from 'lodash-es'
import { getLabelApi } from '@/api/index'
import useLoadData from '@/use/useLoad'

const { data, initData, run: queryMaterialData } = useLoadData()

data.value = []

// 开启定时器来执行动画
const { startTimer, stopTimer } = useTimeout(() => {
	animateCSS('#hot-label', 'animate__swing')
}, 5000)

// 是否点击当前标签
const isClickTag = ref(false)
// 搜索关键词
const keyword = ref('')

const { data: labelData } = useRequest(getLabelApi, {
	immediate: true,
})

// 显示热门
const showHot = computed(() => {
	return !isClickTag.value && keyword.value === ''
})

// 搜索防抖
const handledebounce = debounce(querySearch, 500)
watch(
	() => keyword.value,
	(key) => {
		if (!key) return initData()
		handledebounce()
	}
)

// 请求
function querySearch() {
	if (!keyword.value) return initData()
	queryMaterialData({ keyword: keyword.value, label: '', menuId: '' })
}

// 监听热门是否显示, 不显示需停止动画
watch(
	() => showHot.value,
	(bool) => {
		bool ? startTimer() : stopTimer()
	}
)

// 点击标签
function handleClickTag(label) {
	isClickTag.value = true
	queryMaterialData({ keyword: '', label, menuId: '' })
}

onMounted(() => {
	setTimeout(() => {
		animateCSS('#hot-label', 'animate__swing')
	}, 300)
})
</script>

<style lang="scss" scoped>
.search-wrap {
	background-color: #f3f8fe;
	height: 100%;
	.head {
		background-color: #3a75c5;
		position: relative;
		z-index: 100;
		.input {
			padding: 30px 50px;
		}
		.van-field {
			border-radius: 40px;
			color: #fff;
			:deep(.van-icon-search) {
				color: #cecece;
				font-weight: 900;
				font-size: 45px;
			}
		}
	}
	.search-body {
		.hot-list {
			padding: 20px 30px;
			.title {
				display: flex;
				gap: 10px;
				margin: 20px 0;
				color: #1f1e1e;
				align-items: center;
			}
		}
		.empty-label {
			margin-top: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #bbb9b9;
		}
	}
}
.empty-wrap {
	.van-button {
		border-radius: 120px 120px 120px 120px;
		width: 166px;
		height: 70px;
	}
}
</style>
