// 跳转小程序
export function useMiniProgram() {
	// 判断当前环境， 是否在小程序环境
	const isMiniprogram = ref(false)
	const getMiniEnv = () => {
		window.wx.miniProgram.getEnv((res) => {
			isMiniprogram.value = res.miniprogram ? true : false
			console.log('miniprogram: ~~~~~~~', res.miniprogram, isMiniprogram.value)
		})
	}
	// sdk跳转小程序
	const navigateTo = ({ appid, path }) => {
		window.wx.navigateToMiniProgram({
			appId: appid,
			url: path,
			success() {
				console.log('navigateTo: ~~~success')
			},
			fail() {
				console.log('navigateTo: ~~~fail')
			},
		})
	}
	return {
		isMiniprogram,
		getMiniEnv,
		navigateTo,
	}
}
