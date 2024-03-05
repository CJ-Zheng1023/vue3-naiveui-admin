export const buildMockObj = (url, type = 'get', data = null) => {
  let response
  switch (typeof data) {
    case 'object':
      response = () => data
      break
    case 'function':
      response = options => {
        let res = data(options)
        if (typeof res === 'object') {
          return res
        } else {
          return JSON.parse(res)
        }
      }
      break
    default:
      try {
        response = () => JSON.parse(data)
      } catch (e) {
        response = () => ({ code: 500, msg: '操作失败' })
      }
      break
  }
  return {
    url,
    type,
    response
  }
}
export const buildGetMockObj = (url, data) => {
  return buildMockObj(url, 'get', data)
}
export const buildPostMockObj = (url, data) => {
  return buildMockObj(url, 'post', data)
}
export const buildConditionFields = (body, ...fields) => {
  return fields.reduce((array, item) => {
    if (body[item]) {
      array.push(item)
    }
    return array
  }, [])
}
