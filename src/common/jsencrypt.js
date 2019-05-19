import JsEncrypt from 'jsencrypt'
import {privateKey, publicKey} from '@/common/key'

let jse = new JsEncrypt()
/**
 * 加密
 */
function encrypt (origin) {
  jse.setPublicKey(publicKey)
  let encrypted = jse.encrypt(origin)
  return encrypted
}

/**
 * 解密
 */
function decrypt (encrypted) {
  jse.setPrivateKey(privateKey)
  let decrypted = jse.decrypt(encrypted)
  return decrypted
}

export {encrypt, decrypt}
