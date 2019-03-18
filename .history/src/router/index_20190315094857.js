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
          name: 'Hinfo',
          component: () => import('@/pages/Login')
        },
        {
          path: 'settings',
          name: 'Setting Center',
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
          path: 'info',
          name: 'Info Center',
          component: () => import('@/pages/home/Info')
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
