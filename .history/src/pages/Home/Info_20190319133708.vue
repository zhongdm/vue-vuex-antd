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
    console.log('refresh', decrypt('1'), encrypt(this.$store.state.username).then(res => console.log(res, 'ok')))
    window.addEventListener('beforeunload', () => {
      console.log(this.$store.state.username)
      sessionStorage.setItem('us', this.$store.state.username)
      sessionStorage.setItem('u', encrypt(this.$store.state.username).then(res => console.log(res, 'ok')))
    })
  }
}
</script>
