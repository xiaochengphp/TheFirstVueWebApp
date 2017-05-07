// 保存数据到本地
export function saveToLocal (id, key, value) {
  let seller = window.localStorage.__seller__
  // 如果没有创建 __seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    // 判断id存不存在
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}

// 读取本地保存的数据
export function loadFromLocal (id, key) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return false
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return false
  }
  let ret = seller[key]
  return ret || false
}
