<template>
  <div>
    <el-container>
      <el-header>
        <div class="nav-container">
          <div class="medium-container">
          <!-- <h2>智慧党建平台</h2> -->
          <el-button @click="isCollapse= !isCollapse" plain class="ghost-icon-btn collapse-item">
            <i :class="!isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </el-button>
          </div>
          <div class="mini-container">
             <el-button @click="toggleMenuBar" plain class="ghost-icon-btn">
              <i class='icon-m-menu'></i>
            </el-button>
          </div>
          <el-dropdown trigger="click" style="float:right" @command="handleCommand">
            <span class="el-dropdown-link">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">修改信息</el-dropdown-item>
              <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="wrapper">
        <el-aside :class="{'wrapper-container': true, 'menu-collapse': isCollapse, 'hideMenu': true}">
          <menu-bar :menuList="menuList" class="menu-container" :isCollapse="isCollapse" @floatHidden="floatHidden"></menu-bar>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

     <el-dialog :visible.sync="isVisible">
      <div slot="title" style="font-weight:bold">修改密码</div>
      <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-width="80px">
        <el-form-item label="原始密码" prop="originPassword">
          <el-input type="password" v-model="passwordForm.originPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="confirmPasswordOnce">
          <el-input type="password" v-model="passwordForm.confirmPasswordOnce"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPasswordTwice">
          <el-input type="password" v-model="passwordForm.confirmPasswordTwice"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="confirmChangePassword">确认</el-button>
        <el-button @click="cancelChangePassword">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {decrypt} from '@/common/jsencrypt'
import { getMenuList, changePassword } from '@/api/'

export default {
  data () {
    const validatorConfirmPassword = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.passwordForm.confirmPasswordTwice !== '') {
          this.$refs.passwordForm.validateField('confirmPasswordTwice')
        }
        callback()
      }
    }

    const validatorAgainstPassword = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.passwordForm.confirmPasswordOnce) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }

    return {
      isCollapse: false,
      isVisible: false,
      menuList: [],
      passwordForm: {
        id: '',
        originPassword: '',
        confirmPasswordOnce: '',
        confirmPasswordTwice: ''
      },
      passwordRules: {
        originPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur'}
        ],
        confirmPasswordOnce: [
          { required: true, validator: validatorConfirmPassword, trigger: 'blur'}
        ],
        confirmPasswordTwice: [
          { required: true, validator: validatorAgainstPassword, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    ...mapState({
      username: state => decrypt(state.username)
    })
  },
  async created () {
     await getMenuList({}).then(res => {
        if (res.code === 200) {
          this.menuList = res.data
        } else {
          this.$message.error(res.message)
        }
      })
      .catch(err => {
        this.$message.error('获取菜单列表失败')
      })
      // TODO:
    // let permissionList = sessionStorage.getItem('userPermission')

    // let validMenus = []
    // this.menuList.forEach((item, index) => {
    //   if (permissionList.indexOf(item.value + ':list') !== -1) {
    //     validMenus.push(item)
    //   }
    // })
    // this.menuList = validMenus
    this.$store.dispatch('getMenuList', this.menuList)
  },
  components: {
    MenuBar: () => import('@/components/MenuBar')
  },
  methods: {
    floatHidden () {
      this.toggleMenuBar()
    },
    hangleLogout () {
      // 清空缓存信息
      sessionStorage.clear()
      this.$router.push('/login')
    },
    handlePwd () {
      this.isVisible = true
    },
    confirmChangePassword () {
      this.$refs['passwordForm'].validate(valid => {
        if (valid) {
          // TODO:
          let params = {
            account: this.username,
            newPassword: this.passwordForm.confirmPasswordOnce,
            oldPassword: this.passwordForm.originPassword
          }
          changePassword(params)
            .then(res => {
              if (res.code === 200) {
                this.$refs['passwordForm'].resetFields()
                this.isVisible = false
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(err => {
              this.$message.error('获取菜单列表失败')
            })
        }
      })
    },
    cancelChangePassword () {
      this.$refs['passwordForm'].resetFields()
      this.isVisible = false
    },
    handleUserInfo () {

    },
    updateInfo () {

    },
    handleCommand (command) {
      switch(command) {
        case 'pwd': 
          this.handlePwd()
          break
        case 'logout':
          this.hangleLogout()
          break
        case 'info':
          this.handleUserInfo()
          break
        default: 
          break
      }
    },
    toggleMenuBar () {
      let className = document.getElementsByClassName('wrapper-container')[0].className
      if (className.replace(/\s+/g, '&').split('&').indexOf('hideMenu') !== -1) {
        
        className = className.replace(/\s+hideMenu/g, '')
      } else {
        className += ' hideMenu'
      }
      document.getElementsByClassName('wrapper-container')[0].className = className
    }
  }
}
</script>

<style>
.el-header {
  padding: 0
}
</style>
<style lang="stylus" scoped>
.nav-container
  position relative
  height 50px
  line-height 50px
  width 100%
  box-shadow 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1)
  h2
    display inline-block
  .ghost-icon-btn
    height inherit
    border none
    background inherit
    &:hover
      background #f9f9f9
  .collapse-item
    position absolute
    left 200px
    font-size 140%
.wrapper
  margin-top -9px
  height calc(100vh - 51px)
  .wrapper-container.menu-collapse
    width auto !important
    box-shadow 5px 0 10px -5px #7b7a7a
  .wrapper-container:not(.menu-collapse) {
    width 200px !important
    height inherit
    background #fff
    box-shadow 5px 0 10px -5px #7b7a7a
  }
.el-dropdown-link
  cursor pointer
  margin-rignt 10px
  height 50px
  line-height 50px
  display inline-block
  padding 0 5px
  &:hover
    background-color #f9f9f9
.el-dropdown:hover
  // background-color #f9f9f9
  // cursor pointer

.float-container
  position fixed
  left 0
  
.hideMenu
  // display none
.mini-container
  display none
  height inherit
.medium-container
  display inline-block
  height inherit
@media screen and (max-width: 800px) {
  .mini-container {
    display: inline-block;
  }
  .medium-container {
    display: none;
  }
  .hideMenu {
    display none
  }
  .wrapper-container {
    position: fixed;
    left: 0;
    z-index: 110;
  }
}
</style>
