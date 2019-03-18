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
      baseData: 'ABCDEFGHIJKLMNOPQRSTUWVXYZ'
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      let canvas = document.getElementById('canvas')
      let cxt = canvas.getContext('2d')
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
      
      for (let i = 0; i < 4; i++) {
        // cxt.save()
        let text = String.fromCharCode(this.getIntRandom(26, 'A'.charCodeAt()))
        let angle = this.getIntRandom(20, -10)
        cxt.rotate(angle * Math.PI / 180)
        let pointX = this.getIntRandom(100, angle > 0 ? 30 : 0)
        let pointY = this.getIntRandom(20, angle > 0 ? 0 : 20)
        console.log(text, angle, pointX, pointY)
        cxt.translate(pointX, pointY)
        cxt.fillText(text, pointX, pointY)
        // cxt.restore()
      }
    },
    getIntRandom (len, start = 0) {
      return Math.floor(Math.random() * (len)) + start
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
