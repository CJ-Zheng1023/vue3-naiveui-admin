import { MenuTypeEnum, RouterTypeEnum } from '@/enum'
export const menuTypeMap = {
  [MenuTypeEnum.DIRECTORY]: '目录',
  [MenuTypeEnum.MENU]: '菜单',
  [MenuTypeEnum.BUTTON]: '按钮'
}
export const defaultMenuType = MenuTypeEnum.DIRECTORY

export const routerTypeMap = {
  [RouterTypeEnum.INTERNAL]: '内部链接',
  [RouterTypeEnum.EXTERNAL]: '外部链接'
}
export const defaultRouterType = RouterTypeEnum.INTERNAL
