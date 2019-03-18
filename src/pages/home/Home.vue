<template>
  <div>
    <div class="nav-container"></div>
    <!-- <a-row :gutter="16"> -->
      <!-- <a-col :xs="4" :sm="8" :md="8" :lg="8" :xl="6"> -->
        <menu-bar></menu-bar>
      <!-- </a-col> -->
      <!-- <a-col :xs="20" :sm="16" :md="16" :lg="16" :xl="18"> -->
        <router-view/>
      <!-- </a-col> -->
    <!-- </a-row> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    // this.$router.push('/Home')
  },
  components: {
    MenuBar: () => import('@/components/MenuBar')
  }
}
</script>

<style lang="stylus" scoped>
.nav-container
  height 60px
  background #000
  width 100%
</style>
