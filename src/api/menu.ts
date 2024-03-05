import { get, post } from '@/utils/request'
import { ID, Pageable } from '@/types'
import { MenuTypeEnum, RouterTypeEnum } from '@/enum'
import { iconKeyType } from '@/plugins/carbon'
export const URL = {
  addUrl: '/menu/createMenu',
  updateUrl: '/menu/updateMenu',
  removeUrl: '/menu/deleteMenu',
  queryForUpdateUrl: '/menu/getMenu',
  queryForListUrl: '/menu/getMenuListPage',
  queryForTreeUrl: '/menu/getMenuList'
}
/**
 * 菜单树数据结构
 */
export type MenuTree = Directory | Menu
/**
 * 菜单列表数据结构
 */
export type MenuForList = Directory | Menu | Button
/**
 * 目录数据结构
 */
type Directory = {
  type: MenuTypeEnum.DIRECTORY
  name: string
  router: string
  orderNum: number
  component: string
  id: ID
  parentId?: ID
  icon?: iconKeyType
  menuList?: Array<MenuTree>
}
/**
 * 菜单数据结构
 */
type Menu = {
  type: MenuTypeEnum.MENU
  name: string
  router: string
  ifHide: boolean
  orderNum: number
  component: string
  id: ID
  parentId: ID
  icon?: iconKeyType
  menuList?: Array<Button>
  routerType: RouterTypeEnum
}
/**
 * 按钮数据结构
 */
type Button = {
  type: MenuTypeEnum.BUTTON
  name: string
  orderNum: number
  id: ID
  parentId: ID
  authorizationId: string
}
/**
 * 表单数据结构
 */
export type MenuForForm = {
  name: string
  router: string
  ifHide: boolean
  orderNum: number
  component: string
  type: MenuTypeEnum
  parentId: ID | null
  icon: iconKeyType | ''
  authorizationId: string
  routerType: RouterTypeEnum | null
}
export type MenuForUpdate = { id: ID } & MenuForForm
export type MenuForSubmit = { id?: ID } & MenuForForm

export type SimpleMenuTree = {
  id: ID
  name: string
  menuList?: SimpleMenuTree[]
}



/**
 * 查询菜单列表
 * @param pageNo 页码
 * @param pageSize 每页大小
 * @returns
 */
export const queryForList = (pageNo: number, pageSize: number) => get<Pageable<MenuForList>>(URL.queryForListUrl, { params: { pageNo, pageSize } })
/**
 * 查询菜单树
 * @param scope 查询范围
 * @returns
 */
export const queryForTree = (scope: MenuTypeEnum) => get<SimpleMenuTree[]>(URL.queryForTreeUrl, { params: { scope } })
/**
 * 创建
 * @param menu
 * @returns
 */
export const add = (menu: MenuForSubmit) => post(URL.addUrl, menu)
/**
 * 修改
 * @param menu
 * @returns
 */
export const update = (menu: MenuForSubmit) => post(URL.updateUrl, menu)
/**
 * 删除
 * @param ids
 * @returns
 */
export const remove = (ids: ID[]) => post(URL.removeUrl, ids)
/**
 * 查询回显内容
 * @param id
 * @returns
 */
export const queryForUpdate = (id: ID) => get<MenuForUpdate>(URL.queryForUpdateUrl, { params: { id } })
