import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMenu } from '../../contexts/MenuContext'
import { compressImage } from '../../utils/compressImage'
import ImageUploader from './ImageUploader'

function CategoryForm({ initial, onSave, onCancel }) {
  const [nameEn, setNameEn] = useState(initial?.name_en ?? '')
  const [nameAr, setNameAr] = useState(initial?.name_ar ?? '')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(initial?.imageUrl ?? '')
  const [imagePosition, setImagePosition] = useState(initial?.imagePosition ?? { x: 50, y: 50 })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      let imageUrl = initial?.imageUrl ?? ''
      if (imageFile) {
        imageUrl = await compressImage(imageFile)
      } else if (!imagePreview) {
        imageUrl = ''
      }
      await onSave({ name_en: nameEn, name_ar: nameAr, imageUrl, imagePosition })
    } catch (err) {
      setError(err.message || 'Failed to save. Try a smaller image.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-bg rounded-2xl p-4 border border-surface-2 flex flex-col gap-3">
      <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Name (English)" required className="input-field" />
      <input value={nameAr} onChange={(e) => setNameAr(e.target.value)} placeholder="الاسم (عربي)" required dir="rtl" className="input-field font-cairo" />

      <ImageUploader
        label="Category Photo (shown in carousel)"
        preview={imagePreview}
        onChange={handleImage}
        onRemove={removeImage}
        position={imagePosition}
        onPositionChange={setImagePosition}
      />

      {error && <p className="text-red-500 text-xs px-1">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="btn-primary flex-1">{saving ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">Cancel</button>
      </div>
    </form>
  )
}

function SortableCategory({ cat, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: cat.id })
  const [confirmDelete, setConfirmDelete] = useState(false)

  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }

  return (
    <div ref={setNodeRef} style={style} className="bg-surface rounded-xl border border-surface-2 flex items-center gap-3 px-4 py-3">
      <span {...attributes} {...listeners} className="text-text-light cursor-grab active:cursor-grabbing text-lg select-none">⠿</span>

      {cat.imageUrl && (
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
          <img src={cat.imageUrl} alt={cat.name_en} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-text font-medium text-sm">{cat.name_en}</p>
        <p className="text-text-muted text-sm font-cairo" dir="rtl">{cat.name_ar}</p>
      </div>

      <div className="flex gap-2">
        <button onClick={() => onEdit(cat)} className="text-text-muted hover:text-brown text-sm px-2 py-1 rounded-lg hover:bg-surface-2 transition-all">Edit</button>
        {confirmDelete ? (
          <div className="flex gap-1">
            <button onClick={() => onDelete(cat.id)} className="text-red-500 text-xs px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100">Yes</button>
            <button onClick={() => setConfirmDelete(false)} className="text-text-muted text-xs px-2 py-1 rounded-lg hover:bg-surface-2">No</button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="text-text-light hover:text-red-400 text-sm px-2 py-1 rounded-lg hover:bg-surface-2 transition-all">Del</button>
        )}
      </div>
    </div>
  )
}

export default function CategoryManager() {
  const { categories, addCategory, updateCategory, deleteCategory, reorderCategories } = useMenu()
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIdx = categories.findIndex((c) => c.id === active.id)
      const newIdx = categories.findIndex((c) => c.id === over.id)
      reorderCategories(arrayMove(categories, oldIdx, newIdx))
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-brown text-2xl font-bold">Categories</h2>
        <button onClick={() => { setShowAdd(true); setEditing(null) }} className="btn-primary text-sm">+ Add Category</button>
      </div>

      <AnimatePresence>
        {showAdd && !editing && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 overflow-hidden">
            <CategoryForm onSave={async (data) => { await addCategory(data); setShowAdd(false) }} onCancel={() => setShowAdd(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {categories.length === 0 ? (
        <p className="text-text-muted text-sm py-8 text-center">No categories yet. Add one to get started.</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={categories.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                editing?.id === cat.id ? (
                  <motion.div key={cat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <CategoryForm
                      initial={cat}
                      onSave={async (data) => { await updateCategory(cat.id, data); setEditing(null) }}
                      onCancel={() => setEditing(null)}
                    />
                  </motion.div>
                ) : (
                  <SortableCategory key={cat.id} cat={cat} onEdit={(c) => { setEditing(c); setShowAdd(false) }} onDelete={deleteCategory} />
                )
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
