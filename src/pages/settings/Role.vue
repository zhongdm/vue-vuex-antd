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
              prop="name">
              <el-input type="text" placeholder="名称" clearable @keyup.enter.native="handleSearch" v-model="searchForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch" icon="el-icon-search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <el-button type="primary" @click="addRole" icon="el-icon-plus">新增</el-button>
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
          label="名称">
          <template slot-scope="scope">
            {{ scope.row.roleName }}
          </template>
        </el-table-column>
        <el-table-column
          label="英文名">
          <template slot-scope="scope">
            {{ scope.row.enName }}
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.isActive ? '有效' : '失效'}}
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
              @click="handleMenus(scope.$index, scope.row)">权限</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <div slot="title" style="font-weight:bold">{{ isAddOrEdit === 0 ? '新增角色' : '修改角色信息' }}</div>
      <el-form @submit.native.prevent ref="roleForm" :model="roleForm" :rules="roleRule" label-width="80px">
        <el-form-item label="名称" prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="英文名" prop="enName">
          <el-input v-model="roleForm.enName"></el-input>
        </el-form-item>
        <el-form-item label="是否生效" prop="isActive">
          <el-switch
            v-model="roleForm.isActive"
            active-text="有效"
            inactive-text="无效">
          </el-switch>
        </el-form-item> -->
      </el-form>
      <div slot="footer">
        <el-button type="primary" :loading="loading" @click="saveRole">保存</el-button>
        <el-button @click="resetRole">取消</el-button>
      </div>
    </el-dialog>

    <!-- 配置用户权限 -->
    <el-dialog :visible.sync="settingMenuVisible" width="700px" @close="resetMenu">
      <div slot="title" style="font-weight:bold">配置用户权限</div>
      <div class="wrapper-tree">
        <!-- <el-form
          ref="authForm"
          :model="authForm"
          label-width="80px">
          <el-form-item label="角色">
            <el-input v-model="authForm.name"></el-input>
          </el-form-item>
          <el-form-item label="菜单权限">
            <div v-for="(item, index) in authForm.auth" :key="index">
              <el-checkbox-button style="width: 120px"
                :indeterminate="item.permission.length > 0 && item.permission.length < Object.keys(operations).length"
                v-model="item.checkAll"
                :class="{'is-part-checked':item.permission.length > 0 && item.permission.length < Object.keys(operations).length}"
                @change="handleCheckAllChange(index, $event)">{{item.menuName}}</el-checkbox-button>
              <el-checkbox-group v-model="item.permission" @change="handleCheckedCitiesChange(index, $event)" style="display:inline-block;">
                <el-checkbox v-for="(op, key) in operations" :label="key" :key="op">{{op}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
           <el-form-item>
           </el-form-item>
        </el-form> -->

        <el-tree
          :data="settingsForm.menuList"
          show-checkbox
          ref="settingTree"
          default-expand-all
          :default-checked-keys="defaultCheckedKeys"
          :props="defaultProps"
          node-key="id"
          @check-change="treeCheckChange"
          @check="treeChecked">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
              <i :class="data.iconcls"></i>
              <span>{{data.menuName}}</span>
            </span>

            <template v-if="data.authList && data.authList.length > 0">
            <el-checkbox-group
              v-model="data.checkedAll"
              @change="handleCheckedAuthChange($event, data.id)">
              <el-checkbox
                v-for="(item , index) in data.authList"
                :label="item.id"
                :key="index">
                {{item.menuName}}
              </el-checkbox>
            </el-checkbox-group>
            </template>
          </span>
        </el-tree>
      </div>

      <div class="dialog-footer" slot="footer">
        <el-button type="primary" :loading="loading" @click="saveMenu">确定</el-button>
        <el-button @click="resetMenu">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRole, editRole, deleteRole, getMenuList, getMenuByRoleId, updateMenuByRoleId} from '@/api/'
const operationOptions = {'list':'列表','add': '新增', 'edit':'编辑', 'delete':'删除'};

