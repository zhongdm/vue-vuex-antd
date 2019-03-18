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
      cxt.font = " 20px Georgia"
     
      /**
       * 随机的数字和字母
       * Math.random() * 26 + 65
       */
      cxt.rotate(Math.random()*30*Math.PI/180)
       cxt.fillText('1', 60,20)

       for (let i = 0; i < 4; i++) {

       }
    },
    getIntRandom (start, end) {
      return Math.floo(Math.random() * (end -start + 1)) + start
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
