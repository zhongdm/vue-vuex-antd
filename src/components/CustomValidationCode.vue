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
          1, 0, 2 * Math.PI)
        cxt.fill()
        cxt.closePath()
      }
      for (let i = 0; i < 4; i++) {
        cxt.save()
        let text = this.randomStr(this.baseData)
        let angle = this.getIntRandom(60, -30)
        cxt.translate(canvasWidth / 4 * i + 15, 15)
        cxt.rotate(angle * Math.PI / 180)

        cxt.font = `${this.getIntRandom(20, 14)}px Arial`
        cxt.fillStyle = this.randomColor(0, 150)
        cxt.fillText(text, 0, 10)
        cxt.restore()
      }

      /**
       * 添加干扰项
       */
      for (let n = 0; n < 4; n++) {
        cxt.beginPath()
        cxt.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight)
        cxt.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight)
        cxt.strokeStyle = this.randomColor(180, 250)
        cxt.stroke()
        cxt.closePath()
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
      this.draw()
    }
  }
}
</script>

<style lang="stylus" scoped>
#canvas {
  border 1px solid #d5d5d5
}
</style>
