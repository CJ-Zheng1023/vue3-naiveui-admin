import axios, { AxiosRequestConfig } from 'axios'
import { useToken } from '@/hooks/useToken'
import config from '@/config'
import router from '@/router'
import { useUserStore } from '@/store/user'
import { isNil } from 'lodash-es'
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000
})
export interface IResponse<T extends Object> {
  data: T
  msg: string
  code: number
}
http.interceptors.request.use(
  con => {
    con.headers!.token = useToken().value
    if (con.method === 'get') {
      const params: Record<string, unknown> = {}
      // 剔除值为null,undefined和空字符串的属性
      Object.entries(con.params || {}).forEach(([key, value]) => {
        if (!isNil(value) && value !== '') {
          params[key] = value
        }
      })
      params['t'] = +new Date()
      con.params = params
    }
    return con
  },
  error => {
    return Promise.reject(error)
  }
)
let notification: any
http.interceptors.response.use(
  response => {
    // 二进制流直接返回response对象
    if (['blob', 'arraybuffer'].includes(response.request?.responseType)) {
      return response
    }
    const res = response.data
    const { code, msg: message } = res
    if (code === 200) {
      return res
    } else if (code === 403) {
      // token验证失败，跳转登录页
      const msg = message || '登录超时，请重新登录'
      // 通知框设置为单实例
      if (!notification) {
        notification = window.$notification.error({
          title: '提示',
          description: msg,
          duration: 5000,
          onAfterLeave: () => {
            notification = null
          }
        })
        const userStore = useUserStore()
        userStore.resetAll()
        router.push(config.pathLogin)
      }
      return Promise.reject(new Error(msg))
    } else if (code === 500) {
      const msg = message || '服务器接口错误'
      window.$message.error(msg)
      return Promise.reject(new Error(msg))
    } else {
      const msg = '未知错误'
      window.$message.error(msg)
      return Promise.reject(new Error(msg))
    }
  },
  error => {
    if (error.message !== 'Network Error') {
      window.$message.error('接口调用失败')
    }
    return Promise.reject(error)
  }
)
/**
 * 封装get请求
 * @param url
 * @param config
 * @returns
 */
export const get = <T extends Object>(url: string, config?: AxiosRequestConfig) => {
  return http.get<T, IResponse<T>>(url, config)
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @param config
 * @returns
 */
export const post = <T extends Object>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return http.post<T, IResponse<T>>(url, data, config)
}
// 下载
export const getBlob = (url: string, config: AxiosRequestConfig) => {
  config.responseType = 'blob'
  return http.get(url, config)
}
