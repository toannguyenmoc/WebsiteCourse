import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_PASSWORD_SECRET_KEY;
const iv = import.meta.env.VITE_PASSWORD_IV;

export function encrypt(text) {
    const encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(secretKey),
        {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );
    return encrypted.toString();
}

export function decrypt(cipherText) {
    const decrypted = CryptoJS.AES.decrypt(
        cipherText,
        CryptoJS.enc.Utf8.parse(secretKey),
        {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
}
