import { queryPermissionsByUser } from '@/api/user'
import config from '@/config'
import { ThemeEnum } from '@/enum'
import { storage } from '@/utils/storage'
import { MenuOption } from 'naive-ui'
import { Key } from 'naive-ui/es/menu/src/interface'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { buildRoutes, buildMenuOptions, buildMenuPathKeys, buildBreadcrumbs } from './helpers'
import { IBreadcrumb } from '@/types'
export interface IAppState {
  collapsed: boolean
  initialized: boolean
  menus: Array<MenuOption>
  dynamicRoutes: Array<RouteRecordRaw>
  currentPath: string
  isMd: boolean
  theme: ThemeEnum
}
export const useAppStore = defineStore('appStore', {
  state: (): IAppState => ({
    collapsed: false,
    // 左侧菜单
    menus: [],
    // 菜单是否初始化
    initialized: false,
    // 路由
    dynamicRoutes: [],
    // 当前路由地址
    currentPath: '',
    // 浏览器窗口是否为中等屏幕(宽度大于992px)
    isMd: false,
    // 主题风格
    theme: storage.get(config.themeKeyName) || ThemeEnum.LIGHT
  }),
  getters: {
    menuPathKeys: (state): Array<Key> => {
      const currentPath = state.currentPath
      if (!currentPath) {
        return []
      }
      // @ts-ignore
      return buildMenuPathKeys(state.menus, [], currentPath) || []
    },
    reservedMenuPathKeys(): Array<Key> {
      const keys: Array<Key> = this.menuPathKeys
      return [...keys].reverse()
    },
    breadcrumbs() {
      const keys: Array<Key> = this.reservedMenuPathKeys
      let menus = this.menus
      return keys.reduce((array: IBreadcrumb[], key) => {
        const obj = buildBreadcrumbs(key, menus)
        if (obj.children) {
          menus = obj.children
        }
        return array.concat(obj)
      }, [])
    }
  },
  actions: {
    changeCollapsed(flag: boolean) {
      this.collapsed = flag
    },
    queryPermissions() {
      return queryPermissionsByUser().then(res => {
        this.menus = buildMenuOptions(res.data)
        const routes = buildRoutes(res.data)
        this.dynamicRoutes = routes
        this.initialized = true
        return routes
      })
    },
    changeTheme(theme: ThemeEnum) {
      this.theme = theme
      storage.set(config.themeKeyName, theme, null)
    },
    updateCurrentPath(newPath: string) {
      this.currentPath = newPath
    },
    changeIsMd(flag: boolean) {
      this.isMd = flag
    },
    reset() {
      this.menus = []
      this.dynamicRoutes = []
      this.initialized = false
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
