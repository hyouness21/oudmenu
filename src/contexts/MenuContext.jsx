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
    const unsub1 = onSnapshot(
      query(collection(db, 'categories'), orderBy('order')),
      (snap) => {
        setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        setCategoriesLoading(false)
      }
    )
    const unsub2 = onSnapshot(
      query(collection(db, 'items'), orderBy('order')),
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        setLoading(false)
      }
    )
    const unsub3 = onSnapshot(doc(db, 'settings', 'appearance'), (snap) => {
      if (snap.exists()) setSettings(snap.data())
      setSettingsLoading(false)
    })
    return () => { unsub1(); unsub2(); unsub3() }
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
    items.filter((i) => i.categoryId === catId).sort((a, b) => a.order - b.order)

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
