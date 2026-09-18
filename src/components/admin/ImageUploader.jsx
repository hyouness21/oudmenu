import { useRef, useState } from 'react'

export default function ImageUploader({
  preview,
  onChange,
  onRemove,
  position = { x: 50, y: 50 },
  onPositionChange,
  label = 'Photo (optional)',
}) {
  const fileRef = useRef()
  const dragRef = useRef(null)
  const positionRef = useRef(position)
  positionRef.current = position
  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (e) => {
    if (!onPositionChange) return
    e.preventDefault()
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: positionRef.current.x,
      startPosY: positionRef.current.y,
    }

    const onMove = (ev) => {
      if (!dragRef.current) return
      const dx = ev.clientX - dragRef.current.startX
      const dy = ev.clientY - dragRef.current.startY
      const newX = Math.min(100, Math.max(0, dragRef.current.startPosX - dx * 0.3))
      const newY = Math.min(100, Math.max(0, dragRef.current.startPosY - dy * 0.3))
      onPositionChange({ x: newX, y: newY })
    }

    const onUp = () => {
      dragRef.current = null
      setIsDragging(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <div>
      <p className="admin-label">{label}</p>

      {preview ? (
        <div>
          {/* Draggable preview */}
          <div
            className="relative w-full h-40 rounded-xl overflow-hidden border border-surface-2 mb-2 select-none"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onPointerDown={handlePointerDown}
          >
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover pointer-events-none"
              style={{ objectPosition: `${position.x}% ${position.y}%` }}
              draggable={false}
            />
            {/* Drag hint overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isDragging ? 'opacity-0' : 'opacity-0 hover:opacity-100'}`}>
              <div className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none">
                <span className="text-base leading-none">⠿</span>
                Drag to reposition
              </div>
            </div>
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
