import { ID, Pageable } from "@/types"
import { get, post } from '@/utils/request'
export type CheckForList = {
  id: ID
  name: string
  ifUpload: boolean
  rule: string
  createTime: string
  orgName: string
}
export type CheckForForm =
  { orgId: ID | null } & Pick<CheckForList, 'name' | 'ifUpload' | 'rule'>
export type CheckForUpdate = { id: ID, orgId: ID } & CheckForForm
export type CheckForSubmit = { id?: ID } & Omit<CheckForUpdate, 'id'>
export type CheckForSelect = {
  id: ID
  name: string
}
export type CheckSearchCondition = {
  name: string
  orgId: ID | null
}
const URL = {
  addUrl: '/checkItem/createCheckItem',
  updateUrl: '/checkItem/updateCheckItem',
  removeUrl: '/checkItem/deleteCheckItem',
  queryForUpdateUrl: '/checkItem/getCheckItem',
  queryForListUrl: '/checkItem/getCheckItemListPage',
  queryForSelectUrl: '/checkItem/getOrgCheckItemList'
}
/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const add = (data: CheckForSubmit) => post(URL.addUrl, data)
/**
 * 修改
 * @param form 提交对象
 * @returns
 */
export const update = (data: CheckForSubmit) => post(URL.updateUrl, data)
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
export const queryForUpdate = (id: ID) => get<CheckForUpdate>(URL.queryForUpdateUrl, { params: { id } })
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
  condition: CheckSearchCondition
) => get<Pageable<CheckForList>>(URL.queryForListUrl, { params: { pageNo, pageSize, ...condition } })
/**
 * 查询列表用于下拉框
 * @param orgId 组织机构ID
 * @returns
 */
export const queryForSelect = (orgId: ID) => get<CheckForSelect[]>(URL.queryForSelectUrl, { params: { orgId } })