import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMenu } from '../../contexts/MenuContext'
import { compressImage } from '../../utils/compressImage'
import ImageUploader from './ImageUploader'

const STATUS_OPTIONS = [
  { value: 'available', label: 'Available' },
  { value: 'unavailable', label: 'Unavailable' },
  { value: 'coming_soon', label: 'Coming Soon' },
]

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'LL', label: 'Lebanese Lira (ل.ل)' },
]

const statusColors = {
  available: 'text-green-dark bg-green-light/20',
  unavailable: 'text-text-light bg-surface-2',
  coming_soon: 'text-gold bg-gold/10',
}

function VariantEditor({ variants, onChange }) {
  const addVariant = () => onChange([...variants, {
    name: '', price: '', priceCurrency: 'USD',
    imageUrl: '', imagePosition: { x: 50, y: 50 },
    _imageFile: null, _imagePreview: '',
  }])

  const update = (i, key, val) => {
    const next = [...variants]
    next[i] = { ...next[i], [key]: val }
    onChange(next)
  }

  const remove = (i) => onChange(variants.filter((_, idx) => idx !== i))

  return (
    <div className="flex flex-col gap-3">
      {variants.map((v, i) => (
        <div key={i} className="bg-surface rounded-xl p-3 border border-surface-2 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">Variant {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-red-400 text-xs hover:text-red-500 transition-colors">Remove</button>
          </div>
          <input
            value={v.name}
            onChange={(e) => update(i, 'name', e.target.value)}
            placeholder="Name (e.g. Special Mocha)"
            required
            className="input-field"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              value={v.price}
              onChange={(e) => update(i, 'price', e.target.value)}
              placeholder="Price"
              type="number"
              step="0.01"
              min="0"
              required
              className="input-field"
              onWheel={(e) => e.target.blur()}
            />
            <select
              value={v.priceCurrency}
              onChange={(e) => update(i, 'priceCurrency', e.target.value)}
              className="input-field"
            >
              {CURRENCY_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <ImageUploader
            label="Photo (optional)"
            preview={v._imagePreview}
            onChange={(e) => {
              const file = e.target.files[0]
              if (!file) return
              const next = [...variants]
              next[i] = { ...next[i], _imageFile: file, _imagePreview: URL.createObjectURL(file) }
              onChange(next)
            }}
            onRemove={() => {
              const next = [...variants]
              next[i] = { ...next[i], _imageFile: null, _imagePreview: '', imageUrl: '' }
              onChange(next)
            }}
            position={v.imagePosition}
            onPositionChange={(pos) => update(i, 'imagePosition', pos)}
          />
        </div>
      ))}
      <button type="button" onClick={addVariant} className="btn-secondary text-xs">+ Add Variant</button>
    </div>
  )
}

function ItemForm({ initial, categories, onSave, onCancel }) {
  const hasInitialVariants = initial?.variants?.length > 0

  const [form, setForm] = useState({
    name_en: initial?.name_en ?? '',
    description_en: initial?.description_en ?? '',
    price: initial?.price ?? '',
    priceCurrency: initial?.priceCurrency ?? 'USD',
    status: initial?.status ?? 'available',
    categoryId: initial?.categoryId ?? (categories[0]?.id ?? ''),
    imageUrl: initial?.imageUrl ?? '',
    imagePosition: initial?.imagePosition ?? { x: 50, y: 50 },
    isBestSeller: initial?.isBestSeller ?? false,
  })
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(initial?.imageUrl ?? '')
  const [error, setError] = useState('')
  const [showVariants, setShowVariants] = useState(hasInitialVariants)
  const [variants, setVariants] = useState(
    hasInitialVariants
      ? initial.variants.map((v) => ({ ...v, _imageFile: null, _imagePreview: v.imageUrl ?? '' }))
      : []
  )

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview('')
    setForm((f) => ({ ...f, imageUrl: '' }))
  }

  const toggleVariants = () => {
    setShowVariants((prev) => {
      if (!prev && variants.length === 0) {
        setVariants([{ name: '', price: '', priceCurrency: 'USD', imageUrl: '', imagePosition: { x: 50, y: 50 }, _imageFile: null, _imagePreview: '' }])
      }
      return !prev
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (showVariants && variants.length > 0) {
        const processedVariants = await Promise.all(
          variants.map(async (v) => {
            let imageUrl = v.imageUrl
            if (v._imageFile) imageUrl = await compressImage(v._imageFile)
            return { name: v.name, price: parseFloat(v.price), priceCurrency: v.priceCurrency, imageUrl, imagePosition: v.imagePosition }
          })
        )
        await onSave({ ...form, price: 0, imageUrl: '', variants: processedVariants })
      } else {
        let imageUrl = form.imageUrl
        if (imageFile) imageUrl = await compressImage(imageFile)
        await onSave({ ...form, price: parseFloat(form.price), imageUrl, variants: [] })
      }
    } catch (err) {
      setError(err.message || 'Upload failed. Check Firebase Storage rules.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-bg rounded-2xl p-4 border border-surface-2 flex flex-col gap-3">
      <input value={form.name_en} onChange={set('name_en')} placeholder="Item Name" required className="input-field" />
      <input value={form.description_en} onChange={set('description_en')} placeholder="Description" className="input-field" />

      {!showVariants && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <input value={form.price} onChange={set('price')} placeholder="Price" type="number" step="0.01" min="0" required className="input-field" onWheel={(e) => e.target.blur()} />
            <select value={form.priceCurrency} onChange={set('priceCurrency')} className="input-field">
              {CURRENCY_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <select value={form.status} onChange={set('status')} className="input-field">
              {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <ImageUploader
            label="Item Photo (optional)"
            preview={imagePreview}
            onChange={handleImage}
            onRemove={removeImage}
            position={form.imagePosition}
            onPositionChange={(pos) => setForm((f) => ({ ...f, imagePosition: pos }))}
          />
        </>
      )}

      {showVariants && (
        <select value={form.status} onChange={set('status')} className="input-field">
          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      )}

      <select value={form.categoryId} onChange={set('categoryId')} required className="input-field">
        <option value="">Select category</option>
        {categories.map((c) => <option key={c.id} value={c.id}>{c.name_en}</option>)}
      </select>

      <button
        type="button"
        onClick={toggleVariants}
        className={`text-xs font-medium rounded-lg px-3 py-2 border transition-all text-left ${showVariants ? 'border-brown/40 text-brown bg-brown/5' : 'border-surface-2 text-text-muted hover:bg-surface-2'}`}
      >
        {showVariants ? '✕ Remove sizes / variants' : '+ Add sizes / variants'}
      </button>

      {showVariants && <VariantEditor variants={variants} onChange={setVariants} />}

      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={form.isBestSeller}
          onChange={(e) => setForm((f) => ({ ...f, isBestSeller: e.target.checked }))}
          className="w-4 h-4 accent-brown"
        />
        <span className="text-sm text-text">Mark as Best Seller ⭐</span>
      </label>

      {error && <p className="text-red-500 text-xs px-1">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="btn-primary flex-1">{saving ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">Cancel</button>
      </div>
    </form>
  )
}

function SortableItem({ item, categories, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
  const [confirmDelete, setConfirmDelete] = useState(false)
  const cat = categories.find((c) => c.id === item.categoryId)
  const hasVariants = item.variants?.length > 0

  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }

  return (
    <div ref={setNodeRef} style={style} className="bg-surface rounded-xl border border-surface-2 flex items-center gap-3 px-4 py-3">
      <span {...attributes} {...listeners} className="text-text-light cursor-grab active:cursor-grabbing text-lg select-none">⠿</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-text font-medium text-sm truncate">{item.name_en}</p>
          {item.isBestSeller && <span className="text-xs">⭐</span>}
          {hasVariants && <span className="text-xs text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">variants</span>}
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[item.status]}`}>
            {STATUS_OPTIONS.find(s => s.value === item.status)?.label}
          </span>
        </div>

        <p className="text-text-light text-xs mt-0.5">
          {hasVariants
            ? item.variants.map((v) => v.name).join(' · ')
            : item.priceCurrency === 'USD' ? `$${item.price}` : `${item.price.toLocaleString()} ل.ل`
          }
          {cat && <span className="ml-2 opacity-60">· {cat.name_en}</span>}
        </p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button onClick={() => onEdit(item)} className="text-text-muted hover:text-brown text-sm px-2 py-1 rounded-lg hover:bg-surface-2 transition-all">Edit</button>
        {confirmDelete ? (
          <div className="flex gap-1">
            <button onClick={() => onDelete(item.id)} className="text-red-500 text-xs px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100">Yes</button>
            <button onClick={() => setConfirmDelete(false)} className="text-text-muted text-xs px-2 py-1 rounded-lg hover:bg-surface-2">No</button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="text-text-light hover:text-red-400 text-sm px-2 py-1 rounded-lg hover:bg-surface-2 transition-all">Del</button>
        )}
      </div>
    </div>
  )
}

export default function ItemManager() {
  const { categories, items, addItem, updateItem, deleteItem, reorderItems } = useMenu()
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState(null)
  const [filterCat, setFilterCat] = useState('all')

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const displayedItems = filterCat === 'all' ? items : items.filter((i) => i.categoryId === filterCat)

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIdx = displayedItems.findIndex((i) => i.id === active.id)
      const newIdx = displayedItems.findIndex((i) => i.id === over.id)
      reorderItems(arrayMove(displayedItems, oldIdx, newIdx))
    }
  }

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-playfair text-brown text-2xl font-bold">Items</h2>
        <button onClick={() => { setShowAdd(true); setEditing(null) }} className="btn-primary text-sm">+ Add Item</button>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
        {[{ id: 'all', name_en: 'All' }, ...categories].map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterCat(c.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filterCat === c.id ? 'bg-brown text-white' : 'bg-surface text-text-muted border border-surface-2 hover:bg-surface-2'}`}
          >
            {c.name_en}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showAdd && !editing && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 overflow-hidden">
            <ItemForm categories={categories} onSave={async (data) => { await addItem(data); setShowAdd(false) }} onCancel={() => setShowAdd(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {displayedItems.length === 0 ? (
        <p className="text-text-muted text-sm py-8 text-center">No items yet.</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={displayedItems.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {displayedItems.map((item) => (
                editing?.id === item.id ? (
                  <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <ItemForm
                      initial={item}
                      categories={categories}
                      onSave={async (data) => { await updateItem(item.id, data); setEditing(null) }}
                      onCancel={() => setEditing(null)}
                    />
                  </motion.div>
                ) : (
                  <SortableItem
                    key={item.id}
                    item={item}
                    categories={categories}
                    onEdit={(i) => { setEditing(i); setShowAdd(false) }}
                    onDelete={deleteItem}
                  />
                )
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
