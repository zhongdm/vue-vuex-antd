let TestPlugin = {}
TestPlugin.install = function (Vue, options) {
  Vue.istest = function () {
    console.log('plugin test success')
  }
  Vue.prototype.logining = 
}

export default TestPlugin
