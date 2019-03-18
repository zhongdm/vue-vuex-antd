<template>
  <div>
    Login
    <button @click="handleLogin">登&nbsp;录</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    handleLogin () {
      this.$router.push('/Home')
    }
  }
}
</script>
