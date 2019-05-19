<template>
  <div>
    <div>
      <el-button type="primary" @click="addMenu">新增</el-button>
      <el-button type="primary" @click="editMenu">编辑</el-button>
    </div>
    <br/>
    <el-row :gutter="10">
      <el-col :md="8" :lg="6" :xl="2">
        <template v-if="menuList && menuList.length > 0">
          <el-tree
            v-loading="treeLoading"
            :data="menuList"
            ref="tree"
            :highlight-current="true"
            @node-click="nodeClick"
            :props="defaultProps"
            style="margin-bottom: 20px;"
            node-key="id">
            <span class="custom-tree-node" slot-scope="{ node, data }">
            <i :class="data.iconcls"></i>
            <span>{{data.menuName}}</span>
          </span>
          </el-tree>
        </template>
      </el-col>
      <el-col :md="16" :lg="18" :xl="22">
        <el-form ref="menuForm" :model="menuForm" :rules="menuRule" label-width="80px" style="border:1px solid #f5f5f5;padding:30px">
          <el-form-item label="父类" prop="parentId">
            <el-select :disabled="true" v-model="menuForm.parentId" @change="handleParent" placeholder="请选择">
              <el-option
                v-for="item in menuListMap"
                :key="item.id"
                :label="item.menuName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="menuName">
            <el-input v-model="menuForm.menuName"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="menuType">
            <el-radio-group v-model="menuForm.menuType" :disabled="isAddOrEdit===1" >
              <el-radio label="0">按钮</el-radio>
              <el-radio label="1">系统菜单</el-radio>
              <el-radio label="2">业务菜单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="权限标识" prop="permission">
              <el-input v-model="menuForm.permission"></el-input>
            </el-form-item>
          <template v-if="menuForm.menuType !== 0">
            <el-form-item label="路由" prop="request">
              <el-input v-model="menuForm.request"></el-input>
            </el-form-item>
            <el-form-item label="前端组件" prop="component">
              <el-input v-model="menuForm.component"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="iconcls">
              <i :class="menuForm.iconcls"></i>
              <el-button type="text" @click="isIconVisible=true">选择</el-button>
            </el-form-item>
            <el-form-item label="排序" prop="sortNo">
              <el-slider v-model="menuForm.sortNo"></el-slider>
            </el-form-item>
          </template>
          <el-form-item label="是否显示" prop="isShow">
            <el-switch
              v-model="menuForm.isShow">
            </el-switch>
          </el-form-item>
          <el-form-item label=备注 prop="remark">
            <el-input type="textarea" v-model="menuForm.remark"></el-input>
          </el-form-item>
           <el-form-item>
            <template v-if="isAddOrEdit === 1">
              <el-button type="primary" @click="updateMenu" icon="el-icon-edit">修改</el-button>
              <el-button @click="deleteMenu" icon="el-icon-delete">删除</el-button>
             </template>
             <template v-else>
               <el-button type="primary" @click="saveMenu">新建</el-button>
             </template>
           </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="isIconVisible" title="选择图标">
      <div class="icon-container">
        <icons-list @data="getSelectedIcon"></icons-list>
      </div>
      <div style="margin-top: 20px;">
        <!-- <el-button type="primary" @click="handleConfirm">确认</el-button> -->
        <el-button @click="resetIcon">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { deleteMenu, addMenu, editMenu, getMenuList } from '@/api/'

