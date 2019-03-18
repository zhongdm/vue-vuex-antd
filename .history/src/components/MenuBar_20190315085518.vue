<template>
  <!-- <a-menu
    mode="inline"
    class="menu-bar"
    theme="dark"
    :defaultSelectedKeys="['1']"
    :defaultOpenKeys="['o1']"
    :selectedKeys="[activeMenu]"
    @click="handleMenu">
    <a-menu-item key="1">信息详情</a-menu-item>
    <a-sub-menu key="o1">
      <span slot="title">图表</span>
      <a-menu-item key="2">趋势图</a-menu-item>
      <a-menu-item key="3">分布图</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="4">配置中心</a-menu-item>
  </a-menu> -->
  <div>
  <a-menu
    mode="inline"
    class="menu-bar"
    theme="dark"
    :defaultSelectedKeys="['1']"
    :defaultOpenKeys="['2']"
    :selectedKeys="[activeMenu]"
    @click="handleMenu">
    <template v-for="item in menuList">
      <a-sub-menu :title="item.value" :key="item.key" v-if="item.children">
        <template v-for="subItem in item.children">
          <a-menu-item :key="subItem.key" :data-path="subItem.link">{{subItem.value}}</a-menu-item>
        </template>
    </a-sub-menu>
    <a-menu-item v-else :key="item.key" :data-path="item.link">{{item.value}}</a-menu-item>
    </template>
  </a-menu>
  </div>
</template>

<script>
export default {
  name: 'menu-bar',
  data () {
    return {
      activeMenu: '1'
    }
  },
  computed: {
    menuList () {
      return [
        {
          key: '1',
          value: '信息详情',
          selected: true,
          link: '/info'
        },
        {
          key: '2',
          value: '图表',
          open: false,
          children: [
            {
              key: '2-1',
              value: '趋势图'
            },
            {
              key: '2-2',
              value: '分布图'
            }
          ]
        },
        {
          key: '3',
          value: '配置中心',
          children: [
            {
              key: '3-1',
              value: '用户',
              link: '/settings/user',
            },
            {
              key: '3-2',
              value: '角色',
              link: '/settings/role',
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleMenu (e) {
      this.activeMenu = e.key
      this.$router.push(e.domEvent.target.dataset.path)
      console.log('selected', e.domEvent.target.dataset.path)
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu-bar
  border 1px solid #ddd
  width 200px
  float left
</style>
