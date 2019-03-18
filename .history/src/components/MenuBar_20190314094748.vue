<template>
  <a-menu mode="horizontal">
    <a-menu-item>信息详情</a-menu-item>
    <a-sub-menu title="图表">
      <span slot="title">图表</span>
      <a-menu-item>趋势图</a-menu-item>
      <a-menu-item>分布图</a-menu-item>
    </a-sub-menu>
  </a-menu>
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
