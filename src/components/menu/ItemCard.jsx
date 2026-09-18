import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCurrency } from '../../contexts/CurrencyContext'

const statusConfig = {
  unavailable: { en: 'Unavailable', ar: 'غير متوفر', classes: 'bg-black/50 text-white/80' },
  coming_soon: { en: 'Coming Soon', ar: 'قريباً', classes: 'bg-gold text-brown font-semibold' },
}

export default function ItemCard({ item, index }) {
  const { lang, isRTL } = useLanguage()
  const { format, currency } = useCurrency()

  const name = lang === 'ar' ? item.name_ar : item.name_en
  const description = lang === 'ar' ? item.description_ar : item.description_en
  const isUnavailable = item.status === 'unavailable'
  const isComingSoon = item.status === 'coming_soon'
  const badge = statusConfig[item.status]
  const hasImage = !!item.imageUrl

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.2), ease: 'easeOut' }}
      className={`bg-white rounded-2xl overflow-hidden border border-surface-2 transition-all duration-300
        ${isUnavailable ? 'opacity-50' : 'hover:shadow-lg hover:border-gold/30'}
      `}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden bg-surface">
        {hasImage ? (
          <img src={item.imageUrl} alt={name} className="w-full h-full object-cover" style={{ objectPosition: `${item.imagePosition?.x ?? 50}% ${item.imagePosition?.y ?? 50}%` }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-surface-2">
            <span className="text-4xl opacity-10">☕</span>
          </div>
        )}
        {hasImage && <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />}
        {badge && (
          <span className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} text-xs px-2 py-0.5 rounded-full ${badge.classes}`}>
            {lang === 'ar' ? badge.ar : badge.en}
          </span>
        )}
      </div>

      {/* Content */}
      <div className={`p-3 ${isRTL ? 'text-right' : ''}`}>
        <h3 className={`font-semibold text-text text-sm leading-snug ${lang === 'ar' ? 'font-cairo' : 'font-playfair'}`}>
          {name}
        </h3>
        {description && (
          <p className={`text-text-muted text-xs mt-0.5 leading-relaxed line-clamp-2 ${lang === 'ar' ? 'font-cairo' : ''}`}>
            {description}
          </p>
        )}
        {!isComingSoon && (
          <AnimatePresence mode="wait">
            <motion.p
              key={currency}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-brown font-bold text-sm mt-2"
            >
              {format(item.price, item.priceCurrency)}
            </motion.p>
          </AnimatePresence>
        )}
      </div>

      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </motion.div>
  )
}
