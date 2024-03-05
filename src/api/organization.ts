import { ID, Pageable } from "@/types"
import { get, post } from '@/utils/request'

export type OrganizationForList = {
  id: ID
  name: string
  expirationTime: number // 会员过期时间
  description: string
  memberLevelName: string // 会员等级名称
  status: boolean // 状态
  contacts: string // 联系人
  telephone: string
  createTime: string
}
export type OrganizationForForm =
  { expirationTime: number | null, memberLevelId: ID | null }
  & Pick<OrganizationForList, 'name' | 'status' | 'contacts' | 'telephone' | 'description'>

export type OrganizationForUpdate =
  Pick<OrganizationForList, 'id' | 'name' | 'description' | 'status' | 'contacts' | 'telephone'>
  & { memberLevelId: ID, expirationTime: number }
export type OrganizationForSubmit =
  { id?: ID }
  & Omit<OrganizationForUpdate, 'id'>
export type OrganizationForSelect = {
  id: ID
  name: string
}
export type OrganizationSearchCondition = {
  name: string
  memberLevelId: ID | null
  minExpirationTime: number | null
  maxExpirationTime: number | null
}
const URL = {
  addUrl: '/org/createOrg',
  updateUrl: '/org/updateOrg',
  removeUrl: '/org/deleteOrg',
  queryForUpdateUrl: '/org/getOrg',
  queryForListUrl: '/org/getOrgListPage',
  queryForSelectUrl: '/org/getOrgList',
  saveAdminUrl: '/user/createOrgAdmin',
  queryAdminUrl: '/user/getOrgAdmin'
}
/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const add = (data: OrganizationForSubmit) => post(URL.addUrl, data)
/**
 * 修改
 * @param form 提交对象
 * @returns
 */
export const update = (data: OrganizationForSubmit) => post(URL.updateUrl, data)
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
export const queryForUpdate = (id: ID) => get<OrganizationForUpdate>(URL.queryForUpdateUrl, { params: { id } })
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
  condition: OrganizationSearchCondition
) => get<Pageable<OrganizationForList>>(URL.queryForListUrl, { params: { pageNo, pageSize, ...condition } })
/**
 * 查询列表用于下拉框
 * @returns
 */
export const queryForSelect = () => get<OrganizationForSelect[]>(URL.queryForSelectUrl)
/**
 * 组织机构管理员用于回显的数据结构
 */
export type OrgAdminForUpdate = {
  id: ID
  username: string
  password: string
  name: string
  telephone: string
  email: string
  status: boolean
  groupId: ID
}
export type OrgAdminForForm = Omit<OrgAdminForUpdate, 'id' | 'groupId'> & { groupId: ID | null }
export type OrgAdminForSubmit =
  & { orgId: ID, id?: ID } & Omit<OrgAdminForUpdate, 'id'>
/**
 * 查询组织机构管理员
 * @param orgId 组织机构ID
 * @returns
 */
export const queryAdmin = (orgId: ID) => get<OrgAdminForUpdate | ''>(URL.queryAdminUrl, { params: { orgId } })
/**
 * 保存组织机构管理员
 * @param data
 * @returns
 */
export const saveAdmin = (data: OrgAdminForSubmit) => post(URL.saveAdminUrl, data)