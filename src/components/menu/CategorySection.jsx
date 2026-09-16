import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTranslation } from 'react-i18next'
import ItemCard from './ItemCard'

function OrnamentDivider({ name, isRTL, isArabic }) {
  return (
    <div className={`flex items-center gap-3 px-4 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {/* Left line */}
      <div className="flex-shrink-0 flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-gold/40" />
        <div className="w-8 h-px bg-gradient-to-r from-gold/40 to-transparent" />
      </div>

      {/* Category name with arch above */}
      <div className="relative flex flex-col items-center">
        {/* Arch decoration */}
        <div className="w-10 h-5 border-t-2 border-l-2 border-r-2 border-gold/30 rounded-t-full mb-0.5" />
        <h2 className={`text-brown font-bold text-lg whitespace-nowrap ${isArabic ? 'font-cairo' : 'font-playfair'}`}>
          {name}
        </h2>
      </div>

      {/* Right line */}
      <div className="flex-shrink-0 flex items-center gap-1">
        <div className="w-8 h-px bg-gradient-to-l from-gold/40 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-gold/40" />
      </div>

      <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
    </div>
  )
}

export default function CategorySection({ category, items }) {
  const { lang, isRTL } = useLanguage()
  const { t } = useTranslation()
  const name = lang === 'ar' ? category.name_ar : category.name_en

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mb-10"
    >
      <OrnamentDivider name={name} isRTL={isRTL} isArabic={lang === 'ar'} />

      {items.length === 0 ? (
        <p className={`text-text-muted text-sm px-4 ${lang === 'ar' ? 'font-cairo text-right' : ''}`}>
          {t('no_items')}
        </p>
      ) : (
        <div className="px-4 flex flex-col gap-3">
          {items.map((item, idx) => (
            <ItemCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      )}
    </motion.section>
  )
}
