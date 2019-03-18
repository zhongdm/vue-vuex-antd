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
  width 100px
  height 20px
}
</style>


