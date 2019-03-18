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
    }
  }
}
</script>

