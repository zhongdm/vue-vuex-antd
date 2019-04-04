<template>
  <div>
    info{{username}}
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {encrypt, decrypt} from '@/utils/jsencrypt'
export default {
  name: 'Info',
  computed: {
    ...mapState({
      username: state => state.username
    })
  },
  created () {
    console.log('refresh', decrypt('1'))
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('u', encrypt(this.$store.state.username))
    })
  }
}
</script>
