import axios from 'axios'
import JsEncrypt from 'jsencrypt'

let jse = new JsEncrypt()
async function getPubKey () {
  await axios.get('/static/rsa_1024_pub.pem').then(res => {
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
    console.log('beginpriv')
    return res.data
  }).catch(err => {
    console.log('error: ', err)
  })
}

function encrypt (origin) {
  let pubKey = getPubKey()
  console.log(pubKey, 'get')
  jse.setPublicKey(pubKey)
  let encrypted = jse.encrypt(origin)
  console.log(encrypted, 'aaa')
  return encrypted
}

async function decrypt (encrypted) {
  let privKey = await getPrivKey()
  jse.setPrivateKey(privKey)
  let decrypted = jse.decrypt(encrypted)
  console.log('jiemi', decrypted)
  return decrypted
}

export {encrypt, decrypt}
