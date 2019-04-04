import axios from 'axios'

function encrypt (origin) {
  let jse = new this.$jsEncrypt()
      console.log(new this.$jsEncrypt())
      await axios.get('/static/rsa_1024_pub.pem').then(res => {
        jse.setPublicKey(res.data)
      }).catch(err => {
        console.log('error: ', err)
      })
}

function decrypt (encrypted) {

}

export {encrypt, decrypt}