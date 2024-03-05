import { ID, Pageable } from "@/types"
import { get, post } from '@/utils/request'
export type GroupForList = {
  id: ID
  name: string
  description: string
  createTime: string
  orgName: string
}
export type GroupForForm =
  { orgId: ID | null, checkItemIds: ID[] | null } & Pick<GroupForList, 'name' | 'description'>
export type GroupForUpdate = { id: ID, orgId: ID, checkItemIds: ID[] } & GroupForForm
export type GroupForSubmit = { id?: ID } & Omit<GroupForUpdate, 'id'>
export type GroupForSelect = {
  id: ID
  name: string
}
export type GroupSearchCondition = {
  name: string
  orgId: ID | null
}
const URL = {
  addUrl: '/group/createGroup',
  updateUrl: '/group/deleteGroup',
  removeUrl: '/group/updateGroup',
  queryForUpdateUrl: '/group/getGroup',
  queryForListUrl: '/group/getGroupListPage',
  queryForSelectUrl: '/group/getGroupList'
}
/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const add = (data: GroupForSubmit) => post(URL.addUrl, data)
/**
 * 修改
 * @param form 提交对象
 * @returns
 */
export const update = (data: GroupForSubmit) => post(URL.updateUrl, data)
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
export const queryForUpdate = (id: ID) => get<GroupForUpdate>(URL.queryForUpdateUrl, { params: { id } })
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
  condition: GroupSearchCondition
) => get<Pageable<GroupForList>>(URL.queryForListUrl, { params: { pageNo, pageSize, ...condition } })
/**
 * 查询列表用于下拉框
 * @param orgId 组织机构ID
 * @returns
 */
export const queryForSelect = (orgId?: ID) => get<GroupForSelect[]>(URL.queryForSelectUrl, { params: { orgId } })