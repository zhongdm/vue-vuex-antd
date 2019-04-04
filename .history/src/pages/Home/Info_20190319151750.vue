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
      encryptUsername: state => state.username // 解密前的username
    })
  },
  async mounted () {
    this.username = await decrypt(this.encryptUsername)
  },
  created () {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('u', this.encryptUsername)
    })
  }
}
</script>
