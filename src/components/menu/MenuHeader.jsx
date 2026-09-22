import { AnimatePresence, motion } from 'framer-motion'
import { useCurrency } from '../../contexts/CurrencyContext'
import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'

export default function MenuHeader() {
  const { currency, toggleCurrency } = useCurrency()

  return (
    <header className="sticky top-0 z-30 bg-[#120C05]/25 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-5 h-14">

        {/* Logo — left */}
        <Link to="/admin">
          <Logo variant="white" className="h-8 w-auto" />
        </Link>

        {/* Actions — right */}
        <div className="flex items-center gap-3">

          <button
            onClick={toggleCurrency}
            className="text-sm font-semibold border border-gold/40 text-gold rounded-full px-3 py-1 hover:bg-gold hover:text-brown transition-all"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currency}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
              >
                {currency === 'USD' ? '$USD' : 'ل.ل'}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

      </div>
    </header>
  )
}
