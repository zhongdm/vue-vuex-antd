import axios from 'axios'
import JsEncrypt from 'jsencrypt'

let jse = new JsEncrypt()
function getPubKey () {
  return axios.get('/static/rsa_1024_pub.pem').then(res => {
    // jse.setPublicKey(res.data)
    console.log('begin')
    return res.data
  }).catch(err => {
    console.log('error: ', err)
  })
}
function getPrivKey () {
  return axios.get('/static/rsa_1024_priv.pem').then(res => {
    // jse.setPublicKey(res.data)
    console.log('begin')
    return res.data
  }).catch(err => {
    console.log('error: ', err)
  })
}

async function encrypt (origin) {
  let pubKey = await getPubKey()
  console.log(pubKey, 'get')
  jse.setPublicKey(pubKey)
  let encrypted = jse.encrypt(origin)
  console.log(encrypted, 'aaa')
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
