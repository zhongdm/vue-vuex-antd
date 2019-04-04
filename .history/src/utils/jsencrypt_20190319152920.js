import axios from 'axios'
import JsEncrypt from 'jsencrypt'
import {privateKey, publicKey} from '@/api/key'

let jse = new JsEncrypt()
function encrypt (origin) {
  jse.setPublicKey(publicKey)
  let encrypted = jse.encrypt(origin)
  return encrypted
}

function decrypt (encrypted) {
  jse.setPrivateKey(privateKey)
  let decrypted = jse.decrypt(encrypted)
  return decrypted
}

export {encrypt, decrypt}
