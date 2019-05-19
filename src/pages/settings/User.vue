<template>
  <div>
    <!-- <h2>用户管理</h2> -->
    <!-- <div> -->
      <el-row>
        <el-col :span="20">
          <el-form
            :inline="true"
            :model="searchForm"
            ref="searchForm"
            label-width="50px"
            @submit.native.prevent
            class="demo-ruleForm">
            <el-form-item
              prop="account">
              <el-input type="text" clearable placeholder="账号" @keyup.enter.native="handleSearch" v-model="searchForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              prop="name">
              <el-input type="text" clearable placeholder="用户名" @keyup.enter.native="handleSearch" v-model="searchForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              prop="phone">
              <el-input type="text" clearable placeholder="手机号码" @keyup.enter.native="handleSearch" v-model="searchForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch" icon="el-icon-search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <el-button type="primary" @click="addUser" icon="el-icon-plus">新增</el-button>
        </el-col>
      </el-row>
    <!-- </div> -->
    <div class="table-container">
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        label="账号">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户名">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column
        label="手机号码">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column
        label="角色">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper" v-for="(item, index) in scope.row.roleNames" :key="index">
            <el-tag size="medium">{{ item }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          {{ !scope.row.locked ? '有效' : '无效'}}
          <el-switch
            v-model="scope.row.locked"
            :active-value="false"
            :inactive-value="true"
            @change="statusChange($event, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-setting"
            @click="handleRoles(scope.$index, scope.row)">配置角色</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleResetPassword(scope.$index, scope.row)">密码重置</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div class="table-pagination">
      <el-pagination
        background
        layout="sizes,prev, pager, next, total"
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.totalSize"
        @size-change="sizeChange"
        @current-change="currentChange"
        @prev-click="prevClick"
        @next-click="nextClick">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <div slot="title" style="font-weight:bold">{{isAddOrEdit === 0 ? '新增用户' : '修改用户信息'}}</div>
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
        <el-form-item label="头像" prop="imgUrl">
          <el-upload
            class="avatar-uploader"
            action="/cms/api/imgServer"
            :show-file-list="false"
            :on-change="onchange"
            :auto-upload="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="usersForm.imageUrl" :src="usersForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="角色" prop="role">
          <el-select v-model="usersForm.role" multiple placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="状态" prop="isActive">
          <el-switch
            v-model="usersForm.isActive"
            active-text="有效"
            inactive-text="无效">
          </el-switch>
        </el-form-item> -->
      </el-form>
      <div slot="footer">
        <el-button type="primary" :loading="loading" @click="saveUser">保存</el-button>
        <el-button @click="resetUser">取消</el-button>
      </div>
    </el-dialog>

    <!-- 配置用户角色 -->
    <el-dialog :visible.sync="settingRoleVisible" @close="resetRoles">
      <div slot="title" style="font-weight:bold">配置用户角色</div>
      <div class="wrapper-tree">
        <el-tree
          :data="settingForm.roleList"
          show-checkbox
          ref="settingTree"
          default-expand-all
          :default-checked-keys="defaultCheckedKeys"
          :props="defaultProps"
          node-key="id">
          <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.value }}</span>
            <span>
            </span>
          </span> -->
        </el-tree>
      </div>
      <div class="btn-group">
        <el-button type="primary" @click="saveRoles">确定</el-button>
        <el-button @click="resetRoles">取消</el-button>
      </div>
    </el-dialog>
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
      settingRoleVisible: false,
      defaultProps: {
        label: 'roleName'
      },
      defaultCheckedKeys: [],
      searchForm: {
        name: '',
        account: '',
        phone: ''
      },
      pageInfo: {
        totalSize: 0,
        pageNum: 1,
        pageSize: 10,
      },
      isAddOrEdit: -1, // 0 -- 新增， 1 -- 编辑
      permissionList: JSON.parse(sessionStorage.getItem('userPermission'))
    }
  },
  mounted () {
    this.getUsersList()
  },
  methods: {
    getUsersList (params = {}) {
      let para = {
        account: this.searchForm.account,
        userName: this.searchForm.name,
        phone: this.searchForm.phone,
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      this.tableLoading = true
      getUsersList(para)
        .then (res => {
          this.tableLoading = false
          if (res.code === 200) {
            let data = res.data
            this.tableData = data.list
            this.pageInfo = {
              totalSize: data.total,
              pageNum: data.pageNum,
              pageSize: data.pageSize,
            }
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          this.tableLoading = false
          this.$message.error('请求失败')
        })
    },
    handleEdit(index, row) {
      this.isAddOrEdit = 1
      this.dialogVisible = true
      this.usersForm = Object.assign({}, this.usersForm, row)
      // this.getRoleList()
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row.id)
          .then(res => {
            if (res.code === 200) {
              this.$message.error('删除成功')
            } else {
              this.$message.error('删除失败')
            }
          })
          .catch(err => {
            this.$message.error('删除失败')
          })
      }).catch(() => {
        this.$message.error('已取消删除')
      })
    },
    handleResetPassword (index, row) {
      this.$confirm('确认重置密码吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetPwd(row.id)
          .then(res => {
            if (res.code === 200) {
              this.$message.error('重置成功')
            } else {
              this.$message.error('重置失败')
            }
          })
          .catch(err => {
            this.$message.error('重置失败')
          })
      }).catch(() => {
        this.$message.error('已取消重置')
      })
    },
    async handleRoles (index, row) {
      // 获取所有列表
      await this.getRoleAll()
      // 获取当前用户拥有的角色
      await this.getRoleByUserId(row.id)

      this.settingForm.userId = row.id
      this.settingRoleVisible = true
    },
    getRoleAll (params = {}) {
      getRoleAll(params)
        .then(res => {
          if (res.code === 200) {
            this.settingForm.roleList = res.data
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          this.$message.error('获取角色数据失败')
        })
    },
    getRoleByUserId (params = {}) {
      getRoleByUserId(params)
        .then(res => {
          if (res.code === 200) {
            if (res.data.length > 0) {
              this.defaultCheckedKeys = res.data.map(item => {
                return item.roleId
              })
            }
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          this.$message.error('获取角色数据失败')
        })
    },
    addUser () {
      // this.getRoleList()
      this.dialogVisible = true
      this.isAddOrEdit = 0
      this.usersForm = {
        id: '',
        userName: '',
        accout: '',
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
    saveRoles () {
      let keys = this.$refs.settingTree.getCheckedKeys()
      if (keys.length > 0) {
        let params = {
          id: this.settingForm.userId,
          list: keys
        }
        updateRoleByUserId(params)
          .then(res => {
            if (res.code === 200) {
              this.$refs.settingTree.setCheckedKeys([])
              this.getUsersList()
              this.$message.success('保存成功')
            } else {
              this.$message.error(res.message)
            }
          })
          .catch(err => {
            this.$message.error('保存失败')
          })
        this.settingRoleVisible = false
      } else {
        this.$message.error('请选择配置资源')
      }
    },
    resetRoles () {
      this.$refs.settingTree.setCheckedKeys([])
      this.settingRoleVisible = false
    },
    handleAvatarSuccess(res, file) {
      this.usersForm.imgUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file, fileList) {
      let _this = this;
      let event = this.event || window.event;
      if (event.target.files) {
        file = event.target.files[0];
      let reader = new FileReader();
      //转base64
      reader.onload = function (e) {
          _this.imageUrl = e.target.result //将图片路径赋值给src
          // _this.$refs.imageUrl=e.target.result//获取pho的src
      }
      reader.readAsDataURL(file);
      }
      
    },
    statusChange (curValue, row) {
      changeStatus ({
        action: curValue ? 'lock' : 'unlock',
        id: row.id
      })
        .then(res => {
          if (res.code === 200) {

            this.$message.success('状态改变成功')
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          this.$message.error('请求失败')
        })
    },
    handleSearch () {
      let params = {
        name: this.searchForm.name,
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageSize
      }
      this.getUsersList(params)
    },
    sizeChange (pageSize) {
      this.pageInfo.pageSize = pageSize
      let params = {
        name: this.searchForm.name,
        pageNum: this.pageInfo.pageNum,
        pageSize: pageSize
      }
      this.getUsersList(params)
    },
    currentChange (curPage) {
      this.pageInfo.pageNum = curPage
      let params = {
        name: this.searchForm.name,
        pageNum: curPage,
        pageSize: this.pageInfo.pageSize
      }
      this.getUsersList(params)
    },
    prevClick (curPage) {
      this.pageInfo.pageNum = curPage
      let params = {
        name: this.searchForm.name,
        pageNum: curPage,
        pageSize: this.pageInfo.pageSize
      }
      this.getUsersList(params)
    },
    nextClick (curPage) {
      this.pageInfo.pageNum = curPage
      let params = {
        name: this.searchForm.name,
        pageNum: curPage,
        pageSize: this.pageInfo.pageSize
      }
      this.getUsersList(params)
    }
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
