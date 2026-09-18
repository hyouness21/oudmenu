import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'

export default function MenuHeader() {
  const { lang, toggleLanguage } = useLanguage()
  const { currency, toggleCurrency } = useCurrency()

  return (
    <header className="sticky top-0 z-30 bg-[#120C05]/60 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-5 h-14">

        {/* Logo — left */}
        <Link to="/admin">
          <Logo variant="white" className="h-8 w-auto" />
        </Link>

        {/* Actions — right */}
        <div className="flex items-center gap-3">
          <button onClick={toggleLanguage} className="text-sm">
            <span className={`transition-all ${lang === 'en' ? 'font-bold text-gold' : 'text-white/40'}`}>EN</span>
            <span className="text-white/20 mx-1.5">|</span>
            <span className={`font-cairo transition-all ${lang === 'ar' ? 'font-bold text-gold' : 'text-white/40'}`}>ع</span>
          </button>

          <div className="w-px h-4 bg-white/15" />

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
