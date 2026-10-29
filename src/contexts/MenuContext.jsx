import { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase/config'
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc,
  doc, writeBatch, query, orderBy, setDoc,
} from 'firebase/firestore'

const MenuContext = createContext()

export function MenuProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [settings, setSettings] = useState({})
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [settingsLoading, setSettingsLoading] = useState(true)

  useEffect(() => {
    // Fallback: if server data hasn't arrived within 4 s (offline / very slow),
    // unlock the loading flags so the menu still opens with cached data.
    const t1 = setTimeout(() => setCategoriesLoading(false), 4000)
    const t2 = setTimeout(() => setLoading(false), 4000)
    const t3 = setTimeout(() => setSettingsLoading(false), 4000)

    const unsub1 = onSnapshot(
      query(collection(db, 'categories'), orderBy('order')),
      { includeMetadataChanges: true },
      (snap) => {
        setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        if (!snap.metadata.fromCache) { clearTimeout(t1); setCategoriesLoading(false) }
      }
    )
    const unsub2 = onSnapshot(
      query(collection(db, 'items'), orderBy('order')),
      { includeMetadataChanges: true },
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        if (!snap.metadata.fromCache) { clearTimeout(t2); setLoading(false) }
      }
    )
    const unsub3 = onSnapshot(
      doc(db, 'settings', 'appearance'),
      { includeMetadataChanges: true },
      (snap) => {
        if (snap.exists()) setSettings(snap.data())
        if (!snap.metadata.fromCache) { clearTimeout(t3); setSettingsLoading(false) }
      }
    )

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      unsub1(); unsub2(); unsub3()
    }
  }, [])

  const addCategory = (data) =>
    addDoc(collection(db, 'categories'), { ...data, order: categories.length })

  const updateCategory = (id, data) => updateDoc(doc(db, 'categories', id), data)

  const deleteCategory = async (id) => {
    const batch = writeBatch(db)
    batch.delete(doc(db, 'categories', id))
    items.filter((i) => i.categoryId === id).forEach((i) => batch.delete(doc(db, 'items', i.id)))
    return batch.commit()
  }

  const reorderCategories = async (ordered) => {
    const batch = writeBatch(db)
    ordered.forEach((cat, idx) => batch.update(doc(db, 'categories', cat.id), { order: idx }))
    return batch.commit()
  }

  const addItem = (data) =>
    addDoc(collection(db, 'items'), { ...data, order: items.filter((i) => i.categoryId === data.categoryId).length })

  const updateItem = (id, data) => updateDoc(doc(db, 'items', id), data)

  const deleteItem = (id) => deleteDoc(doc(db, 'items', id))

  const reorderItems = async (ordered) => {
    const batch = writeBatch(db)
    ordered.forEach((item, idx) => batch.update(doc(db, 'items', item.id), { order: idx }))
    return batch.commit()
  }

  const itemsByCategory = (catId) =>
    items.filter((i) => i.categoryId === catId && !i.isOudBox).sort((a, b) => a.order - b.order)

  const updateSettings = (data) =>
    setDoc(doc(db, 'settings', 'appearance'), data, { merge: true })

  return (
    <MenuContext.Provider value={{
      categories, items, settings, loading, categoriesLoading, settingsLoading,
      addCategory, updateCategory, deleteCategory, reorderCategories,
      addItem, updateItem, deleteItem, reorderItems, itemsByCategory,
      updateSettings,
    }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => useContext(MenuContext)
