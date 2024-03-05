import { RouterLink } from 'vue-router'
import { RouterTypeEnum } from '@/enum'

export default (path: string, name: string, routerType: RouterTypeEnum) => {
  return routerType === RouterTypeEnum.EXTERNAL
    ? () =>
        h(
          'a',
          {
            onClick: () => {
              window.open(path)
            }
          },
          {
            default: () => name
          }
        )
    : () =>
        h(
          RouterLink,
          {
            to: {
              path
            }
          },
          {
            default: () => name
          }
        )
}
