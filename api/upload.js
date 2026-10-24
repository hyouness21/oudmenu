// Gives the admin page a short-lived permission to upload one photo
// directly to Vercel Blob. Only a logged-in admin (valid Firebase login)
// can get that permission, so strangers can't upload files.
import { handleUpload } from '@vercel/blob/client'
import { createRemoteJWKSet, jwtVerify } from 'jose'

const PROJECT_ID = 'oudd-823e7'
const googleKeys = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
)

async function verifyAdmin(idToken) {
  if (!idToken) throw new Error('Not logged in')
  await jwtVerify(idToken, googleKeys, {
    issuer: `https://securetoken.google.com/${PROJECT_ID}`,
    audience: PROJECT_ID,
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const result = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const { idToken } = JSON.parse(clientPayload || '{}')
        await verifyAdmin(idToken)
        if (!pathname.startsWith('menu/')) throw new Error('Invalid path')
        return {
          allowedContentTypes: ['image/webp', 'image/jpeg', 'image/png'],
          maximumSizeInBytes: 5 * 1024 * 1024,
          addRandomSuffix: true,
          cacheControlMaxAge: 60 * 60 * 24 * 365,
        }
      },
      onUploadCompleted: async () => {},
    })
    return res.status(200).json(result)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}
