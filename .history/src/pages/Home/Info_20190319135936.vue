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
      username: state => decrypt(state.username)
      // username: state => state.username
    })
  },
  created () {
    console.log('refresh', decrypt('1'))
    window.addEventListener('beforeunload', () => {
      console.log('asd', this.$store.state.username)
      sessionStorage.setItem('us', this.$store.state.username)
      sessionStorage.setItem('u', encrypt(this.username))
    })
  }
}
</script>
