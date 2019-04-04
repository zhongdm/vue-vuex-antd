import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    login (state, data) {
      console.log('store', data)
      state.username = data.username
    }
  },
  actions: {
    login ({commit, state}, loginInfo) {
      console.log('aaa')
      commit('login', loginInfo)
    }
  }
})

export default store
