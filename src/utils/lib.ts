import dayjs from 'dayjs'
import { escapeRegExp } from 'lodash-es'
/**
 * 获取对象key数组
 * @param obj
 * @returns
 */
export const objectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof typeof obj>
}
/**
 * 格式化时间戳
 * @param timestamp
 * @param formatter
 * @returns
 */
export const formatTimestamp = (timestamp: number | null | undefined, formatter: string = 'YYYY-MM-DD HH:mm:ss') => {
  if (!timestamp) {
    return ''
  }
  return dayjs(timestamp).format(formatter)
}
/**
 * 字符串转时间戳
 * @param target 
 * @param formatter 
 * @returns 
 */
export const stringToTimestamp = (target: string, formatter: string = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(target, formatter).valueOf()
}
const TO_GB = 1024 * 1024 * 1024
const TO_MB = 1024 * 1024
const TO_KB = 1024
/**
 * 文件大小转换
 * @param bytes
 * @returns
 */
export const formatSize = (bytes: number) => {
  if (bytes >= TO_GB) {
    return (bytes / TO_GB).toFixed(2) + 'GB'
  } else if (bytes >= TO_MB) {
    return (bytes / TO_MB).toFixed(2) + 'MB'
  } else if (bytes >= TO_KB) {
    return (bytes / TO_KB).toFixed(2) + 'KB'
  } else {
    return bytes + 'B'
  }
}
/**
 * 数字转换成带有千分位的字符串
 * @param num
 * @returns
 */
export const formatNumber = (num: number | undefined) => (num ? num.toLocaleString() : '0')
/**
 * 判断输入内容是否包含在目标字符串里
 * @param source 输入内容
 * @param target 目标字符串
 * @returns
 */
export const regExpTest = (source: string, target: string) => new RegExp(escapeRegExp(source), 'i').test(target)