import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/',
      name: 'Root',
      component: () => import('@/pages/MainLayout'),
      children: [
        {
          path: '',
          name: 'Info',
          component: () => import('@/pages/home/Info')
        },
        {
          path: 'charts',
          name: 'Charts',
          component: () => import('@/pages/map'),
          children: [
            {
              path: '',
              redirect: 'map'
            },
            {
              path: 'map',
              name: 'Map',
              component: () => import('@/pages/map/path')
            }
          ]
        },
        {
          path: 'settings',
          name: 'Settings',
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
          name: 'Tragedy',
          component: () => import('@/pages/tragedy/Index'),
          children: [
            {
              path: 'native',
              name: 'Native',
              component: () => import('@/pages/tragedy/PatchHandle')
            },
            {
              path: 'worker',
              name: 'Worker',
              component: () => import('@/pages/tragedy/DedicatedWorker')
            },
            {
              path: 'sw1',
              name: 'SW1',
              component: () => import('@/pages/tragedy/SharedWorker1')
            },
            {
              path: 'sw2',
              name: 'SW2',
              component: () => import('@/pages/tragedy/SharedWorker2')
            }
          ]
        },
        {
          path: '/chatroom',
          name: 'ChatRoom',
          component: () => import('../pages/chatroom')
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log(to.path, from)
//   next()
// })

export function createRouter () {
  return router
}
// export default router
