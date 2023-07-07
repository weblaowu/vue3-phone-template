<template>
	<div class="detail-wrap">
		<div class="phone-body">
			<video
				v-if="data.materialType === '0'"
				ref="videoRef"
				class="video"
				:src="data.videoUrl"
				controls="controls"
				x5-video-player-fullscreen="true"
				x5-video-player-type="h5"
				x-webkit-airplay="allow"
				controlsList="nodownload"
			>
				您的浏览器不支持 video 标签。
			</video>
			<div class="content">
				<div class="title">{{ data.materialName }}</div>
				<van-space v-if="tagData.length" wrap class="tags" :size="10">
					<van-tag
						v-for="(tag, idx) in tagData"
						:key="idx"
						size="large"
						color="#EBEBEB"
						text-color="#8B8B8B"
						round
					>
						{{ tag.name }}
					</van-tag>
				</van-space>
				<div v-if="tagData.length" class="divider"></div>
				<div v-if="!!data.materialRichtext" class="message">
					<div class="message-title">
						<img :src="getImgUrl('_intro_icon')" /> <span>介绍</span>
					</div>
					<div class="message-content" v-html="data.materialRichtext"></div>
					<Empty
						v-if="!data.materialRichtext"
						:image="getImgUrl('msg_not_icon')"
						width="40"
						style="margin-top: 150px"
						content="暂无文本内容"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import Empty from '@/components/Empty/index.vue'
import useRequest from '@/use/useRequest'
import { getMaterialDetailApi, sdkOauthApi } from '@/api/index'
import { getImgUrl } from '@/tools/utils/index'
import { initWxConf, setShareInfo } from '@/tools/utils/wxSdk'

const route = useRoute()

const { data, run: queryMaterialDetail } = useRequest(getMaterialDetailApi, {
	initailData: {},
})

queryMaterialDetail({ materialId: route.query.materialId }).then(() => {
	getSdkOauth(route.query)
})

const tagData = ref([])

watch(
	() => data.value.label,
	(label) => {
		if (!label) return (tagData.value = [])
		// 设置 tagData
		tagData.value = label.split(',').map((name) => {
			return { name, type: 'primary', showClose: true }
		})
	}
)

// 获取sdk
function getSdkOauth({ materialId, userId }) {
	// url = `${url}?materialId=${materialId}&userId=${userId}&share=1`
	let url = location.href.split('#')[0]
	console.log('触发分享：获取 signature 签名的url：~~~~', url)
	sdkOauthApi({ url }).then((res) => {
		if (res.code !== 200) return
		const { appId, nonceStr, signature, timestamp } = res.data
		// 初始化
		initWxConf({ appId, nonceStr, signature, timestamp }).then(() => {
			const info = {
				title: '南京电信',
				desc: data.value.materialName,
				link: `https://njwxtest.jlonline.com/qxb/marketing-material/detail?materialId=${materialId}&userId=${userId}&share=1`,
				imgUrl: data.value.materialCover,
			}
			setShareInfo(info)
		})
	})
}

const videoRef = ref(null)
onMounted(() => {
	setTimeout(() => {
		videoRef.value && videoRef.value.play()
	}, 500)
})
</script>

<style lang="scss" scoped>
.detail-wrap {
	.phone-body {
		height: 100vh;
		background-color: #fff;
		overflow-y: scroll;
		.video {
			width: 100%;
		}
		.content {
			padding: 10px 30px 30px;
			.title {
				color: #1c1c1c;
				font-weight: 400;
				margin: 30px 0 10px;
				font-size: 40px;
			}
			.divider {
				width: 100%;
				display: flex;
				border-top: 1px solid #f2f2f2;
			}
			.tags {
				margin: 16px 0 8px;
			}
			.message {
				margin-top: 10px;
				padding: 10px 0;
				color: #555;
				position: relative;
				:deep(img) {
					max-width: 100%;
				}
				&-title {
					color: #4f4f4f;
					margin: 12px 0 30px;
					display: flex;
					align-items: center;
					gap: 10px;
					font-size: 28px;
				}
			}
		}
	}
}
</style>
