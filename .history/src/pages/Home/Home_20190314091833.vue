<template>
  <div>
    <menu-bar></menu-bar>
    Home
    <button>登&nbsp;录</button>
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
