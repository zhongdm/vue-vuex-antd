<template>
  <div class="form-container" @keyup="keyPress">
    <h1 class="title">智慧党建平台</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      id="loginForm">
      <el-form-item prop="username">
        <el-input
          placeholder="userName"
          v-model="ruleForm.username"
          class="usrname"
          @focus="isFocus = true"
          @blur="isFocus = false">
          <i slot="prefix" class="el-icon-user-solid"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="password"
          auto-complete="off"
          v-model="ruleForm.password"
          @focus="isFocus = true"
          @blur="isFocus = false">
          <i slot="prefix" class="el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="imgCode">
        <el-container>
          <el-main style="padding:0;margin-right:15px">
            <el-input
              placeholder="验证码"
              v-model="ruleForm.imgCode"
              @focus="isFocus = true"
              @blur="isFocus = false">
            </el-input>
          </el-main>
          <el-aside width="120px">
            <ImgVerify title="再刷一次" @imgCode="imgCode" style="height:40px" ref="imgVerify"/>
          </el-aside>
        </el-container>
        <!--</el-row> -->
      </el-form-item>
      <!-- <el-form-item>
        <el-checkbox :checked="isRemember" @change="toggleRemember" class="username-remember">
          记住我
        </el-checkbox>
        <a href="" class="login-password-forgot">忘记密码</a>
      </el-form-item> -->
      <el-form-item>
        <el-button class="btn-block" :loading="loading" type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
import {login,loginA} from '@/api/'
import {encrypt} from '@/common/jsencrypt'

export default {
  data () {
    let validatorCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else if (value.toLowerCase() !== this.originImgCode.toLowerCase()) {
        callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: 'admin',
        password: '111111',
        imgCode: ''
      },
      isFocus: false,
      isRemember: true,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ],
        imgCode: [
          { required: true, validator: validatorCode, trigger: 'blur'}
        ]
      },
      originImgCode: '',
      loading: false
    }
  },
  mounted () {
  },
  methods: {
    handleLogin () {
      // 验证
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          login({
            account: this.ruleForm.username,
            password: this.ruleForm.password
          }).then(res => {
            this.loading = false
            if (res.code === 200) {
              this.$store.dispatch('login', {
                account: encrypt(this.ruleForm.username),
                password: this.ruleForm.password
              })
              sessionStorage.setItem('userPermission', JSON.stringify(res.data.permissionList))
              this.$router.push('/')
              this.$message.success('登陆成功')
            } else {
              this.handleClick()
              this.$message.error(res.message)
            }
          }).catch(err => {
            this.loading = true
            this.$message.error('登陆失败')
          })
        } else {
          return false
        }
      });
    },
    toggleRemember () {
      this.isRemember = !this.isRemember
    },
    imgCode (code) {
      this.originImgCode = code
      console.log(code)
    },
    handleClick () {
      this.$refs.imgVerify.draw()
    },
    keyPress (e) {
      if (e.keyCode === 13 && this.isFocus) {
        // this.loading = true
        this.handleLogin()
      } else {
        return false
      }
    }
  },
  components: {
    ImgVerify: () => import('@/components/ValidationCode'),
  }
}
</script>

<style lang="stylus" scoped>
  .form-container
    position fixed
    top 50%
    left 50%
    width 300px
    height 320px
    border 1px solid #d5d5d5
    margin 0 auto
    padding 20px 40px
    margin-left -190px
    margin-top -200px
    .title 
      text-align center
      padding-bottom 20px
    // .username-remember
    //   float left
    // .login-password-forgot
    //   float right
.btn-block 
  width 100%
  display block
  margin 10px auto

.imgCMDCode
  height 35px
  &>>> canvas
    height 35px
</style>
