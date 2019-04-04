import axios from 'axios'
import JsEncrypt from 'jsencrypt'

let jse = new JsEncrypt()
async function encrypt (origin) {
  console.log(new JsEncrypt())
  await axios.get('/static/rsa_1024_pub.pem').then(res => {
    jse.setPublicKey(res.data)
  }).catch(err => {
    console.log('error: ', err)
  })
  let encrypted = jse.encrypt(origin)
  return encrypted
}

async function decrypt (encrypted) {
  await axios.get('/static/rsa_1024_priv.pem').then(res => {
    jse.setPrivateKey(res.data)
  }).catch(err => {
    console.log('error: ', err)
  })
  let decrypted = jse.decrypt(encrypted)
  console.log('jiemi', decrypted)
  return decrypted
}

export {encrypt, decrypt}