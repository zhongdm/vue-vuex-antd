import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/',
      component: () => import('@/pages/MainLayout'),
      children: [
        {
          path: '',
          component: () => import('@/pages/home/Info')
        },
        {
          path: 'charts',
          component: () => import('@/pages/map'),
          children: [
            {
              path: '',
              redirect: 'map'
            },
            {
              path: 'map',
              name: 'map',
              component: () => import('@/pages/map/path')
            }
          ]
        },
        {
          path: 'settings',
          component: () => import('@/pages/settings/Settings'),
          children: [
            {
              path: '',
              redirect: 'user'
            },
            {
              path: 'user',
              name: 'User',
              component: () => import('@/pages/settings/User')
            },
            {
              path: 'role',
              name: 'Role',
              component: () => import('@/pages/settings/Role')
            }
          ]
        },
        {
          path: 'tragedy',
          component: () => import('@/pages/tragedy/Index'),
          children: [
            {
              path: 'native',
              component: () => import('@/pages/tragedy/PatchHandle')
            },
            {
              path: 'worker',
              component: () => import('@/pages/tragedy/DedicatedWorker')
            },
            {
              path: 'sw1',
              component: () => import('@/pages/tragedy/SharedWorker1')
            },
            {
              path: 'sw2',
              component: () => import('@/pages/tragedy/SharedWorker2')
            }
          ]
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log(to.path, from)
//   next()
// })
export default router
