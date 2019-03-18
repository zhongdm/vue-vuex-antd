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
        let text = String.fromCharCode(this.getIntRandom(26, 'A'.charCodeAt()))
        console.log(text)
        let angle = this.getIntRandom(60, -30)
        cxt.rotate(angle * Math.PI / 180)
        let pointX = this.getIntRandom(120, angle > 0 ? 30 : 0)
        let pointY = this.getIntRandom(30, angle > 0 ? 0 : 30)

        cxt.fillText(text, pointX, pointY)

      }
    },
    getIntRandom (len, start = 0) {
      return Math.floor(Math.random() * (len + 1)) + start
    },
    handleCanvasClick () {
      console.log('clicked')
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
