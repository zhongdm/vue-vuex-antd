import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/Home',
      nam: 'Home',
      component: () => import('@/pages/Home')
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
})
export default router