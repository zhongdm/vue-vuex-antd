const express = require('express')
const http = require('http')
const path = require('path')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
// app.get('/', (req, res) => {

// })
// app.use(express.static(path.join(__dirname, 'src/pages/chatroom')))

server.listen(port, () => {
  console.log('server is running at port %d', port)
})
io.on('connection', (socket) => {
  // socket.emit('user', {name: 'jackie'})
  console.log('连接成功')
  socket.on('new message', (data) => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    })
  })

  socket.on('add user', (username) => {
    // TODO:重复添加

    socket.username = username

    // scoket.on('login', {

    // })

    socket.broadcast.emit('user joined', {
      username: socket.username,
    })
  })
})