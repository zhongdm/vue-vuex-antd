<template>
  <div class="menu-bar">
    <a-menu>
      <a-menu-item>信息详情</a-menu-item>
      <a-sub-menu>
        <span slot="title">图表</span>
        <a-menu-item>趋势图</a-menu-item>
        <a-menu-item>分布图</a-menu-item>
      </a-sub-menu>
       <a-sub-menu key="sub4">
      <span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
      <a-menu-item key="11">Option 11</a-menu-item>
      <a-menu-item key="12">Option 12</a-menu-item>
    </a-sub-menu>

  <a-sub-menu key="sub2">
      <span slot="title"><a-icon type="setting" /><span>Navigation Four</span></span>
      <a-menu-item key="7">Option 7</a-menu-item>
      <a-menu-item key="8">Option 8</a-menu-item>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
    </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'menu-bar',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu-bar
  // float left
  background-color red
</style>

