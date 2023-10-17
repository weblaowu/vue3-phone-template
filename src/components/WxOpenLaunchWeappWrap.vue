<template>
	<wx-open-launch-weapp
		v-bind="$attrs"
		style="
			position: absolute;
			top: 0;
			display: block;
			width: 100%;
			height: 100%;
		"
	>
		<div v-is="'script'" type="text/wxtag-template" style="display: block">
			<div v-is="'style'">
				.weapp-btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0;
				z-index: 1000;}
			</div>
			<div class="weapp-btn"></div>
		</div>
	</wx-open-launch-weapp>
</template>

<script>
/*父元素需要设置定位样式：
    position: relative;
  组件传参：
		:appid="item.appid"
		:path="item.path"
		@launch="handleLaunchFn(item)"
		@error="handleErrorFn"
*/
</script>
<script setup>
import { initWxConf } from '@/utils/wxSdk'
/* 注入自定义标签 */
// sdkOauthApi({ url: location.href.split('#')[0] }).then((res) => {
// 	initWxConf(res.data)
// })
</script>
