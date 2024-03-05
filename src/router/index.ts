import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'
import config from '@/config'
const create = () =>
  createRouter({
    history: createWebHistory(),
    routes: constantRoutes
  })
const router = create()
export const reset = () => {
  router.removeRoute(config.rootRouteName)
  router.removeRoute(config.redirect404RouteName)
}
export default router
