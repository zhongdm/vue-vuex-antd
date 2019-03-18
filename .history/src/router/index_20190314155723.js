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
      component: () => import('@/pages/home/Home')
    },
    {
      path: '/settings',
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
