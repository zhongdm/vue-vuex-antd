<template>
  <div >
    <div class="nav-container">
      <a-button @click="hangleLogout" ghost>退出</a-button>
    </div>
    <!-- <a-row :gutter="16"> -->
      <!-- <a-col :xs="4" :sm="8" :md="8" :lg="8" :xl="6"> -->
        <menu-bar></menu-bar>
      <!-- </a-col> -->
      <!-- <a-col :xs="20" :sm="16" :md="16" :lg="16" :xl="18"> -->
        <div class="main-container">
        <router-view/>
        </div>
      <!-- </a-col> -->
    <!-- </a-row> -->
  </div>
</template>

<script>
import {decrypt} from '@/utils/jsencrypt'

export default {
  data () {
    return {
    }
  },
  mounted () {
    console.log('main, ', decrypt(sessionStorage.getItem('u')))
    if (!!decrypt(sessionStorage.getItem('u'))) {
      this.$store.dispatch('login', {username: sessionStorage.getItem('u')})
    }
  },
  components: {
    MenuBar: () => import('@/components/MenuBar')
  },
  methods: {
    hangleLogout () {
      // 清空缓存信息
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-container
  height 60px
  line-height 60px
  background #000
  width 100%
.main-container {
  margin-left: 200px;
  padding-left: 10px;
}
@media screen and (max-width: 1000px) {
  .main-container {
    overflow-x: scroll;
  }
}
</style>
