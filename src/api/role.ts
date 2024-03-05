import { ID, Pageable } from "@/types"
import { get, post } from '@/utils/request'

export type RoleForList = {
  id: ID
  name: string
  description: string
}
export type RoleForForm = Omit<RoleForList, 'id'>
export type RoleForUpdate = RoleForList
export type RoleForSubmit = { id?: ID } & RoleForForm
export type RoleForSelect = {
  id: ID
  name: string
}
export type RoleSearchCondition = {
  name: string
}
const URL = {
  addUrl: '/role/createRole',
  updateUrl: '/role/updateRole',
  removeUrl: '/role/deleteRole',
  queryForUpdateUrl: '/role/getRole',
  queryForListUrl: '/role/getRoleListPage',
  queryForSelectUrl: '/role/getRoleList',
  queryMenusUrl: '/menu/getBindMenuList',
  bindMenusUrl: '/role/bindMenus'
}
/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const add = (data: RoleForSubmit) => post(URL.addUrl, data)
/**
 * 修改
 * @param form 提交对象
 * @returns
 */
export const update = (data: RoleForSubmit) => post(URL.updateUrl, data)
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
export const queryForUpdate = (id: ID) => get<RoleForUpdate>(URL.queryForUpdateUrl, { params: { id } })
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
  condition: RoleSearchCondition
) => get<Pageable<RoleForList>>(URL.queryForListUrl, { params: { pageNo, pageSize, ...condition } })
/**
 * 查询列表用于下拉框
 * @returns
 */
export const queryForSelect = () => get<RoleForSelect[]>(URL.queryForSelectUrl)
/**
 * 查询已绑定菜单
 * @param roleId 角色ID
 * @returns 
 */
export const queryMenus = (roleId: ID) => get<ID[]>(URL.queryMenusUrl, { params: { roleId } })
/**
 * 绑定菜单
 * @param roleId 角色ID
 * @param menuIds 菜单ID集合
 * @returns 
 */
export const bindMenus = (roleId: ID, menuIds: ID[]) => post(URL.bindMenusUrl, { roleId, menuIds })