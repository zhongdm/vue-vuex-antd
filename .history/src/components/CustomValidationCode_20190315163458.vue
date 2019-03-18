<template>
  <div>
    <canvas @click="handleCanvasClick" id="canvas"
    width="120" height="40">

    </canvas>
  </div>
</template>

<script>
export default {
  name: 'ValidationCode',
  data () {
    return {
      baseData: 'ABCDEFGHIJKLMNOPQRSTUWVXYZ1234567890'
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      let canvas = document.getElementById('canvas')
      let cxt = canvas.getContext('2d')
      let canvasWidth = canvas.width
      let canvasHeight = canvas.height
      cxt.clearRect(0, 0, canvasWidth, canvasHeight)
      cxt.font = "20px Georgia"
      /**
       * 随机的位置
       * 随机的文本text
       * 随机的旋转角度
       * 随机的字体大小和颜色
       */

      /**
       * 随机填充的数字和字母
       * Math.random() * 26 + 65
       */
      // let text = String.fromCharCode(this.getIntRandom(26, 'A'.charCodeAt()))
      // cxt.rotate(this.getIntRandom(30) * Math.PI / 180)
      // cxt.fillText(text, 60, 20)
      /**
       * 随机背景颜色
       */
      cxt.fillStyle = this.randomColor(180, 250)
      cxt.fillRect(0, 0, canvasWidth, canvasHeight)
      /**
       * 随机的小圆点
       */
      for (let m = 0; m < 40; m++) {
        cxt.beginPath()
        cxt.fillStyle = this.randomColor(100, 200)
        cxt.arc(Math.random() * canvasWidth,
          Math.random() * canvasHeight,
          1,  0, 2 * Math.PI)
        cxt.fill()
        cxt.closePath()
      }
      let startX = 0
      for (let i = 0; i < 4; i++) {
        console.log(startX)
        cxt.save()
        let text = this.randomStr(this.baseData)
        let angle = this.getIntRandom(60, -30)
        let pointX = this.getIntRandom(canvasWidth / 4, canvasWidth / 4 * i)
        console.log(text, angle, pointX, 30)
        cxt.translate(canvasWidth / 4 * i + 15, 0)
        cxt.rotate(angle * Math.PI / 180)
        cxt.fillStyle = this.randomColor(0, 150)
        // cxt.fillText(text, -15 + 5, 5)
        cxt.fillText(text, 0, 0)
        cxt.restore()
      }
    },
    getIntRandom (len, start = 0) {
      return Math.floor(Math.random() * (len)) + start
    },
    randomColor (min, max) {
      const r = Math.random() * (max - min) + min
      const g = Math.random() * (max - min) + min
      const b = Math.random() * (max - min) + min
      return `rgb(${r}, ${g}, ${b})`
    },
    randomStr (data) {
      return data[this.getIntRandom(data.length)]
    },
    handleCanvasClick () {
      console.log('clicked')
      this.draw()
    }
  }
}
</script>

<style lang="stylus" scoped>
#canvas {
  // width 160px
  // height 40px
  border 1px solid red
}
</style>
