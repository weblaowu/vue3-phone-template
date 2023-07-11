/**
 * 读取图片
 * @param {string} imgName 图片名称
 * @param {string} format 图片格式，默认是svg
 */
export const getImgUrl = (imgName, format = 'svg') => {
	const url = new URL(`../assets/image/${imgName}.${format}`, import.meta.url)
		.href
	return url
}

// 获取Url Blob
export function getBlob(url) {
	return new Promise((resolve) => {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', url, true)
		xhr.responseType = 'blob'
		xhr.onload = () => {
			if (xhr.status === 200) {
				resolve(xhr.response)
			}
		}
		xhr.send()
	})
}

// a 标签下载
export function clickDownload(blob, fileName) {
	const link = document.createElement('a')
	link.style.display = 'none'
	link.href = window.URL.createObjectURL(blob)
	link.download = fileName
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

// 获取图片base64格式
export const getBase64 = (file) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	return new Promise((resolve) => {
		reader.onload = () => {
			resolve(reader.result)
		}
	})
}

// 获取图片像素
export async function getImgPx(file) {
	const base64 = await getBase64(file)
	const image = new Image()
	image.src = base64
	return new Promise((resolve) => {
		image.onload = () => {
			const width = image.width
			const height = image.height
			resolve({ width, height })
		}
	})
}

/**
 * 图片压缩
 * @param {Object} file 图片文件对象
 * @param {number} szie 图片压缩大小
 * @param {number} quality 图片压缩质量：0 ~ 1之间
 */
export function compressImage(file, size, quality = 0.8) {
	const { size: originSize } = file
	// 如果上传图片的大小大于指定的size，就压缩
	return new Promise((reovle) => {
		if (originSize > size) {
			const blob = URL.createObjectURL(file)
			const img = new Image()
			img.src = blob
			img.onload = function () {
				// 图片最大宽高
				const maxWidth = 1000
				// 绘制canvas画布
				const canvas = document.createElement('canvas')
				const ctx = canvas.getContext('2d')
				const imgWidth = this.width
				const imgHeight = this.height
				if (Math.max(imgWidth, imgHeight) > maxWidth) {
					if (imgWidth > imgHeight) {
						canvas.width = maxWidth
						canvas.height = (10 * imgHeight) / imgWidth
					} else {
						canvas.height = maxWidth
						canvas.width = (maxWidth * imgWidth) / imgHeight
					}
				} else {
					canvas.width = imgWidth
					canvas.height = imgHeight
					quality = 0.6
				}
				ctx.clearRect(0, 0, canvas.width, canvas.height)
				ctx.drawImage(this, 0, 0, this.width, this.height)
				// 转成base64
				const base64 = canvas.toDataURL('image/jpeg', quality)
				if (base64) {
					const res = base64ToFile(base64, 'image')
					return reovle(res)
				} else {
					return reovle(file)
				}
			}
		} else {
			return reovle(file)
		}
	})
}

// base64图片转file的方法（base64图片, 设置生成file的文件名）
function base64ToFile(base64, fileName) {
	// 将base64按照 , 进行分割 将前缀  与后续内容分隔开
	let data = base64.split(',')
	// 利用正则表达式 从前缀中获取图片的类型信息（image/png、image/jpeg、image/webp等）
	let type = data[0].match(/:(.*?);/)[1]
	// 从图片的类型信息中 获取具体的文件格式后缀（png、jpeg、webp）
	let suffix = type.split('/')[1]
	// 使用atob()对base64数据进行解码  结果是一个文件数据流 以字符串的格式输出
	const bstr = window.atob(data[1])
	// 获取解码结果字符串的长度
	let n = bstr.length
	// 根据解码结果字符串的长度创建一个等长的整形数字数组
	// 但在创建时 所有元素初始值都为 0
	const u8arr = new Uint8Array(n)
	// 将整形数组的每个元素填充为解码结果字符串对应位置字符的UTF-16 编码单元
	while (n--) {
		// charCodeAt()：获取给定索引处字符对应的 UTF-16 代码单元
		u8arr[n] = bstr.charCodeAt(n)
	}
	// 利用构造函数创建File文件对象
	// new File(bits, name, options)
	const file = new File([u8arr], `${fileName}.${suffix}`, {
		type: type,
	})
	// 将File文件对象返回给方法的调用者
	return file
}
