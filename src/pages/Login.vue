<template>
  <div class="form-container">
    <img src="@/assets/images/plum.jpg">
    <a-form
      :form="form"
      @submit="handleLogin">
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            {rules: [{ required: true, message: 'Please input your username!' }]}
          ]"
          placeholder="userName"
          v-model="username"
          class="usrname">
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
        <a-checkbox :checked="isRemember" @change="toggleRemember" class="username-remember">
          记住我
        </a-checkbox>
        <a href="" class="login-password-forgot">忘记密码</a>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" block>登录</a-button>
      </a-form-item>
    </a-form>
    <ImgVerify @imgCode="imgCode" ref="imgVerify"/>
    <CustomVal />
  </div>
</template>

<script>
// import axios from 'axios'
import {encrypt} from '@/utils/jsencrypt'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      username: '123',
      isRemember: true
    }
  },
  mounted () {
  },
  methods: {
    handleLogin (e) {
      // 验证
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('login', {username: encrypt(values.username)})
          this.$router.push('/')
        }
      });
    },
    toggleRemember () {
      this.isRemember = !this.isRemember
    },
    imgCode (code) {
      console.log(code)
    },
    handleClick () {
      this.$refs.imgVerify.draw()
    }
  },
  components: {
    ImgVerify: () => import('@/components/ValidationCode'),
    CustomVal: () => import('@/components/CustomValidationCode')
  }
}
</script>

<style lang="stylus" scoped>
  .form-container
    width 250px
    margin 0 auto
    .username-remember
      float left
    .login-password-forgot
      float right
</style>
