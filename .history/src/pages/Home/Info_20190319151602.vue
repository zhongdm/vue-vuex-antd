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
      encryptUsername: state => state.username
    })
  },
  async mounted () {
    this.username = await decrypt(this.encryptUsername)
  },
  created () {
    console.log('create', decrypt(``))
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('u', encrypt(this.username))
    })
  }
}
</script>
