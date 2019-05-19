<template>
  <div>
    info{{username}}
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {encrypt, decrypt} from '@/common/jsencrypt'
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
  },
  methods: {
  }
}
</script>
