import { useState } from 'react'
import { useMenu } from '../../contexts/MenuContext'
import { compressImage } from '../../utils/compressImage'
import ImageUploader from './ImageUploader'

export default function AppearanceManager() {
  const { settings, updateSettings } = useMenu()
  const heroBg = settings?.heroBg ?? {}

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(heroBg.imageUrl ?? '')
  const [imagePosition, setImagePosition] = useState(heroBg.imagePosition ?? { x: 50, y: 50 })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setSaved(false)
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview('')
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    setError('')
    try {
      let imageUrl = heroBg.imageUrl ?? ''
      if (imageFile) {
        imageUrl = await compressImage(imageFile, 1200, 0.82)
      } else if (!imagePreview) {
        imageUrl = ''
      }
      await updateSettings({ heroBg: { imageUrl, imagePosition } })
      setSaved(true)
    } catch (err) {
      setError(err.message || 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="font-playfair text-brown text-2xl font-bold mb-6">Appearance</h2>

      <div className="bg-surface rounded-2xl border border-surface-2 p-5 flex flex-col gap-4">
        <div>
          <p className="text-text font-medium text-sm">Hero Background Photo</p>
          <p className="text-text-muted text-xs mt-0.5">
            Replaces the dark pattern behind your logo. Drag the photo to choose which part is shown.
          </p>
        </div>

        <ImageUploader
          label=""
          preview={imagePreview}
          onChange={handleImage}
          onRemove={removeImage}
          position={imagePosition}
          onPositionChange={(pos) => { setImagePosition(pos); setSaved(false) }}
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary"
        >
          {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
