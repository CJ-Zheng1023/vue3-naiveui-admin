import { MenuOption } from 'naive-ui'
import { SelectMixedOption } from 'naive-ui/es/select/src/interface'
export type ID = number
export interface IBreadcrumb {
  label: string | number
  value: string | number
  options: SelectMixedOption[]
  children: MenuOption[] | undefined
}
/**
 * 分页数据结构
 */
export interface IPagination {
  pageNo: number
  pageSize: number
  total: number
}
/**
 * 可分页对象数据结构
 */
export type Pageable<T> = {
  list: T[]
  pagination: IPagination
}
export type naiveUITypes = 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
