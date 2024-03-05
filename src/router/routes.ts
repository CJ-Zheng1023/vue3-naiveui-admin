import config from '@/config'
export const constantRoutes = [
  {
    path: config.pathLogin,
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: config.path403,
    name: '403',
    meta: {
      title: '访问受限'
    },
    component: () => import('@/views/403/index.vue')
  },
  {
    path: config.path404,
    name: '404',
    meta: {
      title: '页面不存在'
    },
    component: () => import('@/views/404/index.vue')
  }
]
