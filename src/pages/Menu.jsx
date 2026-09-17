import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMenu } from '../contexts/MenuContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useCurrency } from '../contexts/CurrencyContext'
import MenuHeader from '../components/menu/MenuHeader'
import CategoryCarousel from '../components/menu/CategoryCarousel'
import FloatingCurrencyToggle from '../components/menu/FloatingCurrencyToggle'
import DallahDecoration from '../components/menu/DallahDecoration'
import IslamicPattern from '../components/shared/IslamicPattern'
import Logo from '../components/shared/Logo'
import './menu.css'

/* ── Hero ──────────────────────────────────────────────── */
function HeroSection({ lang }) {
  return (
    <section className="relative bg-[#120C05] overflow-hidden">
      <IslamicPattern opacity={0.04} color="#C9A84C" />

      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none"
        animate={{ y: [0, -18, 0, 18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-4 right-0 w-56 h-56 rounded-full bg-green/10 blur-3xl pointer-events-none"
        animate={{ y: [0, 14, 0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      <div className="absolute left-0 bottom-8 opacity-15 pointer-events-none">
        <DallahDecoration className="w-24 -scale-x-100" />
      </div>
      <div className="absolute right-0 bottom-8 opacity-15 pointer-events-none">
        <DallahDecoration className="w-24" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center py-10 px-6 text-center">
        <Link to="/admin">
          <Logo variant="white" className="w-48 max-w-xs mb-3" />
        </Link>
        <p className={`text-white/40 text-xs tracking-[0.25em] uppercase ${lang === 'ar' ? 'font-cairo tracking-normal' : 'font-lato'}`}>
          {lang === 'ar' ? 'قائمة الطعام والمشروبات' : 'Coffee & More'}
        </p>
      </div>

      <div className="relative h-8 bg-[#120C05]">
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#FBF5EB]"
          style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }} />
      </div>
    </section>
  )
}

/* ── Category home (carousel) ──────────────────────────── */
function CategoryHome({ categories, loading, onSelect, lang }) {
  return (
    <div className="pb-24">
      <p className={`text-center text-text-muted text-xs tracking-widest uppercase mb-5 mt-6 ${lang === 'ar' ? 'font-cairo' : 'font-lato'}`}>
        {lang === 'ar' ? 'اختر فئة' : 'Choose a category'}
      </p>

      {loading ? (
        <div className="flex gap-3 px-4 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-40 h-52 rounded-2xl bg-surface-2 animate-pulse" />
          ))}
        </div>
      ) : (
        <CategoryCarousel categories={categories} onSelect={onSelect} />
      )}
    </div>
  )
}

/* ── Item row (list, no image) ─────────────────────────── */
function ItemRow({ item, lang, isRTL }) {
  const { format, currency } = useCurrency()
  const name = lang === 'ar' ? item.name_ar : item.name_en
  const description = lang === 'ar' ? item.description_ar : item.description_en
  const isUnavailable = item.status === 'unavailable'
  const isComingSoon = item.status === 'coming_soon'

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start justify-between gap-4 py-4 border-b border-surface-2 last:border-0
        ${isUnavailable ? 'opacity-40' : ''}
        ${isRTL ? 'flex-row-reverse' : ''}
      `}
    >
      <div className="flex-1 min-w-0">
        <p className={`text-text font-semibold text-sm leading-snug ${lang === 'ar' ? 'font-cairo' : 'font-playfair'}`}>
          {name}
        </p>
        {description && (
          <p className={`text-text-muted text-xs mt-0.5 leading-relaxed ${lang === 'ar' ? 'font-cairo' : ''}`}>
            {description}
          </p>
        )}
        {isComingSoon && (
          <span className="inline-block mt-1 text-xs text-gold border border-gold/30 rounded-full px-2 py-0.5">
            {lang === 'ar' ? 'قريباً' : 'Coming Soon'}
          </span>
        )}
      </div>

      {!isComingSoon && (
        <AnimatePresence mode="wait">
          <motion.p
            key={currency}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-shrink-0 text-brown font-bold text-sm"
          >
            {format(item.price, item.priceCurrency)}
          </motion.p>
        </AnimatePresence>
      )}
    </motion.div>
  )
}

/* ── Category items page ───────────────────────────────── */
function CategoryPage({ category, items, lang, isRTL, onBack }) {
  const name = lang === 'ar' ? category.name_ar : category.name_en

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="pb-24"
    >
      {/* Top bar */}
      <div className={`flex items-center gap-3 px-4 py-4 sticky top-14 z-10 bg-[#FBF5EB] border-b border-surface-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-2 text-brown hover:bg-surface transition-colors text-sm"
        >
          {isRTL ? '→' : '←'}
        </button>
        <h2 className={`text-brown font-bold text-lg ${lang === 'ar' ? 'font-cairo' : 'font-playfair'}`}>
          {name}
        </h2>
      </div>

      {/* Items list */}
      <div className="px-5 mt-2">
        {items.length === 0 ? (
          <p className="text-text-muted text-sm py-12 text-center">
            {lang === 'ar' ? 'لا توجد عناصر بعد' : 'No items yet.'}
          </p>
        ) : (
          items.map((item) => (
            <ItemRow key={item.id} item={item} lang={lang} isRTL={isRTL} />
          ))
        )}
      </div>
    </motion.div>
  )
}

/* ── Main ──────────────────────────────────────────────── */
export default function Menu() {
  const { categories, loading, categoriesLoading, itemsByCategory } = useMenu()
  const { lang, isRTL } = useLanguage()
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)

  return (
    <div className="min-h-screen" style={{ background: '#FBF5EB' }}>
      <MenuHeader />
      <HeroSection lang={lang} />

      <div className="menu-content">
        <AnimatePresence mode="wait">
          {selectedCategoryId && selectedCategory ? (
            <CategoryPage
              key="category"
              category={selectedCategory}
              items={itemsByCategory(selectedCategoryId)}
              lang={lang}
              isRTL={isRTL}
              onBack={() => setSelectedCategoryId(null)}
            />
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CategoryHome
                categories={categories}
                loading={categoriesLoading}
                onSelect={setSelectedCategoryId}
                lang={lang}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FloatingCurrencyToggle />

      <footer className="fixed bottom-0 left-0 right-0 bg-[#1A0D06] py-2 text-center z-20">
        <p className="text-white/30 text-xs font-lato tracking-widest uppercase">Oud · عود</p>
      </footer>
    </div>
  )
}
