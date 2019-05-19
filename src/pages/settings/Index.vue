<template>
  <div>
    <el-breadcrumb separator="/">
      <template v-for="(item, index) in menuPath">
        <el-breadcrumb-item :key="index">{{item}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <br/>
    <hr>
    <br/>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Settings',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      menuPath: state => state.menuPath
    })
  },
  mounted () {
  }
}
</script>

<style>
  /* .table-container {
  } */
  .table-pagination {
    margin-top: 20px;
    text-align: right;
  }
</style>
