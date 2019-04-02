let TestPlugin = {}
TestPlugin.install = function (Vue, options) {
  // 添加全局方法
  Vue.istest = function () {
    console.log('plugin test success')
  }
  // 添加实例方法
  Vue.prototype.logining = function () {
    console.log('loging')
  }
}

export default TestPlugin
