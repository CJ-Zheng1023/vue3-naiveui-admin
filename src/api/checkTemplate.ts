import { ID, Pageable } from "@/types"
import { get, post } from '@/utils/request'
import { CheckForList, CheckForForm, CheckSearchCondition } from './check'
export type CheckTemplateForList = Omit<CheckForList, 'orgName'>
export type CheckTemplateForForm = Omit<CheckForForm, 'orgId'>
export type CheckTemplateForUpdate = { id: ID } & CheckTemplateForForm
export type CheckTemplateForSubmit = { id?: ID } & Omit<CheckTemplateForUpdate, 'id'>
export type CheckForTemplateSelect = {
  id: ID
  name: string
}
export type CheckTemplateSearchCondition = Omit<CheckSearchCondition, 'orgId'>
export type CheckTemplateForSelect = {
  id: ID
  name: string
}
const URL = {
  addUrl: '/checkItem/createCheckItemModel',
  updateUrl: '/checkItem/updateCheckItemModel',
  removeUrl: '/checkItem/deleteCheckItemModel',
  queryForUpdateUrl: '/checkItem/getCheckItemModel',
  queryForListUrl: '/checkItem/getCheckItemModelListPage',
  queryForSelectUrl: '/checkItem/getCheckItemModelList'
}
/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const add = (data: CheckTemplateForSubmit) => post(URL.addUrl, data)
/**
 * 修改
 * @param form 提交对象
 * @returns
 */
export const update = (data: CheckTemplateForSubmit) => post(URL.updateUrl, data)
/**
 * 删除
 * @param ids id集合
 * @returns
 */
export const remove = (ids: ID[]) => post(URL.removeUrl, ids)
/**
 * 更新前回显操作
 * @param id 会员等级id
 * @returns
 */
export const queryForUpdate = (id: ID) => get<CheckTemplateForUpdate>(URL.queryForUpdateUrl, { params: { id } })
/**
 * 根据条件分页查询
 * @param pageNo 页码
 * @param pageSize 每页大小
 * @param condition 查询条件
 * @returns
 */
export const queryForList = (
  pageNo: number,
  pageSize: number,
  condition: CheckTemplateSearchCondition
) => get<Pageable<CheckTemplateForList>>(URL.queryForListUrl, { params: { pageNo, pageSize, ...condition } })
/**
 * 查询列表用于下拉框
 * @returns
 */
export const queryForSelect = () => get<CheckTemplateForSelect[]>(URL.queryForSelectUrl)