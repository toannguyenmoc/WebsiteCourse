import axios from 'axios'
import sha1 from 'js-sha1'

// Load biến môi trường
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET

/**
 * Làm sạch tiêu đề → làm public_id
 */
export const normalizeTitle = (rawName) => {
  return rawName
    .replace(/\.[^/.]+$/, '') // Bỏ đuôi file
    .replace(/[^a-zA-Z0-9\u00C0-\u1EF9-_ ]/g, '') // Giữ chữ + dấu tiếng Việt
    .slice(0, 64)
}

/**
 * Trả về public_id từ tên file
 */
export const createVideo = async (title) => {
  const clean = normalizeTitle(title)
  console.log('🎯 Public ID:', clean)
  return clean
}

/**
 * Tạo signature bảo mật cho signed upload
 */
const generateSignature = (params) => {
  const sorted = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&')

  return sha1(`${sorted}${API_SECRET}`)
}

/**
 * Upload video signed (an toàn)
 */
export const uploadVideoSource = async (publicId, file) => {
  const timestamp = Math.floor(Date.now() / 1000)

  const paramsToSign = {
    public_id: publicId,
    timestamp,
  }

  const signature = generateSignature(paramsToSign)

  const form = new FormData()
  form.append('file', file)
  form.append('public_id', publicId)
  form.append('api_key', API_KEY)
  form.append('timestamp', timestamp)
  form.append('signature', signature)

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
    form
  )

  const playerUrl = res.data.secure_url
  console.log('✅ Upload thành công:', playerUrl)

  return playerUrl
}

/**
 * Cập nhật (ghi đè) video đã có bằng video mới
 */
export const updateVideoSource = async (publicId, file) => {
  const timestamp = Math.floor(Date.now() / 1000)

  const paramsToSign = {
    public_id: publicId,
    timestamp,
    overwrite: true,
  }

  const signature = generateSignature(paramsToSign)

  const form = new FormData()
  form.append('file', file)
  form.append('public_id', publicId)
  form.append('overwrite', 'true')
  form.append('api_key', API_KEY)
  form.append('timestamp', timestamp)
  form.append('signature', signature)

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
    form
  )

  const playerUrl = res.data.secure_url
  console.log('✅ Video đã cập nhật thành công:', playerUrl)

  return playerUrl
}
