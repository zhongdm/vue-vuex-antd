<template>
  <div>
    <input id="first" v-model="nums" placeholder="数字"/>
    <br/>
    {{result}}
    <hr/>
    {{counter}}
    <button @click="startWorker">开始worker</button>
    <button @click="terminateWorker">终止worker</button>
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
      counter: 12,
      worker: null
    }
  },
  mounted() {
    // this.handlerWoker(this.nums)
    this.addCounter()
    let first = document.getElementById('first')
    first.addEventListener('change', (e) => {
      let val = e.target.value
      this.handlerWoker(val)
    })
  },
  computed: {
    result: function() {
      return this.res
    }
  },
  methods: {
    addCounter() {
      this.counter += 10
    },
    startWorker() {
      if (window.Worker) {
        // Worker只能读取网络文件
        this.worker = new Worker('/static/worker.js')
        console.log('worker 启动成功')
        if (this.nums) {
          this.handlerWoker (this.nums)
        }
      } else {
      console.log('browser do not support workers')
      }
    },
    handlerWoker (val) {
      if (this.worker) {
        // 发送消息给worker后台
        let worker = this.worker
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
    },
    terminateWorker () {
      this.worker.terminate()
      
    }
  }
}
</script>

<style>

</style>

