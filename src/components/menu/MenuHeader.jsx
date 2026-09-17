import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'

export default function MenuHeader() {
  const { lang, toggleLanguage } = useLanguage()
  const { currency, toggleCurrency } = useCurrency()

  return (
    <header className="sticky top-0 z-30 bg-[#1A0D06] border-b border-white/5">
      <div className="relative flex items-center justify-between px-5 h-14">

        <button onClick={toggleLanguage} className="text-sm z-10">
          <span className={`transition-all ${lang === 'en' ? 'font-bold text-gold' : 'text-white/35'}`}>EN</span>
          <span className="text-white/15 mx-1.5">|</span>
          <span className={`font-cairo transition-all ${lang === 'ar' ? 'font-bold text-gold' : 'text-white/35'}`}>ع</span>
        </button>

        <Link to="/admin" className="absolute left-1/2 -translate-x-1/2">
          <Logo variant="white" className="h-7 w-auto" />
        </Link>

        <button onClick={toggleCurrency} className="text-sm font-semibold z-10 min-w-[52px] text-right">
          <AnimatePresence mode="wait">
            <motion.span
              key={currency}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="text-gold"
            >
              {currency === 'USD' ? '$USD' : 'ل.ل'}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </header>
  )
}
