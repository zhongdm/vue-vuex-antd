<template>
  <div>
    <input type="number" id="first" v-model="nums" placeholder="数字"/>
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
      nums: 0,
      res: 0,
      worker: null
    }
  },
  mounted() {
    let first = document.getElementById('first')
    first.addEventListener('change', (e) => {
      let val = e.target.value
      this.handlerWoker([val, val])
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
        this.worker.port.start() // 这句很重要，启动worker的监听，否则onconnet无法接收数据

        console.log('worker 启动成功')
        if (this.nums) {
          this.handlerWoker([this.nums, this.nums])
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
          console.log(event.data)
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

