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
  data () {
    return {
      username: ''
    }
  },
  computed: {
    ...mapState({
      encryptUsername: 'username'
    })
  },
  mounted () {
    this.encryptUsername.then(async res => {
      console.log(res)
      this.username = await decrypt(res)
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
