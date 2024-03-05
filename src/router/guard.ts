import router from '.'
import config from '@/config'
import { useAppStore } from '@/store/app'
import Layouts from '@/layouts/index.vue'
import { useToken } from '@/hooks/useToken'
import { useUserStore } from '@/store/user'
const whiteList = [config.pathLogin, config.path404, config.path403]
export const useGuard = () => {
  const appStore = useAppStore()
  router.beforeEach((to, _, next) => {
    document.title = to.meta.title ?? ''
    const token = useToken()
    if (token.value) {
      if (whiteList.includes(to.path)) {
        if (to.path === config.pathLogin) {
          next('/')
        } else {
          next()
        }
        return
      }
      if (appStore.initialized) {
        next()
      } else {
        appStore
          .queryPermissions()
          .then(subRoutes => {
            const route = {
              path: '/',
              redirect: subRoutes[0]?.path || config.path403,
              name: config.rootRouteName,
              component: Layouts,
              children: subRoutes
            }
            router.addRoute(route)
            router.addRoute({
              name: config.redirect404RouteName,
              path: '/:pathMatch(.*)*',
              redirect: config.path404
            })
            next({ ...to, replace: true })
          })
          .catch(e => {
            console.log(e)
            const userStore = useUserStore()
            userStore.reset()
            next(config.pathLogin)
          })
      }
    } else {
      if (to.path === config.pathLogin) {
        next()
      } else {
        next(config.pathLogin)
      }
    }
  })
}
