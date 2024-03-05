import * as icons from '@vicons/carbon'
import { App } from 'vue'
import { objectKeys } from '@/utils/lib'
// 注册图标库组件
const install = (app: App) => {
  objectKeys(icons).forEach(key => {
    app.component(key, icons[key])
  })
}
export type iconKeyType = keyof typeof icons
export default {
  install
}
export { icons }
