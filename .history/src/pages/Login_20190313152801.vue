<template>
  <div class="form-container">
    <a-form>
      <a-form-item>
        <a-input
          placeholder="userName">
          <a-icon slot="prefix" type="user"></a-icon>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          placeholder="password">
          <a-icon slot="prefix" type="lock"></a-icon>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox :checked="isRemember" @change="toggleRemember">
          Remember me
        </a-checkbox>
        <a href="">Forget password</a>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleLogin">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isRemember: true
    }
  },
  mounted () {
  },
  methods: {
    handleLogin () {
      this.$router.push('/Home')
    },
    toggleRemember () {
      this.isRemember = !this.isRemember
    }
  }
}
</script>

<style lang="stylus" scoped>
  .form-container 
    width 250px
    margin 0 auto
</style>
