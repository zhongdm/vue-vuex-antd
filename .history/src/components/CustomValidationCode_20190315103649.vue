<template>
  <div>
    <canvas>

    </canvas>
  </div>
</template>

<script>
export default {
  name: 'ValidationCode',
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      let canvas = document.getElementsByTagName('canvas')[0]
      let cxt = canvas.getContext('2d')
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


