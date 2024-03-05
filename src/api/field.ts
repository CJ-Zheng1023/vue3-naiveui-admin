import { InputTypeEnum, SearchTypeEnum } from "@/components/fieldConfig/enum"
import { ID } from "@/types"
import { get, post } from '@/utils/request'
export type FieldForList = {
  id: ID
  tag: string
  name: string
  unit: string
  inputType: InputTypeEnum | null
  searchType: SearchTypeEnum | null
  orderNum: number
  ifAnalysis: boolean
  editable?: boolean
  ifSubmit?: boolean
}
export type fieldForSubmit =
  { id?: ID }
  & Pick<FieldForList, 'tag' | 'name' | 'unit' | 'inputType' | 'searchType' | 'orderNum' | 'ifAnalysis'>
const URL = {
  addUrl: '/field/createField',
  updateUrl: '/field/updateField',
  removeUrl: '/field/deleteField',
  queryForListUrl: '/field/getFieldList',
  importTemplateUrl: '/field/importFieldList'
}
/**
 * 添加
 * @param data 提交对象
 * @returns
 */
export const add = (data: fieldForSubmit) => post<ID>(URL.addUrl, data)
/**
 * 修改
 * @param form 提交对象
 * @returns
 */
export const update = (data: fieldForSubmit) => post(URL.updateUrl, data)
/**
 * 删除
 * @param ids id集合
 * @returns
 */
export const remove = (ids: ID[]) => post(URL.removeUrl, ids)
/**
 * 查询检查字段集合
 * @param checkItemId 检查ID
 * @returns
 */
export const queryForList = (
  checkItemId: ID
) => get<FieldForList[]>(URL.queryForListUrl, { params: { checkItemId } })
/**
 * 导入模板
 * @param checkItemId 检查项目ID
 * @param modelCheckItemId 检查项目模板ID
 * @returns 
 */
export const importTemplate = (checkItemId: ID, modelCheckItemId: ID) => post(URL.importTemplateUrl, { checkItemId, modelCheckItemId })