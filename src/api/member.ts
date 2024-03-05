import { ID, Pageable } from "@/types"
import { get, post } from '@/utils/request'

export type MemberForList = {
  id: ID
  name: string
  accountCt: number
  createTime: string
}
export type MemberForForm = {
  name: string
  menuIds: ID[]
  accountCt: number
}
export type MemberForUpdate = {
  id: ID
  name: string
  menuIds: ID[]
  accountCt: number
}
export type MemberForSubmit = {
  id?: ID
  name: string
  menuIds: ID[]
  accountCt: number
}
export type MemberForSelect = {
  id: ID
  name: string
}
export type MemberSearchCondition = {
  name: string
}
const URL = {
  addUrl: '/member/createMember',
  updateUrl: '/member/updateMember',
  removeUrl: '/member/deleteMember',
  queryForUpdateUrl: '/member/getMember',
  queryForListUrl: '/member/getMemberListPage',
  queryForSelectUrl: '/member/getMemberList'
}
/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const add = (data: MemberForSubmit) => post(URL.addUrl, data)
/**
 * 修改
 * @param form 提交对象
 * @returns
 */
export const update = (data: MemberForSubmit) => post(URL.updateUrl, data)
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
export const queryForUpdate = (id: ID) => get<MemberForUpdate>(URL.queryForUpdateUrl, { params: { id } })
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
  condition: MemberSearchCondition
) => get<Pageable<MemberForList>>(URL.queryForListUrl, { params: { pageNo, pageSize, ...condition } })
/**
 * 查询列表用于下拉框
 * @returns
 */
export const queryForSelect = () => get<MemberForSelect[]>(URL.queryForSelectUrl)