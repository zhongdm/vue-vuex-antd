<template>
  <div>
    <canvas @click="handleCanvasClick">

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
      let canvas = document.getElementsByTagName('canvas')[0]
      let cxt = canvas.getContext('2d')
      cxt.moveTo(10, 10)
      // cxt.fillStyle('red')
      cxt.fillText('1', 10, 10)
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


