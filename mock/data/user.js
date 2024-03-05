export const login = {
  code: 200,
  msg: '成功',
  data: {
    token: 'token',
    realName: 'admin'
  }
}
export const permissions = {
  code: 200,
  msg: '查询成功',
  data: [
    {
      id: 1,
      router: '/meta',
      name: '元数据管理',
      component: 'components/subPage/index.vue',
      type: 1,
      icon: 'DataCenter',
      menuList: [
        {
          id: 11,
          router: '/meta/member',
          name: '用户等级管理',
          component: 'views/meta/member/index.vue',
          type: 2,
          icon: 'DataCenter'
        },
        {
          id: 12,
          router: '/meta/tag',
          name: '附件标签管理',
          component: 'views/meta/tag/index.vue',
          type: 2,
          icon: 'Datastore'
        },
        {
          id: 13,
          router: '/meta/org',
          name: '组织机构管理',
          component: 'views/meta/organization/index.vue',
          type: 2,
          icon: 'Datastore'
        },
        {
          id: 14,
          router: '/meta/check',
          name: '检查项目管理',
          component: 'views/meta/check/index.vue',
          type: 2,
          icon: 'Datastore'
        },
        {
          id: 15,
          router: '/meta/group',
          name: '组管理',
          component: 'views/meta/group/index.vue',
          type: 2,
          icon: 'Datastore'
        },
        {
          id: 16,
          router: '/meta/menu',
          name: '菜单管理',
          component: 'views/meta/menu/index.vue',
          type: 2,
          icon: 'Datastore'
        },
        {
          id: 17,
          router: '/meta/checkTemplate',
          name: '检查项目模板管理',
          component: 'views/meta/checkTemplate/index.vue',
          type: 2,
          icon: 'Datastore'
        }
      ]
    }, {
      id: 2,
      router: '/admin',
      name: '系统管理',
      component: 'components/subPage/index.vue',
      type: 1,
      icon: 'DataCenter',
      menuList: [
        {
          id: 21,
          router: '/admin/user',
          name: '用户管理',
          component: 'views/admin/user/index.vue',
          type: 2,
          icon: 'Datastore'
        },
        {
          id: 22,
          router: '/admin/role',
          name: '角色管理',
          component: 'views/admin/role/index.vue',
          type: 2,
          icon: 'Datastore'
        }
      ]
    }
  ]
  /* data: [
    {
      id: 1,
      router: '/data',
      name: '数据管理',
      component: 'components/subPage/index.vue',
      url: '/data/sdBank',
      type: 1,
      icon: 'DataCenter',
      menuList: [
        {
          id: 11,
          router: '/data/sdBank',
          name: '专病库',
          component: 'views/data/sdBank/index.vue',
          icon: 'Datastore',
          type: 2,
          menuList: [
            {
              id: 111,
              name: '新增按钮',
              type: 3,
              authorizationId: 'create'
            },
            {
              id: 112,
              name: '修改按钮',
              type: 3,
              authorizationId: 'modify'
            },
            {
              id: 113,
              name: '删除按钮',
              type: 3,
              authorizationId: 'remove'
            },
            {
              id: 114,
              name: '下载按钮',
              type: 3,
              authorizationId: 'download'
            }
          ]
        },
        {
          id: 12,
          router: '/data/dataSet',
          name: '数据集',
          component: 'views/data/dataSet/index.vue',
          icon: 'CicsSystemGroup',
          type: 2,
          menuList: [
            {
              id: 121,
              name: '新增按钮',
              type: 3,
              authorizationId: 'create'
            },
            {
              id: 122,
              name: '修改按钮',
              type: 3,
              authorizationId: 'modify'
            },
            {
              id: 123,
              name: '删除按钮',
              type: 3,
              authorizationId: 'remove'
            },
            {
              id: 124,
              name: '收集开关',
              type: 3,
              authorizationId: 'collect'
            },
            {
              id: 125,
              name: '下载开关',
              type: 3,
              authorizationId: 'download'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      router: '/search',
      name: '数据检索',
      component: 'components/subPage/index.vue',
      icon: 'SearchLocate',
      url: '/search/mica',
      type: 1,
      menuList: [
        {
          id: 21,
          router: '/search/mica',
          name: '疾病资源库',
          component: 'views/search/mica/index.vue',
          icon: 'Hospital',
          type: 2
        },
        {
          id: 22,
          router: '/search/estroke',
          name: '卒中资源库',
          component: 'views/search/estroke/index.vue',
          icon: 'Cognitive',
          type: 2
        }
      ]
    },
    {
      id: 3,
      router: '/notification',
      name: '站内消息',
      component: 'views/notification/index.vue',
      icon: 'Notification',
      type: 1
    },
    {
      id: 4,
      router: '/admin',
      name: '系统管理',
      component: 'components/subPage/index.vue',
      url: '/admin/user',
      icon: 'CloudServiceManagement',
      type: 1,
      menuList: [
        {
          id: 41,
          router: '/admin/user',
          name: '人员管理',
          component: 'views/admin/user/index.vue',
          icon: 'User',
          type: 2
        },
        {
          id: 42,
          router: '/admin/role',
          name: '角色管理',
          component: 'views/admin/role/index.vue',
          icon: 'TwoFactorAuthentication',
          type: 2
        },
        {
          id: 43,
          router: '/admin/menu',
          name: '菜单管理',
          component: 'views/admin/menu/index.vue',
          icon: 'Menu',
          type: 2
        },
        {
          id: 44,
          router: '/admin/bodyPart',
          name: '部位管理',
          component: 'views/admin/bodyPart/index.vue',
          icon: 'LicenseThirdPartyDraft',
          type: 2
        }
      ]
    },
    {
      id: 5,
      router: '/log',
      name: '日志查询',
      component: 'views/log/index.vue',
      icon: 'Catalog',
      type: 1
    },
    {
      id: 6,
      router: '/downloadRecord',
      name: '下载记录',
      component: 'views/downloadRecord/index.vue',
      icon: 'DocumentDownload',
      type: 1
    },
    {
      id: 7,
      router: 'http://39.107.66.122:83/',
      name: '数据资产',
      icon: 'Link',
      type: 1,
      routerType: 2
    }
  ] */
}
