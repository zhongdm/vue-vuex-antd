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
      // username: ''
    }
  },
  computed: {
    ...mapState({
      username: state => decrypt(state.username) // 解密前的username
    })
  },
  mounted () {
  },
  created () {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('u', encrypt(this.username) || sessionStorage.getItem('u'))
    })
  }
}
</script>
