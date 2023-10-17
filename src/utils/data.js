// 根据 items 生成 maps
export function generateMaps(items, type = 'name', params = {}) {
  const map = { ...params }
  items.forEach((item) => {
    if (map[item[type]] !== undefined) {
      map[item[type]] = ''
    }
  })
  return map
}

/**
 * 合并目标数据到源数据，不改变源数据结构，返回新的数据
 * @param {object} source 源对象
 * @param {object} target 目标对象
 * @returns
 */
export function mergeData(source, target = {}) {
  const data = { ...source }
  for (let key of Object.keys(data)) {
    const value = target[key]
    if (value !== undefined) {
      data[key] = value
    }
  }
  return data
}
