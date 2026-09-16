import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'
import DallahDecoration from './DallahDecoration'
import IslamicPattern from '../shared/IslamicPattern'

export default function MenuHeader() {
  const { lang, toggleLanguage, isRTL } = useLanguage()
  const { currency, toggleCurrency } = useCurrency()

  return (
    <header className="relative bg-brown overflow-hidden">
      <IslamicPattern opacity={0.05} color="#C9A84C" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-green/10 blur-3xl pointer-events-none" />

      {/* Top controls */}
      <div className={`relative flex justify-between items-center px-5 pt-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white/90 rounded-full px-4 py-2 text-sm transition-all border border-white/15 backdrop-blur-sm"
        >
          <span className={`transition-all ${lang === 'en' ? 'font-bold text-gold' : 'opacity-50'}`}>EN</span>
          <span className="opacity-30 text-xs">|</span>
          <span className={`transition-all font-cairo ${lang === 'ar' ? 'font-bold text-gold' : 'opacity-50'}`}>ع</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={toggleCurrency}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white/90 rounded-full px-4 py-2 text-sm transition-all border border-white/15 backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currency}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="font-semibold text-gold"
            >
              {currency === 'USD' ? '$ USD' : 'ل.ل LBP'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Main hero area */}
      <div className="relative flex flex-col items-center pt-4 pb-10 px-6">
        {/* Dallah left */}
        <motion.div
          className="absolute left-0 bottom-0 opacity-20"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <DallahDecoration className="w-28 -scale-x-100" />
        </motion.div>

        {/* Dallah right */}
        <motion.div
          className="absolute right-0 bottom-0 opacity-20"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <DallahDecoration className="w-28" />
        </motion.div>

        {/* Center dallah */}
        <motion.div
          className="absolute right-1/2 translate-x-1/2 bottom-2 opacity-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <DallahDecoration className="w-56" />
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mb-3"
        >
          <Link to="/admin">
          <Logo variant="white" className="w-56 max-w-xs" />
        </Link>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`relative z-10 text-white/50 text-xs tracking-[0.25em] uppercase font-lato ${lang === 'ar' ? 'font-cairo tracking-normal' : ''}`}
        >
          {lang === 'ar' ? 'قائمة الطعام والمشروبات' : 'Coffee & More'}
        </motion.p>
      </div>

      {/* Arch bottom */}
      <div className="relative h-6 bg-brown">
        <div
          className="absolute bottom-0 left-0 right-0 h-10 bg-bg"
          style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}
        />
      </div>
    </header>
  )
}
