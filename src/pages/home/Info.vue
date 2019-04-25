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
    this.getInfo()
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('u', encrypt(this.username) || sessionStorage.getItem('u'))
    })
  },
  methods: {
    getInfo () {
      if (!this.$store.state.username) {
        // 发起请求
        this.$store.dispatch('login', )
      }
    }
  }
}
</script>
