<template>
  <div>
    <h1>聊天室</h1>
    <div class="chat-container">
      <div class="chat-room">
        <h2>在线聊天室1</h2>
        <p>bug: 刷新后用户usrname丢失</p>
        <p>解决方案：禁止刷新，否则跳转到登陆页面，或者所有数据丢失</p>
        <div class="content">
          <div id="messages"></div>
        </div>
        <div class="control">
          <textarea placeholder="请输入聊天内容" ref="input" @keydown="keyPress" v-model="value1" name="" id="cr1" cols="30" rows="2"></textarea>
          <button @click="commitRoomOne">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {decrypt} from '@/utils/jsencrypt'
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
  computed: {
    msg: () => {
      return this.messages
    },
    ...mapState({
      username: state => state.username
    })
  },
  created () {
    this.socket = io.connect('http://localhost:3000')
  },
  mounted () {
    let socket = this.socket
    if (decrypt(this.username)) {
      socket.emit('add user', this.username)
    }
    
    socket.on('user joined', (data) => {
      let username = decrypt(data.username)
      document.getElementById('messages').innerHTML += '<p class="reminder"><em>'+ username + '</em>加入了聊天室</p>'
    })
    
    socket.on('new message', (data) => {
      this.addChatMessage(data)
    })
  },
  methods: {
    commitRoomOne (e) {
      this.socket.emit('new message', this.value1)
      e.prevent
      this.value1 = ''
    },
    keyPress (event) {
      if (event.keyCode === 13) {
        event.prevent
        this.addChatMessage({
          username: this.username,
          message: this.value1
        }, true)
        this.commitRoomOne(event)
      }
    },
    addChatMessage (data, options) {
      let className = options ? 'right' : ''
      document.getElementById('messages').innerHTML += '<p class="'+className+'">' + decrypt(data.username) + ": " + data.message +'</p>'
    }
  }
}
</script>

<style>
  .chat-container {
    display: flex;
  }
  .chat-room {
    position: relative;
    display: inline-block;
    border: 1px solid #ddd;
    flex: 1;
    height: 500px;
    margin-right: 20px;
    padding: 20px;
    
  }
  .content {
    min-height: 290px;
    overflow-y: scroll;
    padding: 20px;
    border: 1px solid #000;
    box-shadow: 0 0 10px inset gray;
    text-align: left;
  }
  .content .right {
    text-align: right;
    color: green;
  }
  .content .reminder {
    text-align: center;
  }
  .content .reminder em {
    font-weight: bolder;
  }
  .control {
    position: absolute;
    bottom: 10px;
  }
</style>