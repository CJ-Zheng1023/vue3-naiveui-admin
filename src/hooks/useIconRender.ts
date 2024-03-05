import { iconKeyType, icons } from '@/plugins/carbon'
import { NIcon } from 'naive-ui'
export default (icon: iconKeyType) => {
  return () =>
    h(NIcon, {
      component: icons[icon]
    })
}
