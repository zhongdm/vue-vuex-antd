import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    login (state, data) {
      state.username = data.username
      if (!sessionStorage.getItem('u')) {
        sessionStorage.setItem('u', data.username)
      }
    }
  },
  actions: {
    login ({commit, state}, loginInfo) {
      commit('login', loginInfo)
    }
  }
})

// export default store
export function createStore () {
  return store
}
