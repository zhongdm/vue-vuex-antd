<template>
  <div>
    <a-row :gutter="16">
    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
      <menu-bar></menu-bar>
    </a-col>
    <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
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
