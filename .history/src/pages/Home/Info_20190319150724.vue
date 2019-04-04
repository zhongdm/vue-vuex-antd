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
      // username: state => state.username
      username: async function (state) {
        console.log('map state')
        return state.username
      }
    })
  },
  mounted () {
    console.log('mounted')
    decrypt(this.username).then(res => {
      console.log(res)
      this.username = res
    })
  },
  created () {
    console.log('create', decrypt(``))
    window.addEventListener('beforeunload', () => {
      console.log('asd', this.$store.state.username)
      sessionStorage.setItem('u', encrypt(this.username))
    })
  }
}
</script>
