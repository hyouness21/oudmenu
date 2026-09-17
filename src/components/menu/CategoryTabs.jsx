import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTranslation } from 'react-i18next'

export default function CategoryTabs({ categories, activeId, onSelect }) {
  const { lang } = useLanguage()
  const { t } = useTranslation()
  const scrollRef = useRef(null)

  const tabs = [{ id: 'all', name_en: t('all'), name_ar: t('all') }, ...categories]

  const handleSelect = (id, el) => {
    onSelect(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <div className="border-b border-gold/15" style={{ background: '#FBF5EB' }}>
      {/* Gold top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div
        ref={scrollRef}
        className="flex gap-0 overflow-x-auto no-scrollbar"
      >
        {tabs.map((cat, i) => {
          const isActive = activeId === cat.id
          const label = lang === 'ar' ? cat.name_ar : cat.name_en

          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.96 }}
              onClick={(e) => handleSelect(cat.id, e.currentTarget)}
              className={`relative flex-shrink-0 px-5 py-4 text-sm transition-all duration-300
                ${lang === 'ar' ? 'font-cairo' : 'font-lato tracking-wide'}
                ${isActive
                  ? 'text-brown font-bold'
                  : 'text-text-muted font-medium hover:text-text'
                }`}
            >
              {/* Active gold underline indicator */}
              {isActive && (
                <motion.div
                  layoutId="categoryIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brown to-transparent"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}

              {/* Active dot above text */}
              {isActive && (
                <motion.div
                  layoutId="categoryDot"
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}

              <span className="relative z-10">{label}</span>

              {/* Separator between tabs */}
              {i < tabs.length - 1 && !isActive && activeId !== tabs[i + 1]?.id && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-px bg-surface-2" />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Gold bottom line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
  )
}
