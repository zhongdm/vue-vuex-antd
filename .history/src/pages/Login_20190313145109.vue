<template>
  <div>login
    <a-form>
      <a-form-item>
        <a-input
          placeholder="userName">
          <a-icon slot="prefix" type="user"></a-icon>
        </a-input>
        <a-input>

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
