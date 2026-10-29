import { useState, useRef, useEffect } from 'react'
import { useMenu } from '../../contexts/MenuContext'
import { uploadImage } from '../../utils/uploadImage'
import ImageUploader from './ImageUploader'

const DEFAULT_LABELS = ['Evenings', 'First coffee', 'Shisha nights']
const SLOT_TITLES = ['Big photo (tall arch)', 'Round photo', 'Small photo (small arch)']

export default function AppearanceManager() {
  const { settings, updateSettings } = useMenu()
  const heroBg = settings?.heroBg ?? {}

  // ── Hero photo state (unchanged) ──
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
        imageUrl = await uploadImage(imageFile, { folder: 'appearance', maxWidth: 1200, quality: 0.8 })
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

  // ── About photos state ──
  const [slots, setSlots] = useState(() => {
    const stored = settings?.aboutPhotos ?? []
    return [0, 1, 2].map((i) => ({
      imageUrl: stored[i]?.imageUrl ?? '',
      imagePosition: stored[i]?.imagePosition ?? { x: 50, y: 50 },
      label: stored[i]?.label ?? DEFAULT_LABELS[i],
      _file: null,
      _preview: stored[i]?.imageUrl ?? '',
    }))
  })
  const [aboutSaving, setAboutSaving] = useState(false)
  const [aboutSaved, setAboutSaved] = useState(false)
  const [aboutError, setAboutError] = useState('')
  const aboutInitialized = useRef(false)

  useEffect(() => {
    if (!settings || aboutInitialized.current) return
    aboutInitialized.current = true
    const stored = settings.aboutPhotos
    if (!stored) return
    setSlots([0, 1, 2].map((i) => ({
      imageUrl: stored[i]?.imageUrl ?? '',
      imagePosition: stored[i]?.imagePosition ?? { x: 50, y: 50 },
      label: stored[i]?.label ?? DEFAULT_LABELS[i],
      _file: null,
      _preview: stored[i]?.imageUrl ?? '',
    })))
  }, [settings])

  const updateSlot = (i, updates) => {
    setAboutSaved(false)
    setSlots((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], ...updates }
      return next
    })
  }

  const handleAboutSave = async () => {
    setAboutSaving(true)
    setAboutSaved(false)
    setAboutError('')
    try {
      const processed = []
      for (const slot of slots) {
        let imageUrl = slot.imageUrl
        if (slot._file) {
          imageUrl = await uploadImage(slot._file, { folder: 'appearance', keepOriginal: true })
        } else if (!slot._preview) {
          imageUrl = ''
        }
        processed.push({ imageUrl, imagePosition: slot.imagePosition, label: slot.label })
      }
      await updateSettings({ aboutPhotos: processed })
      setAboutSaved(true)
      setSlots(processed.map((p, i) => ({
        ...p,
        _file: null,
        _preview: p.imageUrl,
        label: p.label || DEFAULT_LABELS[i],
      })))
    } catch (err) {
      setAboutError(err.message || 'Failed to save.')
    } finally {
      setAboutSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="font-playfair text-brown text-2xl font-bold mb-6">Appearance</h2>

      {/* Hero photo card */}
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

      {/* About photos card */}
      <div className="bg-surface rounded-2xl border border-surface-2 p-5 flex flex-col gap-4 mt-6">
        <div>
          <p className="text-text font-medium text-sm">About Us photos</p>
          <p className="text-text-muted text-xs mt-0.5">
            3 photos that show the vibe of Oud: a big one, a round one and a small one.
          </p>
        </div>

        {slots.map((slot, i) => (
          <div key={i} className="flex flex-col gap-2">
            <p className="text-text-muted text-xs font-semibold uppercase tracking-wide">{SLOT_TITLES[i]}</p>
            <ImageUploader
              label=""
              preview={slot._preview}
              onChange={(e) => {
                const file = e.target.files[0]
                if (!file) return
                updateSlot(i, { _file: file, _preview: URL.createObjectURL(file) })
              }}
              onRemove={() => updateSlot(i, { _file: null, _preview: '', imageUrl: '' })}
              position={slot.imagePosition}
              onPositionChange={(pos) => updateSlot(i, { imagePosition: pos })}
            />
            <input
              value={slot.label}
              onChange={(e) => updateSlot(i, { label: e.target.value })}
              placeholder={DEFAULT_LABELS[i]}
              className="input-field text-sm"
            />
          </div>
        ))}

        {aboutError && <p className="text-red-500 text-xs">{aboutError}</p>}

        <button
          onClick={handleAboutSave}
          disabled={aboutSaving}
          className="btn-primary"
        >
          {aboutSaving ? 'Saving...' : aboutSaved ? 'Saved ✓' : 'Save Photos'}
        </button>
      </div>
    </div>
  )
}