export default {
  data () {
    const limitValidator  = (rule, value, callback) => {
      if (this.menuForm.menuType === '0' && !value) {
        callback(new Error('请选择父类'))
      } else {
        callback()
      }
    }
    return {
      defaultProps: {
        children: 'childMenus',
        label: 'menuName'
      },
      isVisible: false,
      isIconVisible: false,
      treeLoading: false,
      dialogTitle: '',
      menuForm: {
        id: '',
        menuName: '',
        request: '',
        parentId: '',
        isShow: '',
        iconcls: '',
        sortNo: 0,
        component: '',
        remark: '',
        permission: ''
      },
      menuRule: {
        parentId: [
          { validator: limitValidator, trigger: 'blur'}
        ],
        menuName: [
          { required: true, message: '请输入名称', trigger: 'blur'}
        ],
        menuType: [
          { required: true, message: '请选择类型', trigger: 'blur'}
        ],
        permission: [
          { required: true, message: '请输入权限标识', trigger: 'blur'}
        ],
        
      },
      iconList: [],
      iconName: '',
      isAddOrEdit: 1,
      menuList: [],
      menuListMap: []
    }
  },
  components: {
    IconsList: () => import('@/components/IconsList'),
  },
  watch: {
    menuList (val, oldVal) {
      this.menuListMap = this.resortMenuList(this.menuList)
    }
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      this.treeLoading = true
      getMenuList({}).then(res => {
        this.treeLoading = false
        if (res.code === 200) {
          this.menuList = res.data
        } else {
          this.$message.error(res.message)
        }
      })
      .catch(err => {
        this.$message.error('获取菜单列表失败')
      })
    },
    resortMenuList (node) {
      let mergeList = []
      node.forEach(item => {
        mergeList.push(item)
        if (item.childMenus.length > 0) {
          let childList =  this.resortMenuList(item.childMenus)
          mergeList = mergeList.concat(childList)
          return mergeList
        }
      })
      return mergeList
    },
    addMenu () {
      this.isAddOrEdit = 0
      let checkedNodeId = this.$refs.tree.getCurrentKey()
      this.menuForm = {
        id: '',
        menuName: '',
        request: '',
        parentId: checkedNodeId,
        isShow: '',
        iconcls: '',
        sortNo: 0,
        component: '',
        remark: '',
        menuType: ''
      }
    },
    deleteMenu () {
      // 删除当前菜单
       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenu(this.menuForm.id)
          .then(res => {
            if (res.code === 200) {
              this.getMenuList()
              this.$message.success('删除成功')
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
    updateMenu () {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          this.menuForm.parentId = this.menuForm.parentId ? this.menuForm.parentId : 0 
          editMenu(this.menuForm).then(res => {
            if (res.code === 200) {
              this.getMenuList()
              this.$refs['menuForm'].resetFields()
              this.$message.success('修改成功')
            } else {
              this.$message.error(res.message)
            }
          }).catch(err => {
            console.log('error')
            this.$message.error('修改失败')
          })
        }
      })
    },
    nodeClick (data, node, compo) {
      if (this.isAddOrEdit === 1) {
        // 编辑
        this.menuForm = Object.assign({}, this.menuForm, data)
        if (this.menuForm.parentId === '0') {
          this.menuForm.parentId = ''
        }
      } else {
        // 新增
        // this.$refs.menuForm.resetFields()
        this.menuForm.parentId = data.id
      }
      
    },
    addDynamicRoutes () {

    },
    saveMenu () {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          let params = {
          parentId: this.menuForm.parentId,
          menuName: this.menuForm.menuName,
          selected: true,
          request:  this.menuForm.request,
          iconcls: this.menuForm.iconcls
        }
        addMenu(this.menuForm)
          .then(res => {
            if (res.code === 200) {
              this.getMenuList()
              this.$message.success('保存成功')
              this.$refs['menuForm'].resetFields()
              this.isVisible = false
            } else {
              this.$message.error('保存数据失败')
            }
          })
          .catch(err => {
            this.$message.error('保存失败')
          })
        }
      })
    },
    resetMenu () {
      this.$refs['menuForm'].resetFields()
      this.isVisible = false
    },
    editMenu () {
      let checkedNode = this.$refs.tree.getCurrentNode()
      if (checkedNode) {
        this.menuForm = checkedNode
        if (this.menuForm.parentId === '0') {
          this.menuForm.parentId = ''
        }
      } else {
        this.$message.error('请选择菜单')
      }
      
    },
    handleParent (item) {
      console.log(item)
      // this.menuForm.url = item.url
    },
    getSelectedIcon (name) {
      this.menuForm.iconcls = name
      this.isIconVisible = false
    },
    resetIcon () {
      this.iconName = ''
      this.isIconVisible = false
    },
    
  }
}
</script>

<style lang="stylus" scoped>
  .inline-tree
    width 200px
    display inline-block
    vertical-align top
  .menu-wrapper
    display inline-block
    border 1px solid red
  .icon-container
    border 1px solid #ccc
    border-radius 4px
    padding 10px
</style>
