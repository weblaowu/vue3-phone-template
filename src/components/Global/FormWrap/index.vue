<template>
	<van-form v-bind="$attrs">
		<van-cell-group
			v-for="(group, idx) in groupsComp"
			:key="group.title || idx"
		>
			<div v-if="group.title" class="title">{{ group.title }}</div>
			<template
				v-for="{
					fieldSlot,
					customSlot,
					compName,
					compProps,
					...item
				} in group.fields"
				:key="item.name"
			>
				<van-field
					v-if="!fieldSlot"
					v-model="dataComp[item.name]"
					v-bind="item"
				/>
				<van-field v-else v-bind="item" v-model="dataComp[item.name]">
					<template #[fieldSlot]>
						<slot :name="customSlot">
							<component
								:is="compName"
								v-model="dataComp[item.name]"
								v-bind="compProps"
							/>
						</slot>
					</template>
				</van-field>
			</template>
		</van-cell-group>
		<slot name="submit">
			<div style="margin: 36px">
				<van-button block size="large" type="primary" native-type="submit">
					{{ submitName }}
				</van-button>
			</div>
		</slot>
	</van-form>
</template>

<script setup>
defineOptions({
	name: 'FormWrap',
})

const props = defineProps({
	data: {
		type: Object,
		default: () => ({}),
	},
	groups: {
		type: [Array, Object],
		default: () => [
			{
				title: '表单标题',
				fields: [
					{
						label: '电话号码',
						name: 'number',
						placeholder: '请输入电话号码',
						required: true,
						rules: [{ required: true, message: '' }],
					},
				],
			},
			{
				title: '联系方式',
				fields: [
					{
						label: '发送号码',
						name: 'code',
						required: true,
						placeholder: '请输入发送号码',
						rules: [{ required: true, message: '' }],
					},
				],
			},
		],
	},
	submitName: {
		type: String,
		default: '提交',
	},
})

const groupsComp = computed(() => {
	const groups = !props.groups[0]?.fields
		? [{ title: '', fields: props.groups }]
		: props.groups
	return groups
})

// 收集 name
// function collectFormData(groups) {
// 	for (let key of groups) {
// 		console.log('key: ', key)
// 	}
// }

const dataComp = computed({
	get() {
		return props.data
	},
})
</script>

<style lang="scss" scoped>
.title {
	padding: 40px 20px;
	color: #929191;
}
</style>
