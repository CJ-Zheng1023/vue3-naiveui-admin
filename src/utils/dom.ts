import config from '@/config'
import { ThemeEnum } from '@/enum'
const CLASS_NAME_SEPARATOR = ' '
/**
 * 切换body节点的className
 * @param theme 主题className
 */
export const changeBodyClassName = (theme: ThemeEnum) => {
  const $body = document.querySelector('body')
  const oldClassNames = $body!.className.split(CLASS_NAME_SEPARATOR)
  const newClassNames = oldClassNames.filter(item => item && !config.themeOptions.includes(item)).concat(theme)
  $body!.className = newClassNames.join(CLASS_NAME_SEPARATOR)
}
