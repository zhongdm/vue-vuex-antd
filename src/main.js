// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import TestPlugin from './plugins-custom/TestPlugin'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import JsEncrypt from 'jsencrypt'
// import router from './router'
// import store from '@/store'
import { createRouter } from './router'
import { createStore } from '@/store'
import { sync } from 'vuex-router-sync'
import EventBus from './plugins-custom/SharedEventBus'
import VCharts from 'v-charts'

Vue.config.productionTip = false
Vue.use(TestPlugin)
Vue.use(EventBus)
Vue.use(Antd)
// Vue.use(ElementUI)
Vue.use(VCharts)
Vue.prototype.$jsEncrypt = JsEncrypt

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

export function createApp () {

  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App) 
  })

  return {app, router, store}
  // return { app, router, store, eventBus: app.$events }
}
