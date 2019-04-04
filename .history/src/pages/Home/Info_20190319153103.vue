<template>
  <div>
    info{{username}}
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {decrypt} from '@/utils/jsencrypt'
export default {
  name: 'Info',
  data () {
    return {
      username: ''
    }
  },
  computed: {
    ...mapState({
      encryptUsername: state => decrypt(state.username()) // 解密前的username
    })
  },
  async mounted () {
    // if (this.encryptUsername) {
    //   this.username = await decrypt(this.encryptUsername)
    // } else {
    //   this.username = await decrypt(sessionStorage.getItem('u'))
    // }
  },
  created () {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('u', this.encryptUsername || sessionStorage.getItem('u'))
    })
  }
}
</script>
