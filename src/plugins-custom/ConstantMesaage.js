let ConstantMesaage = {}
ConstantMesaage.install = function (Vue, options) {
  // 添加全局方法
  Vue.getList1= function () {
    return [
      {name: 'el-icon-platform-eleme'},
      {name: 'el-icon-plus'}
    ]
  }
  // 添加实例方法
  Vue.prototype.$getList = function () {
    return [
      {name: 'el-icon-platform-eleme'},
      {name: 'el-icon-plus'}
    ]
  }
}

export default ConstantMesaage
