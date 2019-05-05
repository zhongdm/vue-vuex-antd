<template>
  <div>
    <h1>聊天室</h1>
    <div class="chat-container">
      <div class="room-first">
        <h2>在线聊天室1</h2>
        <div class="content">
          <div id="messages">{{messages}}</div>
        </div>
        <textarea placeholder="请输入聊天内容" ref="input" @keydown="keyPress" v-model="value1" name="" id="cr1" cols="30" rows="10"></textarea>
        <button @click="commitRoomOne">提交</button>
      </div>

      <div class="room-another">
        <h2>在线聊天室2</h2>
        <div class="content">

        </div>
        <textarea placeholder="请输入聊天内容" name="" id="cr2" cols="30" rows="10"></textarea>
        <button @click="commitRoomTwo">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as io from 'socket.io-client'
export default {
  data () {
    return {
      socket: null,
      value1: '',
      value2: '',
      messages: ''
    }
  },
  created () {
    this.socket = io.connect('http://localhost:3000')
  },
  mounted () {
    let socket = this.socket

    socket.on('user joined', (data) => {

    })

    socket.on('new message', (data) => {
      this.messages += data.message
    })
  },
  methods: {
    commitRoomOne () {
      this.socket.emit('new message', this.value1)
    },
    keyPress (event) {
      if (event.keyCode === 13) {
        event.prevent
        this.value1 = ''
        this.commitRoomOne()
        
      }
    },
    commitRoomTwo () {

    },
    emitData () {
    }
  }
}
</script>

<style>
  .chat-container {
    display: flex;
  }
  .room-first, .room-another {
    display: inline-block;
    border: 1px solid red;
    flex: 1;
    height: 500px;
    margin-right: 20px;
  }
</style>