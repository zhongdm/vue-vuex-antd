import Vuex from 'vuex'

const store = new Vuex.store({
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
      commit('login', loginInfo)
    }
  }
})