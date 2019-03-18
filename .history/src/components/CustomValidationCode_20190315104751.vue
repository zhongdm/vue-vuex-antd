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
      let canvas = document.getElementById('canvas')
      let cxt = canvas.getContext('2d')
      cxt.font = " 20px Georgia";
      // cxt.moveTo(10, 10)
      // cxt.fillStyle('red')
      cxt.fillText('123', 10, 10)
      ctx.font="20px Georgia";
ctx.fillText("Hello World!",10,50);

ctx.font="30px Verdana";
// 创建渐变
var gradient=ctx.createLinearGradient(0,0,c.width,0);
gradient.addColorStop("0","magenta");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");
// 用渐变填色
ctx.fillStyle=gradient;
ctx.fillText("w3school.com.cn",10,90);
    },
    handleCanvasClick () {
      console.log('clicked')
    }
  }
}
</script>

<style lang="stylus" scoped>
canvas {
  width 160px
  height 40px
  border 1px solid red
}
</style>


