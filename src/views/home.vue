<template>
	<div class="home-wrap">
		<div class="head">
			<div class="input">
				<van-field
					left-icon="search"
					placeholder="请输入关键词进行搜索"
					@focus="router.push('/search')"
				/>
			</div>
		</div>
		<div class="tabs-wrap">
			<van-tabs
				ref="vanTabsRef"
				v-model:active="activeTab"
				title-active-color="#3A75C5"
				:line-height="1"
				swipe-threshold="3"
				@click-tab="handleClickTab"
			>
				<van-tab
					v-for="item in tabsMenu"
					:key="item.menuId"
					:name="item.menuId"
					:title="item.menuName"
				>
					<template v-if="item.menuName === '最新素材'" #title>
						<img id="hot-icon" :src="getImgUrl('new_icon')" />
						最新素材
					</template>
				</van-tab>
			</van-tabs>
			<div class="expand" @click="handleExpand">
				<van-icon :name="iconName" size="30" />
			</div>
			<div v-show="showTabsMenu" class="tabs-wrap-menu">
				<div class="menu-title">
					<img :src="getImgUrl('all_menu_icon')" />
					<span>所有菜单</span>
				</div>
				<div class="menu-content">
					<div
						v-for="item in tabsMenu"
						:key="item.menuId"
						class="menu-item"
						@click="() => handleClickTab({ name: item.menuId }, true)"
					>
						{{ item.menuName }}
					</div>
				</div>
				<div v-if="!tabsMenu.length" class="empty-menu">暂无菜单</div>
			</div>
		</div>
		<MaterialWrap />
	</div>
	<van-overlay
		class="menu-lay"
		:show="showTabsMenu"
		z-index="10"
		duration="0.3"
		@click="showTabsMenu = false"
	/>
</template>

<script setup>
import { useTimeout } from '@/use/useTools'
import { getImgUrl, animateCSS } from '@/tools/utils/index'
import MaterialWrap from '@/components/MaterialWrap.vue'
import useRequest from '@/use/useRequest'
import { getMenuFullApi } from '@/api/index'
import useLoadData from '@/use/useLoad'

const { run: queryMaterialData } = useLoadData()

const router = useRouter()

// 查询菜单
const { data: tabsMenu } = useRequest(getMenuFullApi, {
	immediate: true,
	onSuccess(res) {
		const newMenu = { menuName: '最新素材', menuId: '' }
		return [newMenu, ...(res || [])]
	},
})

// 展示tabs 菜单
const activeTab = ref('')
const iconName = ref('descending')
const showTabsMenu = ref(false)
function handleExpand() {
	iconName.value = iconName.value === 'descending' ? 'ascending' : 'descending'
	showTabsMenu.value = !showTabsMenu.value
	animateCSS('.tabs-wrap-menu', 'animate__fadeIn')
}

const vanTabsRef = ref(null)
function handleClickTab(tab, scroll) {
	sessionStorage.setItem('activeTab', tab.name)
	if (scroll) vanTabsRef.value.scrollTo(tab.name)
	// searchData.value.menuId = tab.name
	queryMaterialData({ menuId: tab.name })
	showTabsMenu.value = false
}

onMounted(() => {
	const sessionActiveTab = sessionStorage.getItem('activeTab')
	if (sessionActiveTab) {
		activeTab.value = sessionActiveTab
	}
	queryMaterialData({
		menuId: activeTab.value,
		keyword: '',
		label: '',
		pageNum: 1,
		pageSize: 10,
	})
})

// 开启定时器来执行动画
useTimeout(() => {
	animateCSS('#hot-icon', 'animate__heartBeat')
}, 4000)
</script>

<style lang="scss" scoped>
.home-wrap {
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
	.tabs-wrap {
		background-color: #fff;
		display: flex;
		z-index: 100;
		position: sticky;
		top: 0;
		border-bottom: 1px solid #f2f2f2;
		&-menu {
			border-top: 1px solid #f2f2f2;
			width: 100%;
			top: 100%;
			background-color: #fff;
			position: absolute;
			padding-bottom: 20px;
			.menu-title {
				display: flex;
				align-items: center;
				gap: 12px;
				padding: 30px 20px 10px;
			}
			.empty-menu {
				text-align: center;
				margin: 20px 0;
				color: #afaeae;
			}
			.menu-content {
				display: grid;
				grid-template-columns: repeat(4, 158px);
				gap: 25px;
				padding: 20px;
				.menu-item {
					// width: 158px;
					height: 72px;
					background: #f2f2f2;
					border-radius: 10px 10px 10px 10px;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #354458;
					font-size: 28px;
				}
			}
		}
		:deep(.van-tab) {
			font-size: 32px;
		}
		.tabs {
			// display: flex;
			display: flex;
			overflow-x: auto;
			&-item {
				display: inline-block;
			}
		}
		.van-tabs {
			width: calc(100% - 100px);
		}
		.expand {
			min-width: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-left: 1px solid #f2f2f2;
			// &:active {
			// 	background-color: #3a75c5;
			// }
		}
	}
}

.second-wrap {
	.hot {
		margin: 30px 0 20px;
		.title {
			color: #777;
		}
	}
	.van-field {
		border-radius: 25px;
		background-color: #ededed;
		color: #fff;
		:deep(.van-icon-search) {
			color: #807e7e;
			font-weight: 900;
			font-size: 40px;
		}
		:deep(.van-field__control) {
			color: #585757;
			padding-left: 15px;
		}
	}
}
.menu-lay {
	background-color: #4f4f4f79;
}
</style>
