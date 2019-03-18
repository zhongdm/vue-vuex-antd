TestPlugin.install = function (Vue, options) {
  Vue.istest = function() {
    console.log('plugin test success')
  }
}

export default TestPlugin