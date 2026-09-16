import { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

const CurrencyContext = createContext()

const DEFAULT_RATE = 90000

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD')
  const [exchangeRate, setExchangeRate] = useState(DEFAULT_RATE)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'exchange'), (snap) => {
      if (snap.exists()) setExchangeRate(snap.data().rate ?? DEFAULT_RATE)
    })
    return unsub
  }, [])

  const toggleCurrency = () => setCurrency((c) => (c === 'USD' ? 'LL' : 'USD'))

  const format = (price, priceCurrency) => {
    let usdPrice = priceCurrency === 'USD' ? price : price / exchangeRate

    if (currency === 'USD') {
      return `$${usdPrice.toFixed(2)}`
    } else {
      const llPrice = priceCurrency === 'LL' ? price : price * exchangeRate
      return `${llPrice.toLocaleString()} ل.ل`
    }
  }

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, exchangeRate, format }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)
