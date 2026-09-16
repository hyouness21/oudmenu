import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCurrency } from '../../contexts/CurrencyContext'

const statusConfig = {
  unavailable: { en: 'Unavailable', ar: 'غير متوفر', classes: 'bg-text-light/20 text-text-light' },
  coming_soon: { en: 'Coming Soon', ar: 'قريباً', classes: 'bg-gold/20 text-gold border border-gold/40' },
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3), ease: 'easeOut' }}
      className={`relative bg-white rounded-2xl overflow-hidden border transition-all duration-300
        ${isUnavailable ? 'opacity-50' : 'border-surface-2 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10'}
        ${isComingSoon ? 'border-gold/20' : ''}
      `}
    >
      {/* Item image */}
      {hasImage && (
        <div className="w-full h-40 overflow-hidden">
          <motion.img
            src={item.imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 h-40 bg-gradient-to-b from-transparent via-transparent to-surface/80" />
        </div>
      )}

      <div className="p-4">
        {/* Status badge */}
        {badge && (
          <span className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} text-xs font-medium px-2.5 py-1 rounded-full ${badge.classes}`}>
            {lang === 'ar' ? badge.ar : badge.en}
          </span>
        )}

        <div className={`flex justify-between items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-text text-base leading-snug mb-1 ${lang === 'ar' ? 'font-cairo' : 'font-playfair'}`}>
              {name}
            </h3>
            {description && (
              <p className={`text-text-muted text-sm leading-relaxed ${lang === 'ar' ? 'font-cairo' : ''}`}>
                {description}
              </p>
            )}
          </div>

          {!isComingSoon && (
            <div className={`flex-shrink-0 ${isRTL ? 'text-left' : 'text-right'}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currency}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="bg-brown/8 rounded-xl px-3 py-1.5 text-center"
                >
                  <span className="text-brown font-bold text-sm whitespace-nowrap">
                    {format(item.price, item.priceCurrency)}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Bottom gold accent line */}
      {!isUnavailable && !isComingSoon && (
        <div className="h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      )}
    </motion.div>
  )
}
