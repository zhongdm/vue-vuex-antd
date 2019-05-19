<template>
  <div>
   <el-form ref="usersForm" :model="usersForm" :rules="usersRule" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="usersForm.account"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="usersForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="usersForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="saveUser">保存</el-button>
        <el-button @click="resetUser">取消</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" :loading="loading" @click="saveUser">保存</el-button>
        <el-button @click="resetUser">取消</el-button>
      </div>
    <!-- </el-dialog> -->


  </div>
</template>

<script>
import { getUsersList, addUser, editUser, deleteUser,
        changeStatus, resetPwd, getRoleByUserId, getRoleAll, updateRoleByUserId } from '@/api/'
import { validatePhone } from '@/common/validate/validator.js'

export default {
  data () {
    return {
      tableData: [],
      tableLoading: false,
      loading: false,
      usersForm: {
        id: '',
        userName: '',
        accout: '',
        phone: '',
        imgUrl: '',
        userType: 1,
      },
      settingForm: {
        roleList: [],
        userId: '',
      },
      usersRule: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ],
      },
      dialogVisible: false,
      
      isAddOrEdit: -1, // 0 -- 新增， 1 -- 编辑
      permissionList: JSON.parse(sessionStorage.getItem('userPermission'))
    }
  },
  mounted () {
  },
  methods: {
  
    addUser () {
      // this.getRoleList()
      this.dialogVisible = true
      this.isAddOrEdit = 0
      this.usersForm = {
        id: '',
        userName: '',
        account: '',
        phone: '',
        imgUrl: '',
        userType: 1,
      }
    },
    saveUser () {
      this.$refs['usersForm'].validate(valid => {
        if (valid) {
          this.loading = true
          let func = this.isAddOrEdit === 0
          ? addUser({
              userName: this.usersForm.userName,
              account: this.usersForm.account,
              phone: this.usersForm.phone,
              pwd: '111111',
              userType: this.usersForm.userType,
            })
          : editUser({
              id: this.usersForm.id,
              userName: this.usersForm.userName,
              account: this.usersForm.account,
              phone: this.usersForm.phone
            })

          func.then(res => {
            this.loading = false
            if (res.code === 200) {
              // this.getUsersList()
              this.dialogVisible = false
              // 保存成功后
              this.$refs['usersForm'].resetFields()
              this.$message.success('保存成功')
            } else {
              this.$message.error(res.message)
            }
          })
          .catch(err => {
            this.loading = false
            this.$message.error('保存失败')
          })
          
        }
      })
    },
    resetUser () {
      this.$refs['usersForm'].resetFields()
      this.dialogVisible = false
    },
    
  }
}
</script>

<style lang="stylus" scoped>
  .avatar-uploader
    &>>> .el-upload
      border 1px dashed #d9d9d9
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover
        border-color: #409EFF;
      .avatar-uploader-icon
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
  .avatar
    width: 178px;
    height: 178px;
    display: block;


  .wrapper-tree
    border 1px solid #eee
    padding 20px
  .btn-group
    margin-top 20px
    text-align right

.name-wrapper
  margin-top 5px
  &:first-child
    margin-top 0
</style>
