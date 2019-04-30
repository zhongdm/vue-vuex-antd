import Vue from 'vue'
import fetch from '../api/fetch'

/**
 * 共享的EventBus插件
 */
export default {
  install (Vue) {
    const EventBus = new Vue({
      data () {
        return {
          info: {}
        }
      },
      methods: {
        getInfo () {
          return fetch('http://localhost:3000/api/getInfo').then(res => {
            this.info = res
          })
        }
      },
    })

    Vue.prototype.$events = EventBus
    Vue.$events = EventBus
  }
}