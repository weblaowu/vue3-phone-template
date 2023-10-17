<template>
	<form-wrap
		:groups="fields1"
		:data="formData"
		@submit="handleSubmit"
	></form-wrap>
</template>

<script setup>
import { Session } from '@/utils/storage'

// 诉求表单组
const formData = ref({
	number: '',
	problem: '',
	code: '',
})

const fields1 = [
	{
		label: '产品号码',
		name: 'number',
		required: true,
		placeholder: '请输入产品号码',
		// rules: [{ required: true, message: 'xsxasxs' }],
	},
	{
		label: '发送号码',
		name: 'code',
		placeholder: '请输入发送号码',
		// rules: [{ required: true, message: '' }],
	},
	{
		label: '问题描述',
		name: 'problem',
		type: 'textarea',
		rows: '4',
		'label-class': 'problem',
		autosize: true,
		placeholder: '请描述你的问题(不超过100字)',
	},
]

const fields2 = [
	{
		label: '发送号码',
		name: 'code',
		size: 'large',
		placeholder: '请输入发送号码',
		rules: [{ required: true, message: '' }],
	},
]

const groups = [
	{ title: '诉求信息', fields: fields1 },
	{ title: '联系方式', fields: fields2 },
]

const handleSubmit = () => {
	console.log('xsxs')
	Session.set('code', {})
	setTimeout(() => {
		console.log('get:', Session.get('code'))
		console.log('111111111')
	}, 3000)
}
</script>

<style lang="scss" scoped></style>
