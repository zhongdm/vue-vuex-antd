<template>
  <div>
    <h2>配置中心</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  components: {
    MenuBar: () => import('@/components/MenuBar')
  }
}
</script>
