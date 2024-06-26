import CryptoJS from "crypto-js";
import config from "../config/config";

let SECRETKEY = config.md5.password;

/**
 * 加密函数，加密同一个字符串生成的都不相同 AES对称加密
 * @param {*} str
 */
export function encrypt(str) {
  return CryptoJS.AES.encrypt(JSON.stringify(str), SECRETKEY).toString();
}
/**
 * 解密函数
 * @param {*} str
 */
export function decrypt(str) {
  const bytes = CryptoJS.AES.decrypt(str, SECRETKEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
