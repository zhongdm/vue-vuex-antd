<template>
  <div class="form-container">
    <img src="@/assets/images/plum.jpg">
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
        <a-checkbox :checked="isRemember" @change="toggleRemember" class="username-remember">
          记住我
        </a-checkbox>
        <a href="" class="login-password-forgot">忘记密码</a>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" block @click="handleLogin">登录</a-button>
      </a-form-item>
    </a-form>
    <ImgVerify @imgCode="imgCode" ref="imgVerify"/>
    <CustomVal />
  </div>
</template>

<script>
import axios from 'axios'
import {encrypt, decrypt} from '@/utils/jsencrypt'

export default {
  data () {
    return {
      isRemember: true
    }
  },
  mounted () {
  },
  methods: {
    async handleLogin () {
      this.$store.dispatch('login', {username: encrypt('miyazhong')})
      // let jse = new this.$jsEncrypt()
      // console.log(new this.$jsEncrypt())
      // await axios.get('/static/rsa_1024_pub.pem').then(res => {
      //   jse.setPublicKey(res.data)
      // }).catch(err => {
      //   console.log('error: ', err)
      // })
      // let encrypted = jse.encrypt('miyazhong')
      // console.log('jiami', encrypted)
      // await axios.get('/static/rsa_1024_priv.pem').then(res => {
      //   jse.setPrivateKey(res.data)
      // }).catch(err => {
      //   console.log('error: ', err)
      // })
      // let decrypted = jse.decrypt(encrypted)
      // console.log('jiemi', decrypted)
      sessionStorage.setItem('k', encrypted)
      this.$router.push('/')
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
