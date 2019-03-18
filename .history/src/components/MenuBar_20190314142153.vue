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
    v-for="item in menuList"
    :key="item.key"
    :defaultSelectedKeys="['1']"
    :defaultOpenKeys="['o1']"
    :selectedKeys="[activeMenu]"
    @click="handleMenu">
    <template v-if="item.children">
      <a-sub-menu :title="item.value">
        <template v-for="subItem in item.children">{{subItem}}
          <a-menu-item :key="subItem.key">{{subItem.value}}</a-menu-item>
        </template>
    </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="item.key">{{item.value}}</a-menu-item>
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
          selected: true
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
          value: '配置中心'
        }
      ]
    }
  },
  methods: {
    handleMenu (e) {
      this.activeMenu = e.key
      console.log('selected', e)
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu-bar
  // float left
  border 1px solid #ddd
  width 256px
</style>
