<template>
  <div>
    <input type="number" id="first" v-model="first" placeholder="数字"/>
    <input type="number" id="second" v-model="second" placeholder="数字"/>
    <br/>
    {{result}}
    <hr/>
    <button @click="startWorker">开始worker</button>
  </div>
</template>

<script>
/**
 * 解决fibonacci的数据很大时，页面假死的情况的处理
 * 利用Worker，新辟一个独立于主线程的子线程来进行复杂的处理
 */
export default {
  data() {
    return {
      first: 0,
      second: 0,
      res: 0,
      worker: null
    }
  },
  mounted() {
    let first = document.getElementById('first')
    let second = document.getElementById('second')

    first.addEventListener('change', (e) => {
      let val = e.target.value
      this.handlerWoker([val, this.second])
    })
    second.addEventListener('change', (e) => {
      let val = e.target.value
      this.handlerWoker([this.first, val])
    })
  },
  computed: {
    result: function() {
      return this.res
    }
  },
  methods: {
    startWorker() {
      if (window.SharedWorker) {
        // Worker只能读取网络文件
        this.worker = new SharedWorker('/static/sharedWorker.js')
        this.worker.port.start()
        console.log('worker 启动成功')
        if (this.first || this.second) {
          this.handlerWoker ([this.first, this.second])
        }
      } else {
      console.log('browser do not support workers')
      }
    },
    handlerWoker (val) {
      if (this.worker) {
        // 发送消息给worker后台
        let worker = this.worker.port
        worker.postMessage(val)
        // 接收消息
        worker.onmessage = (event) => {
          let data = event.data
          this.res = data
        }
        // 消息接收失败
        worker.onerror = function(event) {
          console.log(event, event.fileName, event.lineno, event.message)
        }
      } else {
        console.log("worker 没有启动")
      }
    }
  }
}
</script>

<style>

</style>

