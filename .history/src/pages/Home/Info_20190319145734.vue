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
      // username: async (state) => decrypt(state.username)
      // username: state => state.username
      username: async function (state) {
        console.log(Promise.resolve(state.username), await decrypt(state.username))
        return await decrypt(state.username)
      }
    })
  },
  created () {
    window.addEventListener('beforeunload', () => {
      console.log('asd', this.$store.state.username)
      sessionStorage.setItem('u', encrypt(this.username))
    })
  }
}
</script>
