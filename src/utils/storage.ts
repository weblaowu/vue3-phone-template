/**
 * window.localStorage
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
type Str = string | number | object
export const Local = {
	// 设置永久缓存
	set(key: string, val: Str): void {
		window.localStorage.setItem(key, JSON.stringify(val))
	},
	// 获取永久缓存
	get(key: string) {
		const json: any = window.localStorage.getItem(key)
		return JSON.parse(json)
	},
	// 移除永久缓存
	remove(key: string): void {
		window.localStorage.removeItem(key)
	},
	// 移除全部永久缓存
	clear(): void {
		window.localStorage.clear()
	},
}

/**
 * window.sessionStorage
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
	// 设置临时缓存
	set(key: string, val: Str) {
		window.sessionStorage.setItem(key, JSON.stringify(val))
	},
	// 获取临时缓存
	get(key: string) {
		const json: any = window.sessionStorage.getItem(key)
		return JSON.parse(json)
	},
	// 移除临时缓存
	remove(key: string) {
		window.sessionStorage.removeItem(key)
	},
	// 移除全部临时缓存
	clear() {
		window.sessionStorage.clear()
	},
}
