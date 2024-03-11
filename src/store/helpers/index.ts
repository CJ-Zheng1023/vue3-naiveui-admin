import { MenuTree } from '@/api/menu'
import useIconRender from '@/hooks/useIconRender'
import useLinkRender from '@/hooks/useLinkRender'
import { MenuOption } from 'naive-ui'
import { MenuTypeEnum } from '@/enum'
import { RouteRecordRaw } from 'vue-router'
import { Key } from 'naive-ui/es/menu/src/interface'
import { IBreadcrumb } from '@/types'
const asyncComponents = import.meta.glob(['@/views/**/index*.vue', '@/components/subPage/index.vue'])
const getAsyncComponent = (path: string) => {
  return asyncComponents['/src/' + path]
}

/**
 * 构建左侧菜单
 * @param permissions 当前用户拥有的菜单权限
 * @returns { MenuOption[] }
 */
export const buildMenuOptions = (permissions: MenuTree[]): MenuOption[] => {
  return permissions.reduce((array: MenuOption[], item: MenuTree): MenuOption[] => {
    // 去除没有子目录或者菜单的目录
    if (item.type === MenuTypeEnum.DIRECTORY && !item.menuList?.length) {
      return array
    }
    // 去除隐藏菜单
    if (item.type === MenuTypeEnum.MENU && item.ifHide) {
      return array
    }
    const menuOption: MenuOption = {
      key: item.id,
      path: item.router,
      menuName: item.name
    }
    if (item.icon) {
      menuOption.icon = useIconRender(item.icon)
    }
    if (item.type === MenuTypeEnum.DIRECTORY) {
      const children = buildMenuOptions(item.menuList!)
      return children.length ? array.concat({ ...menuOption, label: item.name, children }) : array
    } else {
      return array.concat({ ...menuOption, label: useLinkRender(item.router, item.name, item.routerType) })
    }
  }, [])
}
/**
 * 构建路由
 * @param permissions 当前用户拥有的菜单权限
 * @param root 父路由
 * @returns
 */
export const buildRoutes = (permissions: MenuTree[]): RouteRecordRaw[] => {
  return permissions.reduce((array: RouteRecordRaw[], item: MenuTree): RouteRecordRaw[] => {
    if (item.type === MenuTypeEnum.DIRECTORY && !item.menuList?.length) {
      return array
    }
    if (item.type === MenuTypeEnum.DIRECTORY) {
      const children = buildRoutes(item.menuList!)
      if (children.length) {
        const [subItem] = children
        return array.concat({
          path: item.router,
          name: item.name,
          component: getAsyncComponent(item.component),
          children,
          redirect: subItem.path
        })
      } else {
        return array
      }
    } else {
      const buttons = item.menuList ? item.menuList.map(b => b.authorizationId) : []
      return array.concat({
        path: item.router,
        name: item.name,
        component: getAsyncComponent(item.component),
        meta: {
          title: item.name,
          buttons
        }
      })
    }
  }, [])
}
/**
 * 根据当前路由地址，获取菜单路径key数组
 * @param menus 菜单树
 * @param keys 存储菜单路径key的容器
 * @param leafPath 当前菜单地址
 * @returns { Array<Key> | null }
 */
export const buildMenuPathKeys = (menus: Array<MenuOption>, keys: Array<Key>, leafPath: string): Array<Key> | null => {
  let result: Array<Key> | null = null
  for (const menu of menus) {
    if (menu.children?.length) {
      result = buildMenuPathKeys(menu.children, [menu.key!, ...keys], leafPath)
    } else {
      if (menu.path === leafPath) {
        result = [menu.key!, ...keys]
      }
    }
    if (result) {
      break
    }
  }
  return result
}
/**
 * 根据当前路由地址构建面包屑展示数据
 * @param key 菜单路径key
 * @param menus key这一层级的菜单集合
 * @returns { Array<IBreadcrumb> }
 */
export const buildBreadcrumbs = (key: Key, menus: MenuOption[]): IBreadcrumb => {
  return menus.reduce(
    (obj: IBreadcrumb, menu: MenuOption): IBreadcrumb => {
      if (menu.key === key) {
        obj.label = menu.menuName as string
        obj.children = menu.children
      }
      obj.options.push({
        label: menu.menuName as string,
        value: menu.key!,
        path: menu.path as string
      })
      return obj
    },
    {
      label: '',
      value: key,
      children: [],
      options: []
    }
  )
}
