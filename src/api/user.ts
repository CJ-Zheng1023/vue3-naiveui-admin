import { get, post } from '@/utils/request'
import { MenuTree } from '@/api/menu'
import { ID, Pageable } from '@/types'
export type UserForList = {
  id: ID
  username: string
  name: string
  groupName: string
  telephone: string
  email: string
  status: boolean
  ifOrgAdmin: boolean
}
export type UserForForm =
  Omit<UserForList, 'id' | 'groupName' | 'ifOrgAdmin'>
  & { groupId: ID | null, roleIds: ID[] | null, password: string }
export type UserForUpdate =
  UserForForm & { groupId: ID, id: ID }
export type UserForSubmit = { id?: ID } & Omit<UserForUpdate, 'id'>
export type UserForSelect = {
  id: ID
  name: string
}
export type UserSearchCondition = {
  name: string
  username: string
  status: boolean | null
}

export const URL = {
  loginUrl: '/user/login',
  logoutUrl: '/user/logout',
  queryPermissionsByUserUrl: '/menu/permissions',
  changePasswordUrl: '/user/resetPassword',
  addUrl: '/user/createUser',
  updateUrl: '/user/updateUser',
  removeUrl: '/user/deleteUser',
  queryForUpdateUrl: '/user/getUser',
  queryForListUrl: '/user/getUserListPage',
  queryForSelectUrl: '/user/getGroupUserList'
}
/**
 * 查询当前登录用户可访问菜单(包括按钮权限)
 * @returns
 */
export const queryPermissionsByUser = () => get<MenuTree[]>(URL.queryPermissionsByUserUrl)
/**
 * 登录
 * @param username 用户名
 * @param password 密码
 * @returns
 */
export const login = (username: string, password: string) =>
  post<{ token: string; realName: string }>(URL.loginUrl, { username, password })
/**
 * 登出
 * @returns
 */
export const logout = () => get(URL.logoutUrl)
/**
 * 修改密码
 * @param password
 * @returns
 */
export const changePassword = (password: string) => post(URL.changePasswordUrl, { password })
/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const add = (data: UserForSubmit) => post(URL.addUrl, data)
/**
 * 修改
 * @param form 提交对象
 * @returns
 */
export const update = (data: UserForSubmit) => post(URL.updateUrl, data)
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
export const queryForUpdate = (id: ID) => get<UserForUpdate>(URL.queryForUpdateUrl, { params: { id } })
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
  condition: UserSearchCondition
) => get<Pageable<UserForList>>(URL.queryForListUrl, { params: { pageNo, pageSize, ...condition } })
/**
 * 查询列表用于下拉框
 * @returns
 */
export const queryForSelect = () => get<UserForSelect[]>(URL.queryForSelectUrl)
