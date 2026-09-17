import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import ItemCard from './ItemCard'

export default function CategorySection({ category, items }) {
  const { lang } = useLanguage()
  const name = lang === 'ar' ? category.name_ar : category.name_en

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      {/* Section heading */}
      <div className="flex items-center gap-3 px-4 mb-4">
        <div className="flex-1 h-px bg-gold/20" />
        <h2 className={`text-brown font-bold text-base whitespace-nowrap ${lang === 'ar' ? 'font-cairo' : 'font-playfair'}`}>
          {name}
        </h2>
        <div className="flex-1 h-px bg-gold/20" />
      </div>

      {items.length === 0 ? (
        <p className={`text-text-muted text-sm px-4 ${lang === 'ar' ? 'font-cairo text-right' : ''}`}>
          No items yet.
        </p>
      ) : (
        <div className="px-4 grid grid-cols-2 gap-3">
          {items.map((item, idx) => (
            <ItemCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      )}
    </motion.section>
  )
}
