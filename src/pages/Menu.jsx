import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMenu } from '../contexts/MenuContext'
import { useCurrency } from '../contexts/CurrencyContext'
import MenuHeader from '../components/menu/MenuHeader'
import CategoryCarousel from '../components/menu/CategoryCarousel'
import FloatingCurrencyToggle from '../components/menu/FloatingCurrencyToggle'
import DallahDecoration from '../components/menu/DallahDecoration'
import IslamicPattern from '../components/shared/IslamicPattern'
import Logo from '../components/shared/Logo'
import AboutSection from '../components/menu/AboutSection'
import BestSellers from '../components/menu/BestSellers'
import './menu.css'

/* ── Hero ──────────────────────────────────────────────── */
function HeroSection({ settings, settingsLoading }) {
  const heroBg = settings?.heroBg ?? {}
  const hasPhoto = !!heroBg.imageUrl

  return (
    <section className="relative bg-[#120C05] overflow-hidden -mt-14">
      {!settingsLoading && (
        hasPhoto ? (
          <>
            <img
              src={heroBg.imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ objectPosition: `${heroBg.imagePosition?.x ?? 50}% ${heroBg.imagePosition?.y ?? 50}%` }}
            />
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          </>
        ) : (
          <>
            <IslamicPattern opacity={0.04} color="#C9A84C" />
            <div className="absolute left-0 bottom-8 opacity-15 pointer-events-none">
              <DallahDecoration className="w-24 -scale-x-100" />
            </div>
            <div className="absolute right-0 bottom-8 opacity-15 pointer-events-none">
              <DallahDecoration className="w-24" />
            </div>
          </>
        )
      )}

      <div className="relative z-10 flex flex-col items-center justify-center pt-24 pb-10 px-6 text-center">
        <Link to="/admin">
          <motion.div
            animate={{ filter: ['drop-shadow(0 0 6px rgba(201,168,76,0.2))', 'drop-shadow(0 0 18px rgba(201,168,76,0.7))', 'drop-shadow(0 0 6px rgba(201,168,76,0.2))'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Logo variant="white" className="w-48 max-w-xs mb-3" />
          </motion.div>
        </Link>
        <p className="text-white/40 text-xs tracking-[0.25em] uppercase font-lato">
          Coffee & More
        </p>
      </div>

      <div className="relative h-8">
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#FBF5EB]"
          style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }} />
      </div>
    </section>
  )
}

/* ── Category home (carousel) ──────────────────────────── */
function CategoryHome({ categories, loading, onSelect }) {
  return (
    <div className="pb-8">
      <p className="text-center text-text-muted text-xs tracking-widest uppercase mb-5 mt-6 font-lato">
        Choose a category
      </p>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
        </div>
      ) : (
        <CategoryCarousel categories={categories} onSelect={onSelect} />
      )}
    </div>
  )
}

/* ── Item card (2-col grid) ────────────────────────────── */
function ItemCard({ item, index }) {
  const { format, currency } = useCurrency()
  const isUnavailable = item.status === 'unavailable'
  const isComingSoon = item.status === 'coming_soon'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.05 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-surface-2 flex flex-col ${isUnavailable ? 'opacity-40' : ''}`}
    >
      {/* Photo */}
      <div className="w-full aspect-square bg-surface-2 flex-shrink-0">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name_en}
            className="w-full h-full object-cover"
            style={{ objectPosition: `${item.imagePosition?.x ?? 50}% ${item.imagePosition?.y ?? 50}%` }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl opacity-20">☕</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-text font-semibold text-sm leading-snug font-playfair line-clamp-2">
          {item.name_en}
        </p>
        {item.description_en && (
          <p className="text-text-muted text-xs mt-1 leading-relaxed line-clamp-2">
            {item.description_en}
          </p>
        )}

        <div className="mt-auto pt-2">
          {isComingSoon ? (
            <span className="text-xs text-gold border border-gold/30 rounded-full px-2 py-0.5">
              Coming Soon
            </span>
          ) : (
            <AnimatePresence mode="wait">
              <motion.p
                key={currency}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-brown font-bold text-sm"
              >
                {format(item.price, item.priceCurrency)}
              </motion.p>
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Category items page ───────────────────────────────── */
function CategoryPage({ category, items, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="pb-8"
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-4 sticky top-14 z-10 bg-[#FBF5EB] border-b border-surface-2">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-2 text-brown hover:bg-surface transition-colors text-sm"
        >
          ←
        </button>
        <h2 className="text-brown font-bold text-lg font-playfair">
          {category.name_en}
        </h2>
      </div>

      {/* Items grid */}
      <div className="px-4 mt-4">
        {items.length === 0 ? (
          <p className="text-text-muted text-sm py-12 text-center">No items yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Main ──────────────────────────────────────────────── */
export default function Menu() {
  const { categories, items, categoriesLoading, settingsLoading, itemsByCategory, settings } = useMenu()
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)

  return (
    <div className="min-h-screen" style={{ background: '#FBF5EB' }}>
      <MenuHeader />
      <HeroSection settings={settings} settingsLoading={settingsLoading} />

      <div id="menu-section" className="menu-content">
        <AnimatePresence mode="wait">
          {selectedCategoryId && selectedCategory ? (
            <CategoryPage
              key="category"
              category={selectedCategory}
              items={itemsByCategory(selectedCategoryId)}
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
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BestSellers items={items} />
      <AboutSection />
      <FloatingCurrencyToggle />
    </div>
  )
}
