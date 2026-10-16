import { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

const CurrencyContext = createContext()

const DEFAULT_RATE = 90000

export function CurrencyProvider({ children }) {
  const [exchangeRate, setExchangeRate] = useState(DEFAULT_RATE)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'exchange'), (snap) => {
      if (snap.exists()) setExchangeRate(snap.data().rate ?? DEFAULT_RATE)
    })
    return unsub
  }, [])

  const format = (price, priceCurrency) => {
    const llPrice = priceCurrency === 'LL' ? price : price * exchangeRate
    return `${llPrice.toLocaleString()} ل.ل`
  }

  return (
    <CurrencyContext.Provider value={{ format }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)
