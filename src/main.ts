import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import iconComponent from '@/plugins/carbon'
import messages from '@intlify/unplugin-vue-i18n/messages'
import useMock from '#/index'
import { useGuard } from '@/router/guard'
import '@/styles/index.less'
if (import.meta.env.VITE_APP_MOCK === 'open') {
  useMock()
}
const i18n = createI18n({
  legacy: false,
  locale: 'cn',
  globalInjection: true,
  messages
})
const app = createApp(App)
const pinia = createPinia()
app.use(i18n)
app.use(pinia)
app.use(router)
app.use(iconComponent)
app.mount('#app')
useGuard()
