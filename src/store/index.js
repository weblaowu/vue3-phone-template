import { defineStore } from 'pinia'

export const useInfo = defineStore('info', () => {
	const info = ref({})
	function setInfo(obj) {
		info.value = obj
	}
	return { info, setInfo }
})
