<script setup lang="ts">
import { zhCN, dateZhCN, darkTheme, GlobalThemeOverrides, NSpace, NButton, NotificationReactive } from 'naive-ui'
import { useMediaQuery } from '@vueuse/core'
import { useAppStore } from './store/app'
import { changeBodyClassName } from '@/utils/dom'
import { storeToRefs } from 'pinia'
import { ThemeEnum } from '@/enum'
const isMd = useMediaQuery('(min-width: 992px)')
const appStore = useAppStore()
const { theme } = storeToRefs(appStore)
watchEffect(() => {
  appStore.changeIsMd(isMd.value)
  appStore.changeCollapsed(!isMd.value)
})
watchEffect(() => {
  changeBodyClassName(theme.value)
})
let version = ''
let timer: undefined | number = void 0
let n: NotificationReactive
onMounted(() => {
  _checkVersion()
})
onBeforeMount(() => {
  clearTimeout(timer)
})
// 获取最新版本号
const _getVersion = () => {
  return fetch('/index.html').then(res => res.text()).then(data => {
    const arr = data.match(/<script.+(\d+\.\d+\.\d+.*)\.js/)
    return arr ? arr[1] : ''
  })
}
// 比较版本号
const _checkVersion = () => {
  _getVersion().then(v => {
    if (version) {
      if (version !== v) {
        n = window.$notification.info({
          title: '更新提示',
          content: '页面有新版本更新，点击确定可更新页面。',
          meta: `版本号：V${v}`,
          duration: 10000,
          action: () => h(NSpace, null, {
            default: () => [
              h(NButton, {
                strong: true,
                secondary: true,
                size: 'small',
                type: 'success',
                onClick: () => {
                  window.location.reload()
                }
              }, {
                default: () => '确定'
              }),
              h(NButton, {
                strong: true,
                secondary: true,
                size: 'small',
                onClick: () => {
                  n.destroy()
                }
              }, {
                default: () => '关闭'
              })
            ]
          })
        })
      }
    } else {
      version = v
    }
  }).catch(e => {
    console.log(e)
  }).finally(() => {
    // 每半小时检查更新
    timer = setTimeout(_checkVersion, 1800000)
  })
}
// light主题样式重置
const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#009ef7'
  },
  DataTable: {
    tdColor: '#fff',
    borderColor: 'rgb(228, 230, 239)',
    thColor: '#fff',
    thTextColor: 'rgb(161, 165, 183)',
    thFontWeight: '600',
    tdColorHover: '#fff',
    thColorHover: '#fff'
  }
}
// dark主题样式重置
const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#009ef7'
  },
  Drawer: {
    color: 'rgb(30, 30, 45)'
  },
  DataTable: {
    tdColor: 'rgb(30, 30, 45)',
    borderColor: 'rgb(50, 50, 72)',
    thColor: 'rgb(30, 30, 45)',
    thFontWeight: '600',
    tdColorHover: 'rgb(30, 30, 45)',
    thColorHover: 'rgb(30, 30, 45)'
  }
}
</script>

<template>
  <n-config-provider
    :theme-overrides="theme === ThemeEnum.DARK ? darkThemeOverrides : lightThemeOverrides"
    :theme="theme === ThemeEnum.DARK ? darkTheme : null"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :breakpoints="{ s: 576, m: 850, l: 1400, xl: 1800, xxl: 2560 }"
    style="height: 100%;"
  >
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <router-view />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
