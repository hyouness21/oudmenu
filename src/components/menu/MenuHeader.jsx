import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'

export default function MenuHeader() {
  const { lang, toggleLanguage } = useLanguage()
  const { currency, toggleCurrency } = useCurrency()

  return (
    <header className="sticky top-0 z-30 bg-[#FBF5EB]/95 backdrop-blur-sm border-b border-surface-2 shadow-sm">
      <div className="flex items-center justify-between px-5 h-14">

        {/* Logo — left */}
        <Link to="/admin">
          <Logo variant="dark" className="h-8 w-auto" />
        </Link>

        {/* Actions — right */}
        <div className="flex items-center gap-3">
          <button onClick={toggleLanguage} className="text-sm">
            <span className={`transition-all ${lang === 'en' ? 'font-bold text-brown' : 'text-text-muted'}`}>EN</span>
            <span className="text-text-light mx-1.5">|</span>
            <span className={`font-cairo transition-all ${lang === 'ar' ? 'font-bold text-brown' : 'text-text-muted'}`}>ع</span>
          </button>

          <div className="w-px h-4 bg-surface-2" />

          <button
            onClick={toggleCurrency}
            className="text-sm font-semibold border border-brown/30 text-brown rounded-full px-3 py-1 hover:bg-brown hover:text-white transition-all"
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
