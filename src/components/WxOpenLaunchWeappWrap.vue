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

<script setup>
/* 父元素需要设置定位样式：position: relative;
:appid="item.appid"
:path="item.path"
@launch="handleLaunchFn(item)"
@error="handleErrorFn"
*/
import { initWxConf } from '@/utils/wxSdk'

const attrs = useAttrs()
console.log('attrs: ', attrs)
</script>

<style lang="scss" scoped></style>
