<template>
  <div class="form-container">
    <a-form>
      <a-form-item>
        <a-input
          placeholder="userName">
          <a-icon slot="prefix" type="user"></a-icon>
        </a-input>
        <a-input
          placeholder="password">
          <a-icon slot="prefix" type="lock"></a-icon>
        </a-input>
      </a-form-item>
    </a-form>
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

<style lang="stylus" scoped>
  .form-container 
    width 300px
    margin 0 auto
</style>
