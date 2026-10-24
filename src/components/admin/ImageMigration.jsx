// One-time tool: moves item and background photos stored inside Firestore
// (base64 "data:" text) to Vercel Blob and saves only their links. Category
// photos aren't shown on the menu, so they are removed instead. Safe to run more than once:
// photos that are already links are skipped.
// Open it at /admin/dashboard/migrate-images. It is not linked in the sidebar.
import { useState } from 'react'
import { collection, doc, getDocsFromServer, getDocFromServer, updateDoc, deleteField } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { uploadImage } from '../../utils/uploadImage'

const isData = (url) => typeof url === 'string' && url.startsWith('data:')
const kb = (n) => `${Math.round(n / 1024)} KB`

async function readAll() {
  const [cats, items, appearance] = await Promise.all([
    getDocsFromServer(collection(db, 'categories')),
    getDocsFromServer(collection(db, 'items')),
    getDocFromServer(doc(db, 'settings', 'appearance')),
  ])
  return {
    categories: cats.docs.map((d) => ({ id: d.id, ...d.data() })),
    items: items.docs.map((d) => ({ id: d.id, ...d.data() })),
    appearance: appearance.exists() ? appearance.data() : null,
  }
}

function countPending(data) {
  let n = 0
  data.items.forEach((i) => {
    if (isData(i.imageUrl)) n++
    ;(i.variants || []).forEach((v) => { if (isData(v.imageUrl)) n++ })
  })
  if (isData(data.appearance?.heroBg?.imageUrl)) n++
  return n
}

export default function ImageMigration() {
  const [backedUp, setBackedUp] = useState(false)
  const [running, setRunning] = useState(false)
  const [log, setLog] = useState([])
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const add = (line) => setLog((l) => [...l, line])

  const downloadBackup = async () => {
    setLog([])
    add('Reading the database…')
    const data = await readAll()
    const json = JSON.stringify({ exportedAt: new Date().toISOString(), ...data })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }))
    a.download = `oud-menu-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    add(`Backup downloaded (${kb(json.length)}). Keep this file safe.`)
    add(`${countPending(data)} photos still need to be moved.`)
    const catPhotos = data.categories.filter((c) => c.imageUrl).length
    if (catPhotos) add(`${catPhotos} category photos will be removed (they aren't shown on the menu).`)
    setBackedUp(true)
  }

  const migrate = async () => {
    setRunning(true)
    let failed = 0
    try {
      const data = await readAll()
      const total = countPending(data)
      let done = 0
      setProgress({ done, total })
      add(`Moving ${total} photos…`)

      const move = async (label, dataUrl, opts) => {
        try {
          const url = await uploadImage(dataUrl, opts)
          add(`✓ ${label}`)
          return url
        } catch (err) {
          failed++
          add(`✗ ${label}: ${err.message}`)
          return null
        } finally {
          setProgress({ done: ++done, total })
        }
      }

      const withPhoto = data.categories.filter((c) => c.imageUrl || c.imagePosition)
      for (const c of withPhoto) {
        await updateDoc(doc(db, 'categories', c.id), { imageUrl: deleteField(), imagePosition: deleteField() })
      }
      if (withPhoto.length) add(`✓ Removed photos from ${withPhoto.length} categories`)

      for (const item of data.items) {
        const changes = {}
        if (isData(item.imageUrl)) {
          const url = await move(`Item: ${item.name_en}`, item.imageUrl, { folder: 'items' })
          if (url) changes.imageUrl = url
        }
        if (item.variants?.some((v) => isData(v.imageUrl))) {
          const variants = []
          for (const v of item.variants) {
            if (!isData(v.imageUrl)) { variants.push(v); continue }
            const url = await move(`Item: ${item.name_en} (${v.name})`, v.imageUrl, { folder: 'items' })
            variants.push(url ? { ...v, imageUrl: url } : v)
          }
          changes.variants = variants
        }
        if (Object.keys(changes).length) await updateDoc(doc(db, 'items', item.id), changes)
      }

      const hero = data.appearance?.heroBg
      if (isData(hero?.imageUrl)) {
        const url = await move('Background photo', hero.imageUrl, { folder: 'appearance', maxWidth: 1200, quality: 0.8 })
        if (url) await updateDoc(doc(db, 'settings', 'appearance'), { 'heroBg.imageUrl': url })
      }

      add(failed
        ? `Finished with ${failed} error(s). Press the button again to retry the failed ones.`
        : 'All done. Every photo is now a link.')
    } catch (err) {
      add(`Stopped: ${err.message}`)
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="font-playfair text-2xl text-brown font-bold mb-2">Move photos (one time)</h2>
      <p className="text-text-muted text-sm mb-6">
        Moves menu photos out of the database so the menu opens faster. Don't edit the menu while this runs.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button type="button" onClick={downloadBackup} disabled={running} className="btn-secondary flex-1">
          1. Download backup
        </button>
        <button type="button" onClick={migrate} disabled={!backedUp || running} className="btn-primary flex-1">
          {running ? `Moving… ${progress.done}/${progress.total}` : '2. Move photos'}
        </button>
      </div>

      {log.length > 0 && (
        <pre className="bg-surface border border-surface-2 rounded-xl p-4 text-xs whitespace-pre-wrap max-h-96 overflow-auto">
          {log.join('\n')}
        </pre>
      )}
    </div>
  )
}
