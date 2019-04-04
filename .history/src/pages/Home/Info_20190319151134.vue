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
      // username: state => state.username
      encryptUsername: async function (state) {
        console.log('map state')
        return state.username
      }
    })
  },
  mounted () {
    console.log('mounted', this.encryptUsername, decrypt(this.encryptUsername))
    this.encryptUsername.then(res => {
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
