<template>
  <div>
    <canvas @click="handleCanvasClick" id="canvas"
    width="160" height="40">

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
      cxt.clearRect(0, 0, 160, 40)
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
      cxt.fillRect(0, 0, 160, 40)
      /**
       * 随机的小圆点
       */
      for (let m = 0; m < 40; m++) {

      }
      for (let i = 0; i < 4; i++) {
        cxt.save()
        let text = this.randomStr(this.baseData)
        let angle = this.getIntRandom(20, -10)
        let pointX = this.getIntRandom(100, angle > 0 ? 30 : 0)
        let pointY = this.getIntRandom(20, angle > 0 ? 10 : 20)
        console.log(text, angle, pointX, pointY)
        // cxt.translate(pointX, pointY)
        cxt.rotate(angle * Math.PI / 180)
        cxt.fillStyle = this.randomColor(0, 150)
        cxt.fillText(text, pointX, pointY)
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
