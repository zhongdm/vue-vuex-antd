<template>
  <a-menu
    mode="inline" 
    class="menu-bar"
    theme="dark"
    :defaultSelectedKeys="['1']"
    :defaultOpenKeys="['o1']"
    :selectedKeys=activeMenu
    @click="handleMenu">
    <a-menu-item key="1">信息详情</a-menu-item>
    <a-sub-menu key="o1">
      <span slot="title">图表</span>
      <a-menu-item key="2">趋势图</a-menu-item>
      <a-menu-item key="3">分布图</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="4">配置中心</a-menu-item>
  </a-menu>
</template>

<script>
export default {
  name: 'menu-bar',
  data () {
    return {
      activeMenu: '1'
    }
  },
  methods: {
    handleMenu () {

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

