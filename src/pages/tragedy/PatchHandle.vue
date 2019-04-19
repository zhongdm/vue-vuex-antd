<template>
  <div>
    {{result}}
  </div>
</template>

<script>
// fibonacci
export default {
  data() {
    return {
      // result: -1
      mine: '123q'
    }
  },
  mounted() {
    let start = new Date()
    // this.result = this.fibonacci(10)
  },
  computed: {
    result: function() {
      // return this.mine
      return this.fibonacci(9)
    }
  },
  methods: {
    fibonacci: function(n) {
      console.log(n)
      return n < 2 ? n: this.fibonacci(n-1) + this.fibonacci(n-2)
    }
  }
}
</script>

<style>

</style>