import {setPermission, filterData} from '@/common/util'
export default {
  data () {
    return {
      operaOptions: {'list':'列表','add': '新增', 'edit':'编辑', 'delete':'删除'},
      checkAll: false,
      checkedCities: [''],
      operations: operationOptions,
      isIndeterminate: false,
      authForm: {
        name: '',
        auth: [
          {
            id: '1',
            menuName: '信息管理',
            checkAll: false,
            permission: []
          },
          {
            id: '2',
            menuName: '用户设置',
            checkAll: false,
            permission: []
          },
          {
            id: '3',
            menuName: 'aaa',
            checkAll: false,
            permission: []
          },
        ]
      },
      tableData: [],
      tableLoading: false,
      loading: false,
      roleForm: {
        id: '',
        roleName: '',
        roleType: 1,
      },
      settingsForm: {
        menuList: [],
        roleId: ''
      },
      roleRule: {
        roleName: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ]
      },
      dialogVisible: false,
      settingMenuVisible: false,
      defaultProps: {
        children: 'childMenus',
        label: 'menuName'
      },
      defaultCheckedKeys: [],
      searchForm: {
        name: ''
      },
      pageInfo: {
        totalSize: 0,
        pageNum: 1,
        pageSize: 10,
      },
      isAddOrEdit: -1, // 0 -- 新增， 1 -- 编辑 
      authList: []
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    handleCheckedAuthChange(value, menuId) {
      let checkedCount = value.length;
      if (checkedCount > 0) {
        let checkedKeys = this.$refs.settingTree.getCheckedKeys()
        checkedKeys.push(menuId)
        this.$refs.settingTree.setCheckedKeys(checkedKeys);
      } else {
        let checkedKeys = this.$refs.settingTree.getCheckedKeys()
        checkedKeys.splice(checkedKeys.findIndex(item => item === menuId), 1)
        this.$refs.settingTree.setCheckedKeys(checkedKeys);
      }
    },
    getRoleList () {
      let params = {
        keyword: this.searchForm.name,
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      this.tableLoading = true
      getRoleList(params)
        .then(res => {
          this.tableLoading = false
          if (res.code === 200) {
            let data = res.data
            this.tableData = data.list
            this.pageInfo = {
              pageNum: data.pageNum,
              pageSize: data.pageSize,
              totalSize: data.total
            }
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          this.tableLoading = false
          this.$message.error('获取角色列表数据失败')
        })
    },
    handleEdit(index, row) {
      this.isAddOrEdit = 1
      this.dialogVisible = true
      this.roleForm = Object.assign({}, this.roleForm, row)
      // this.getMenuList()
    },
    handleDelete(index, row) {
       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole({id: row.id})
          .then(res => {
            if (res.code === 200) {
              this.getRoleList()
              this.$message.success('删除成功')
            } else {
              this.$message.error('删除失败')
            }
          })
          .catch(err => {
            this.$message.error('删除失败')
          })
      }).catch((err) => {
        // this.$message.error('已取消删除')
      })
    },
    async handleMenus (index, row) {
      const data = await this.getMenuByRoleId(row.id)
      await this.getMenuList()
      
      this.settingsForm.roleId = row.id
      this.settingMenuVisible = true
    },
    getMenuList (params = {}) {
      getMenuList(params)
        .then(res => {
          if (res.code === 200) {

            let data = res.data
            this.$nextTick(() => {
              this.settingsForm.menuList = filterData(data, this.defaultCheckedKeys)
            })
            
            
            // this.settingsForm.menuList = setPermission(res.data)
            // this.settingsForm.menuList = res.data
            // 'sys:user:list'.replace(/((\w+):)+(?=\w+$)/g, '') -> list
          } else {
            this.$message.error('获取菜单数据失败')
          }
        })
        .catch(err => {
          this.$message.error('获取菜单数据失败')
        })
    },
    async getMenuByRoleId (params) {
      await getMenuByRoleId(params)
        .then(res => {
          if (res.code === 200) {
            if (res.data.length > 0) {
              this.defaultCheckedKeys = res.data
            }
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          this.$message.error('获取指定角色的菜单失败')
        })
    },
    treeChecked (data, status) {
      // console.log(data, status)
      let checkedNodes = status.checkedNodes
      checkedNodes.forEach(item => {

      })
    },
    treeCheckChange (data, isChecked, hasCheckedLeaf) {
      // console.log(data, isChecked, hasCheckedLeaf)
    },
    addRole () {
      this.isAddOrEdit = 0
      this.dialogVisible = true
      this.roleForm = {
        id: '',
        roleName: '',
        roleType: 1,
      }
    },
    saveRole () {
      this.$refs['roleForm'].validate(valid => {
        if (valid) {
          this.loading = true
          let func = this.isAddOrEdit === 0
            ? addRole({
            roleName: this.roleForm.roleName,
            roleType: this.roleForm.roleType,
          })
          : editRole({
            id: this.roleForm.id,
            roleName: this.roleForm.roleName,
            roleType: this.roleForm.roleType,
            })
          
          func.then(res => {
            if (res.code === 200) {
              this.loading = false
              this.getRoleList()
              this.dialogVisible = false
              // 保存成功后
              this.$refs['roleForm'].resetFields()
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
    resetRole () {
      this.$refs['roleForm'].resetFields()
      this.dialogVisible = false
    },
    saveMenu() {
      let nodes = this.$refs.settingTree.getCheckedNodes()
      if (nodes.length > 0) {
        this.loading = true
        let mergeNodes = []
        console.log(nodes)
        nodes.forEach(item => {
          mergeNodes.push(item.id)
          if (item.checkedAll.length > 0) {
            mergeNodes = mergeNodes.concat(item.checkedAll)
          }
        })
        let params = {
          roleId: this.settingsForm.roleId,
          list: mergeNodes 
        }
        updateMenuByRoleId(params)
          .then(res => {
            this.loading = false
            if (res.code === 200) {
              this.$refs.settingTree.setCheckedKeys([])
              this.settingMenuVisible = false
              this.$message.success('更新权限成功')
            } else {
              this.$message.error('更新权限失败')
            }
          })
          .catch(err => {
            this.loading = false
            this.$message.error('更新权限失败')
          })
      } else {
        this.$message.error('请选择配置资源')
      }
    },
    resetMenu () {
      this.$refs.settingTree.setCheckedKeys([])
      this.settingMenuVisible = false
    },
    setCheckedNodes() {
      //TODO:
      this.$refs.settingTree.setCheckedNodes(this.menuList);
    },
    handleSearch () {
      this.getRoleList()
    },
    sizeChange (pageSize) {
      this.pageInfo.pageSize = pageSize
      let params = {
        name: this.searchForm.name,
        pageNum: this.pageInfo.pageNum,
        pageSize: pageSize
      }
      this.getRoleList(params)
    },
    currentChange (curPage) {
      this.pageInfo.pageNum = curPage
      let params = {
        name: this.searchForm.name,
        pageNum: curPage,
        pageSize: this.pageInfo.pageSize
      }
      this.getRoleList(params)
    },
    prevClick (curPage) {
      this.pageInfo.pageNum = curPage
      let params = {
        name: this.searchForm.name,
        pageNum: curPage,
        pageSize: this.pageInfo.pageSize
      }
      this.getRoleList(params)
    },
    nextClick (curPage) {
      this.pageInfo.pageNum = curPage
      let params = {
        name: this.searchForm.name,
        pageNum: curPage,
        pageSize: this.pageInfo.pageSize
      }
      this.getRoleList(params)
    }
  }
}
</script>

<style lang="stylus">
.el-checkbox-button:first-child .el-checkbox-button__inner
  border-radius 4px
  overflow hidden
  width 100px
.el-checkbox-button.is-part-checked:first-child .el-checkbox-button__inner
  background-color green
  color #fff
  border-color green
</style>
<style lang="stylus" scoped>
  .wrapper-tree
    border 1px solid #eee
    padding 20px
  .btn-group
    margin-top 20px
    text-align right

  .custom-tree-node 
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
</style>
