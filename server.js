/**
 * 服务端渲染
 */
const express = require('express')
const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const cors = require('cors')

// const server = express()
const app = express()
const router = express.Router()
const data = require('./data.json')
router.get('/api/getList', (req, res) => {
  return res.json({
    status: 0,
    data: data.list
  })
})

router.get('/api/getInfo', (req, res) => {
  return res.json({
    status: 0,
    data: data.info
  })
})
// app.use(cors())
// app.use('/', router)
// server.on('error', err => console.log(err))
// server.listen(8088, () => {
//   console.log('server startd at localhost:8088')
// })



const resolve = file => path.resolve(__dirname, file)

// 生成服务端渲染函数
const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template: fs.readFileSync(resolve('./index.template.html'), 'utf-8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json'),
  baseDir: resolve('./dist')
})

// 引入静态资源
app.use(express.static(path.join(__dirname, 'dist')))

// 分发路由
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page not found')
    } else {
      res.status(500).send('500 | Internal Server Error')
    }

  }
  const context = {
    title: 'Vue SSR demo',
    url: req.url
  }
  console.log('aaaa  ', req.url)
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    console.log(html)
    res.send(html)
  })
})

app.on('error', err => console.log(err))
app.listen(3000, () => {
  console.log('vue ssr startd at localhost:3000')
})