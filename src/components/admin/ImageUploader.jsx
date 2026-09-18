import { useRef } from 'react'

export default function ImageUploader({ preview, onChange, onRemove, label = 'Photo (optional)' }) {
  const fileRef = useRef()

  return (
    <div>
      <p className="admin-label">{label}</p>

      {preview ? (
        <div>
          {/* Preview */}
          <div className="w-full h-40 rounded-xl overflow-hidden border border-surface-2 mb-2">
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <label className="flex-1 text-center cursor-pointer btn-secondary text-xs py-2 rounded-xl">
              Change Photo
              <input ref={fileRef} type="file" accept="image/*" onChange={onChange} className="hidden" />
            </label>
            <button
              type="button"
              onClick={onRemove}
              className="flex-1 text-center text-red-400 bg-red-50 hover:bg-red-100 text-xs py-2 rounded-xl border border-red-100 transition-colors"
            >
              Remove Photo
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-28 rounded-xl border-2 border-dashed border-surface-2 cursor-pointer hover:border-gold/40 transition-colors">
          <span className="text-2xl mb-1 opacity-30">🖼</span>
          <span className="text-text-muted text-sm">Click to upload image</span>
          <span className="text-text-light text-xs mt-0.5">JPG, PNG, WEBP</span>
          <input ref={fileRef} type="file" accept="image/*" onChange={onChange} className="hidden" />
        </label>
      )}
    </div>
  )
}
