<template>
  <div>
    <canvas @click="handleCanvasClick" id="canvas">

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
      // let canvas = document.getElementById('canvas')
      // let cxt = canvas.getContext('2d')
      // cxt.font = " 100px Georgia"
      // // cxt.moveTo(10, 10)
      // // cxt.fillStyle('red')
      // cxt.fillText('1', 60,60)

      var c=document.getElementById("canvas");
var ctx=c.getContext("2d");

ctx.font="20px Georgia";
ctx.fillText("Hello World!",10,50);
    },
    handleCanvasClick () {
      console.log('clicked')
    }
  }
}
</script>

<style lang="stylus" scoped>
#canvas {
  width 160px
  height 40px
  border 1px solid red
}
</style>
