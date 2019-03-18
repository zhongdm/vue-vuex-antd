<template>
  <div>
    <a-row :gutter="16">
      <a-col :xs="4" :sm="8" :md="4" :lg="4" :xl="6">
        <menu-bar></menu-bar>
      </a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="20" :xl="18">
        <router-view/>
      </a-col>
    </a-row>
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
