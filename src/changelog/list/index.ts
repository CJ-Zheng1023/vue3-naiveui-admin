import { AsyncComponentLoader, defineAsyncComponent } from 'vue'
const components = import.meta.glob<AsyncComponentLoader>('./*.vue')

// 根据版本组件路径对比版本号
const compare = (item1: string, item2: string) => {
  const arr1: string[] | null = item1.match(/\d+/g)
  if (arr1 === null) {
    return 1
  }
  const arr2: string[] | null = item2.match(/\d+/g)
  if(arr2 === null) {
    return -1
  }
  const a1 = Number(arr1[0]), b1 = Number(arr1[1] || 0), c1 = Number(arr1[2] || 0)
  const a2 = Number(arr2[0]), b2 = Number(arr2[1] || 0), c2 = Number(arr2[2] || 0)
  if (a1 > a2) {
    return -1
  } else if (a1 === a2) {
    if (b1 > b2) {
      return -1
    } else if (b1 === b2) {
      if (c1 > c2) {
        return -1
      } else {
        return 1
      }
    } else {
      return 1
    }
  } else {
    return 1
  }
}

// 按版本号降序排序各个版本组件
export default Object.keys(components).sort(compare).reduce((arr: { key: string, value: any }[], key: string) => {
  const newKey = key.replace(/\.\/|\.vue/g, '')
  return arr.concat({ key: newKey, value: defineAsyncComponent(components[key]) })
}, [])