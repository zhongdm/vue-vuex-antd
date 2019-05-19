import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: sessionStorage.getItem('u') || '',
    menuPath: sessionStorage.getItem('menu-path')
              && JSON.parse(sessionStorage.getItem('menu-path')) || [],
    menuList: sessionStorage.getItem('menu-list')
              && JSON.parse(sessionStorage.getItem('menu-list')) || []
  },
  mutations: {
    login (state, data) {
      state.username = data.account
      sessionStorage.setItem('u', data.account)
    },
    changeCurrentMenu (state, data) {
      state.menuPath = data
      sessionStorage.setItem('menu-path', JSON.stringify(data))
    },
    getMenuList (state, data) {
      state.menuList = data
      sessionStorage.setItem('menu-list', JSON.stringify(data))
    }
  },
  actions: {
    login ({commit, state}, loginInfo) {
      commit('login', loginInfo)
    },
    changeCurrentMenu ({commit, state}, menuPath) {
      commit('changeCurrentMenu', menuPath)
    },
    getMenuList ({commit, state}, menuList) {
      commit('getMenuList', menuList)
    }
  }
})

export default store
