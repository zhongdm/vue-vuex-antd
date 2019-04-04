<template>
  <div>
    info
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Info',
  computed: {
    ...mapState({
      username: state => state.username
    })
  }
}
</script>

