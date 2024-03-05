import { ID, Pageable } from "@/types"
import { get, post } from '@/utils/request'

export type TagForList = {
  id: ID
  name: string
  description: string
  createTime: string
}
export type TagForForm = Pick<TagForList, 'name' | 'description'>
export type TagForUpdate = Pick<TagForList, 'name' | 'description' | 'id'>
export type TagForSubmit = { id?: ID } & TagForForm
export type TagForSelect = Pick<TagForList, 'name' | 'id'>
export type TagSearchCondition = {
  name: string
}
const URL = {
  addUrl: '/attachmentTag/createAttachmentTag',
  updateUrl: '/attachmentTag/updateAttachmentTag',
  removeUrl: '/attachmentTag/deleteAttachmentTag',
  queryForUpdateUrl: '/attachmentTag/getAttachmentTag',
  queryForListUrl: '/attachmentTag/getAttachmentTagListPage',
  queryForSelectUrl: '/attachmentTag/getAttachmentTagList'
}
/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const add = (data: TagForSubmit) => post(URL.addUrl, data)
/**
 * 修改
 * @param form 提交对象
 * @returns
 */
export const update = (data: TagForSubmit) => post(URL.updateUrl, data)
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
export const queryForUpdate = (id: ID) => get<TagForUpdate>(URL.queryForUpdateUrl, { params: { id } })
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
  condition: TagSearchCondition
) => get<Pageable<TagForList>>(URL.queryForListUrl, { params: { pageNo, pageSize, ...condition } })
/**
 * 查询列表用于下拉框
 * @returns
 */
export const queryForSelect = () => get<TagForSelect[]>(URL.queryForSelectUrl)