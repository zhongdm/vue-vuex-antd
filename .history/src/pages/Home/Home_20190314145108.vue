<template>
  <div>
    <menu-bar></menu-bar>
    <router-view/>
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
