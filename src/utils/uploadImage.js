import { upload } from '@vercel/blob/client'
import { auth } from '../firebase/config'

// Resize a photo in the browser and return it as a small file (WebP when the
// browser supports it, otherwise JPEG). Accepts a File/Blob or a data: URL.
export function compressToBlob(source, maxWidth = 640, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const isUrl = typeof source === 'string'
    const url = isUrl ? source : URL.createObjectURL(source)
    const cleanup = () => { if (!isUrl) URL.revokeObjectURL(url) }

    img.onload = () => {
      const ratio = Math.min(1, maxWidth / img.width)
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

// Compress a photo, upload it to Vercel Blob and return its public link.
// `folder` is one of: items, categories, appearance.
export async function uploadImage(source, { folder = 'items', maxWidth = 640, quality = 0.78 } = {}) {
  const user = auth.currentUser
  if (!user) throw new Error('Please log in again before uploading photos')

  const blob = await compressToBlob(source, maxWidth, quality)
  const ext = blob.type === 'image/webp' ? 'webp' : 'jpg'
  const idToken = await user.getIdToken()

  const result = await upload(`menu/${folder}/photo.${ext}`, blob, {
    access: 'public',
    handleUploadUrl: '/api/upload',
    clientPayload: JSON.stringify({ idToken }),
    contentType: blob.type,
  })
  return result.url
}
