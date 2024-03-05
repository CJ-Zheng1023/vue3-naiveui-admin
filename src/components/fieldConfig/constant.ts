import { InputTypeEnum, SearchTypeEnum } from "./enum"

type InputTypeOption = {
  id: InputTypeEnum
  name: string
}
type SearchTypeOption = {
  id: SearchTypeEnum
  name: string
}
export const inputTypeOptions: InputTypeOption[] = [
  {
    id: InputTypeEnum.TEXT,
    name: '输入域'
  },
  {
    id: InputTypeEnum.TEXTAREA,
    name: '文本域'
  },
  {
    id: InputTypeEnum.NUMBER,
    name: '数值'
  },
  {
    id: InputTypeEnum.NATURAL_NUMBER,
    name: '自然数'
  },
  {
    id: InputTypeEnum.DATE,
    name: '日期'
  },
  {
    id: InputTypeEnum.DATE_TIME,
    name: '日期时间'
  }
]
export const searchTypeOptions: SearchTypeOption[] = [
  {
    id: SearchTypeEnum.TEXT,
    name: '文本搜索'
  },
  {
    id: SearchTypeEnum.RANGE_NUMBER,
    name: '数值范围搜索'
  },
  {
    id: SearchTypeEnum.RANGE_NATURAL_NUMBER,
    name: '自然数范围搜索'
  },
  {
    id: SearchTypeEnum.RANGE_DATE,
    name: '日期范围搜索'
  },
  {
    id: SearchTypeEnum.RANGE_DATE_TIME,
    name: '日期时间范围搜索'
  }
]