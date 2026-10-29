import { upload } from '@vercel/blob/client'
import { auth } from '../firebase/config'

// Resize a photo in the browser and return it as a small file (WebP when the
// browser supports it, otherwise JPEG). Accepts a File/Blob or a data: URL.
export function compressToBlob(source, maxWidth = 640, quality = 0.78, { maxSide } = {}) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const isUrl = typeof source === 'string'
    const url = isUrl ? source : URL.createObjectURL(source)
    const cleanup = () => { if (!isUrl) URL.revokeObjectURL(url) }

    img.onload = () => {
      let ratio = Math.min(1, maxWidth / img.width)
      if (maxSide != null) {
        const longerSide = Math.max(img.width, img.height)
        ratio = Math.min(1, maxSide / longerSide)
      }
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * ratio)
      canvas.height = Math.round(img.height * ratio)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      cleanup()
      canvas.toBlob((webp) => {
        // Safari can't encode WebP and silently returns PNG; use JPEG there.
        if (webp && webp.type === 'image/webp') return resolve(webp)
        canvas.toBlob(
          (jpeg) => (jpeg ? resolve(jpeg) : reject(new Error('Could not compress image'))),
          'image/jpeg',
          quality
        )
      }, 'image/webp', quality)
    }
    img.onerror = () => { cleanup(); reject(new Error('Could not read image file')) }
    img.src = url
  })
}

const ORIGINAL_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ORIGINAL_MAX_BYTES = 4.5 * 1024 * 1024

// Compress a photo, upload it to Vercel Blob and return its public link.
// `folder` is one of: items, categories, appearance.
// `keepOriginal`: when true and source is a ≤4.5 MB JPEG/PNG/WebP File, skip
// re-encoding entirely and upload the original bytes. Falls back to maxSide:2400
// quality:0.92 compression if the file is too large or wrong type.
export async function uploadImage(source, { folder = 'items', maxWidth = 640, quality = 0.78, maxSide, keepOriginal = false } = {}) {
  const user = auth.currentUser
  if (!user) throw new Error('Please log in again before uploading photos')

  let blob
  let ext

  if (
    keepOriginal &&
    source instanceof File &&
    ORIGINAL_ALLOWED_TYPES.includes(source.type) &&
    source.size <= ORIGINAL_MAX_BYTES
  ) {
    blob = source
    ext = source.type === 'image/png' ? 'png' : source.type === 'image/webp' ? 'webp' : 'jpg'
  } else {
    const effectiveMaxSide = keepOriginal ? 2400 : maxSide
    const effectiveQuality = keepOriginal ? 0.92 : quality
    blob = await compressToBlob(source, maxWidth, effectiveQuality, { maxSide: effectiveMaxSide })
    ext = blob.type === 'image/webp' ? 'webp' : 'jpg'
  }

  const idToken = await user.getIdToken()

  const result = await upload(`menu/${folder}/photo.${ext}`, blob, {
    access: 'public',
    handleUploadUrl: '/api/upload',
    clientPayload: JSON.stringify({ idToken }),
    contentType: blob.type,
  })
  return result.url
}
