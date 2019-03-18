let TestPlugin = {}
TestPlugin.install = function (Vue, options) {
  Vue.istest = function () {
    console.log('plugin test success')
  }
  Vue.prototype.logining = function () {
    console.log('loging')
  }
}

export default TestPlugin
