import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/home',
      component: () => import('@/pages/home/Home'),
      children: [
        {
          path: '',
          name: 'Hinfo',
          component: () => import('@/pages/Login')
        },
        {
          path: 'settings',
          name: 'Setting Center',
          component: () => import('@/pages/settings/Settings')
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
