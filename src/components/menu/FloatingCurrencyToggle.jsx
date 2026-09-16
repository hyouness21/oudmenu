import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCurrency } from '../../contexts/CurrencyContext'

export default function FloatingCurrencyToggle() {
  const { currency, toggleCurrency } = useCurrency()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 180)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="float-currency"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={toggleCurrency}
          className="fixed bottom-12 right-4 z-50 bg-brown text-white rounded-full px-4 py-2.5 shadow-xl border border-white/10 flex items-center gap-2 text-sm font-semibold"
          whileTap={{ scale: 0.93 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currency}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
            >
              {currency === 'USD' ? '$ USD' : 'ل.ل LBP'}
            </motion.span>
          </AnimatePresence>
          <span className="text-white/40 text-xs">⇅</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
