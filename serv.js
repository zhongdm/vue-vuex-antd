const express = require('express')
const Vue = require('vue')
const fs = require('fs')

const Renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8')
})

const server = express()
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      name: 'Vue demo',
      url: req.url
    },
    template: '<div>hello from {{name}}, adn url is: {{url}}</div>'
  })

  const context = {
    title: 'SSR demo'
  }

  Renderer.renderToString(app, context, (err, html) => {
    if (err) {
      console.log('errrrrr')
    }

    res.send(html)
  })
})

server.listen(3000, () => {
  console.log('running at localhost:3000')
})