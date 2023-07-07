import { getMaterialInfoApi } from '@/api/index'
import { useLoad } from '@/store/loading'

const loadStore = useLoad()
// 请求数据
const searchData = ref({
	pageNum: 1,
	pageSize: 10,
	menuId: '',
	label: '',
	keyword: '',
})
// 加载状态
const loading = ref(false)
// 请求完成状态
const finished = ref(false)
const data = ref([])

let n = 1
// 滚动加载数据
const useLoadData = () => {
	// 查询数据
	const run = (params = {}) => {
		searchData.value = { ...searchData.value, ...params }
		searchData.value.pageSize = 10
		finished.value = false
		// console.log('finished', finished.value)
		queryData(searchData.value)
	}
	// 加载更多
	const load = () => {
		n++
		searchData.value.pageSize *= n
		queryData(searchData.value)
	}
	// 请求data
	function queryData(params) {
		loading.value = true
		loadStore.setLoading(true)
		setTimeout(() => {
			getMaterialInfoApi(params)
				.then((res) => {
					if (!res.data) {
						data.value = []
						finished.value = true
						return
					}
					const { materialInfos, count } = res.data
					data.value = materialInfos?.length ? onSuccess(materialInfos) : []
					if (materialInfos.length === count) {
						console.log('xsxsxs~~~进入 finished')
						finished.value = true
					}
				})
				.catch(() => {
					finished.value = true
				})
				.finally(() => {
					loading.value = false
					loadStore.setLoading(false)
				})
		}, 500)
	}
	// 初始化data
	function initData() {
		data.value = []
	}
	return {
		data,
		loading,
		finished,
		run,
		load,
		initData,
	}
}

// 处理数据
function onSuccess(data) {
	return data.map((item) => {
		item.materialTypeName = item.materialType === '1' ? '图片素材' : '视频素材'
		item.iconName = item.materialType === '1' ? 'image_icon' : 'video_icon'
		return item
	})
}

export default useLoadData
