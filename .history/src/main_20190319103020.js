// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import TestPlugin from './plugins-custom/TestPlugin'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import jsEncrypt from 'jsencrypt'

Vue.config.productionTip = false
Vue.use(TestPlugin)
Vue.use(Antd)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})