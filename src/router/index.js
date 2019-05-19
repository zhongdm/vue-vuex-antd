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
          path: 'info',
          name: 'Editor',
          component: () => import('@/pages/home/Editor')
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('@/pages/settings'),
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
            },
            {
              path: 'menu',
              name: 'Menu',
              component: () => import('@/pages/settings/Menu')
            },
            {
              path: 'auth',
              name: 'Auth',
              component: () => import('@/pages/settings/Auth')
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('u')) {
    next()
  } else {
    if (to.path === '/login') { //这就是跳出循环的关键
      next()
   } else {
    next({path: '/login'})
   }
  }
})

export default router
