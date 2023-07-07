// 获取Url Blob
function getBlob(url) {
	return new Promise((resolve, reject) => {
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

// a 标签模拟下载
function clickDownload(blob, fileName) {
	const link = document.createElement('a')
	link.href = window.URL.createObjectURL(blob)
	link.download = fileName
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}
// 使用
// const url = `https://njwxtest.jlonline.com/qxbminio/xxx`;
// getBlob(url)
//   .then((blob) => {
//     clickDownload(blob, row.fileName);
//   })
//   .catch((err) => {
//     console.log("getBlob: ", err);
//   });
