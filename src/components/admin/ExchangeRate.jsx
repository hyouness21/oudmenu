import { useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '../../firebase/config'
import { doc, setDoc } from 'firebase/firestore'
import { useCurrency } from '../../contexts/CurrencyContext'

export default function ExchangeRate() {
  const { exchangeRate } = useCurrency()
  const [rate, setRate] = useState(exchangeRate)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    await setDoc(doc(db, 'settings', 'exchange'), { rate: parseFloat(rate) })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-6 max-w-sm">
      <h2 className="font-playfair text-brown text-2xl font-bold mb-2">Exchange Rate</h2>
      <p className="text-text-muted text-sm mb-6">Set the Lebanese Lira rate per 1 USD. Default: 90,000 ل.ل</p>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium">$1 =</span>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            min="1"
            required
            className="input-field pl-16 text-lg font-semibold"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-cairo">ل.ل</span>
        </div>

        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving...' : 'Save Rate'}
        </button>

        {saved && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-green-dark text-sm text-center font-medium">
            ✓ Rate saved successfully
          </motion.p>
        )}
      </form>

      <div className="mt-8 bg-surface rounded-2xl p-4 border border-surface-2">
        <p className="text-text-muted text-xs font-medium uppercase tracking-wider mb-3">Preview</p>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">$1.00</span>
            <span className="text-brown font-semibold font-cairo">{parseFloat(rate || 0).toLocaleString()} ل.ل</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">$5.00</span>
            <span className="text-brown font-semibold font-cairo">{(parseFloat(rate || 0) * 5).toLocaleString()} ل.ل</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">$10.00</span>
            <span className="text-brown font-semibold font-cairo">{(parseFloat(rate || 0) * 10).toLocaleString()} ل.ل</span>
          </div>
        </div>
      </div>
    </div>
  )
}
