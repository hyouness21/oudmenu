import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMenu } from '../contexts/MenuContext'
import { useLanguage } from '../contexts/LanguageContext'
import MenuHeader from '../components/menu/MenuHeader'
import CategoryTabs from '../components/menu/CategoryTabs'
import CategorySection from '../components/menu/CategorySection'
import FloatingCurrencyToggle from '../components/menu/FloatingCurrencyToggle'
import DallahDecoration from '../components/menu/DallahDecoration'
import IslamicPattern from '../components/shared/IslamicPattern'
import Logo from '../components/shared/Logo'
import { Link } from 'react-router-dom'
import './menu.css'

function HeroSection({ lang }) {
  return (
    <section className="relative bg-[#120C05] overflow-hidden">
      <IslamicPattern opacity={0.04} color="#C9A84C" />

      {/* Floating glows */}
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

      {/* Dallah decorations */}
      <div className="absolute left-0 bottom-8 opacity-15 pointer-events-none">
        <DallahDecoration className="w-24 -scale-x-100" />
      </div>
      <div className="absolute right-0 bottom-8 opacity-15 pointer-events-none">
        <DallahDecoration className="w-24" />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-12 px-6 text-center">
        <Link to="/admin">
          <Logo variant="white" className="w-52 max-w-xs mb-3" />
        </Link>
        <p className={`text-white/40 text-xs tracking-[0.25em] uppercase ${lang === 'ar' ? 'font-cairo tracking-normal' : 'font-lato'}`}>
          {lang === 'ar' ? 'قائمة الطعام والمشروبات' : 'Coffee & More'}
        </p>
      </div>

      {/* Curve transition to cream */}
      <div className="relative h-8 bg-[#120C05]">
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-[#FBF5EB]"
          style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}
        />
      </div>
    </section>
  )
}

function LoadingSkeleton() {
  return (
    <div className="px-4 pt-6 grid grid-cols-2 gap-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-surface-2 animate-pulse">
          <div className="h-36 bg-surface-2" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-surface-2 rounded w-3/4" />
            <div className="h-3 bg-surface-2 rounded w-1/2" />
            <div className="h-3 bg-surface-2 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Menu() {
  const { categories, loading, categoriesLoading, itemsByCategory } = useMenu()
  const { lang } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')

  const visibleCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter((c) => c.id === activeCategory)

  return (
    <div className="min-h-screen" style={{ background: '#FBF5EB' }}>

      <MenuHeader />

      <HeroSection lang={lang} />

      {!categoriesLoading && categories.length > 0 && (
        <div className="sticky top-14 z-20">
          <CategoryTabs
            categories={categories}
            activeId={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>
      )}

      <div className="menu-content">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <AnimatePresence mode="wait">
            <motion.main
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pt-5 pb-24"
            >
              {visibleCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
                  <div className="text-5xl mb-4 opacity-30">☕</div>
                  <p className="text-text-muted text-sm">Menu coming soon</p>
                </div>
              ) : (
                visibleCategories.map((cat) => (
                  <CategorySection
                    key={cat.id}
                    category={cat}
                    items={itemsByCategory(cat.id)}
                  />
                ))
              )}
            </motion.main>
          </AnimatePresence>
        )}
      </div>

      <FloatingCurrencyToggle />

      <footer className="fixed bottom-0 left-0 right-0 bg-[#1A0D06] py-2 text-center z-20">
        <p className="text-white/30 text-xs font-lato tracking-widest uppercase">Oud · عود</p>
      </footer>
    </div>
  )
}
