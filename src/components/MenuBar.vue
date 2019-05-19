<template>
  <div>
  <el-menu
    :default-active="activeMenu"
    :collapse="isCollapse"
    class="el-menu-vertical-demo"
    :router="true"
    @select="goMenu"
    @click="handleMenu">
    <template v-for="item in menuList">
      <el-submenu :index="item.id" :key="item.id" v-if="item.childMenus.length > 0">
        <template slot="title">
          <i :class="item.iconcls"></i>
          <span>{{item.menuName}}</span>
        </template>
        <template v-for="subItem in item.childMenus">
          <el-menu-item :index="subItem.id" :route="{path: item.request + subItem.request}" :key="subItem.id">
            <i :class="subItem.iconcls"></i>
            <span>{{subItem.menuName}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else :index="item.id" :key="item.id" :route="{path: item.request}">
        <i :class="item.iconcls"></i>
        <span>{{item.menuName}}</span>
      </el-menu-item>
    </template>
  </el-menu>
  </div>
</template>

<script>
import {getCurrentMenu} from '@/common/util.js'
import {getMenuList} from '@/api/'
export default {
  name: 'menu-bar',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    menuList: Array
  },
  data () {
    return {
      activeMenu: sessionStorage.getItem('active-menu') || '1',
      // menuList: []
    }
  },
  computed: {
    menuList111 () {
      return [
        {
          key: '1',
          id: '1',
          value: '信息详情',
          selected: true,
          link: '/info'
        },
        {
          key: '2',
          id: '2',
          value: '信息详情222',
          selected: true,
          isAdmin: false,
          link: '/a'
        },
        {
          key: '3',
          id: '3',
          value: '系统设置',
          link: '/settings',
          children: [
            {
              key: '3-1',
              id: '3-1',
              value: '用户管理',
              link: '/user'
            },
            {
              key: '3-2',
              id: '3-2',
              value: '角色管理',
              link: '/role'
            },
            {
              key: '3-3',
              id: '3-3',
              value: '菜单管理',
              link: '/menu'
            },
            {
              key: '3-4',
              id: '3-4',
              value: '权限管理',
              link: '/auth'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    // this.getMenuList()
  },
  methods: {
    handleMenu (e) {
      this.activeMenu = e.key
      // this.$router.push(e.domEvent.target.dataset.path)
    },
    goMenu(index, indexPath) {
      this.activeMenu = indexPath[indexPath.length - 1]
      sessionStorage.setItem('active-menu', indexPath[indexPath.length - 1])
      let menu = getCurrentMenu(indexPath[indexPath.length - 1], this.menuList)
      this.$store.dispatch('changeCurrentMenu', menu)
      this.$emit('floatHidden')
    },
    async getMenuList () {
      // TODO:
      await getMenuList().then(res => {
        if (res.code ===200) {
          this.menuList = res.data
        }
      })
      this.$store.dispatch('getMenuList', this.menuList)
    }
  }
}
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    /* min-height: 400px; */
  }
</style>
<style scoped>
.menu-bar {
  border: 1px solid #ddd;
  /* width: 200px; */
  /* float: left; */
}
</style>
