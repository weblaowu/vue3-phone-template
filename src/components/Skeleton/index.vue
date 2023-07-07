<template>
	<div v-for="key in list" :key="key" class="item" :style="style">
		<van-skeleton v-bind="$attrs" />
	</div>
</template>

<script setup>
const props = defineProps({
	list: {
		type: [String, Number],
		default: 1,
	},
	height: {
		type: String,
		default: '100%',
	},
	color: {
		type: String,
		default: '#fff',
	},
	radius: {
		type: String,
		default: '8px',
	},
})

const style = computed(() => {
	return {
		'background-color': props.color,
		'border-radius': props.radius,
		padding: '20px',
	}
})
</script>

<style lang="scss" scoped>
.item + .item {
	margin-top: 20px;
}
</style>
