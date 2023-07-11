<template>
	<Empty :image="getImgUrl('lock')" title="暂无权限" content="很抱歉您无权访问">
	</Empty>
</template>

<script setup>
import { getImgUrl } from '@utils/image'
import Empty from '@/components/Empty/index.vue'
</script>

<style lang="scss" scoped></style>
