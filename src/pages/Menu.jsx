import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMenu } from '../contexts/MenuContext'
import { useCurrency } from '../contexts/CurrencyContext'
import MenuHeader from '../components/menu/MenuHeader'
import CategoryCarousel from '../components/menu/CategoryCarousel'
import DallahDecoration from '../components/menu/DallahDecoration'
import IslamicPattern from '../components/shared/IslamicPattern'
import AboutSection from '../components/menu/AboutSection'
import VisitSection from '../components/menu/VisitSection'
import BestSellers from '../components/menu/BestSellers'
import OudBoxPage from '../components/menu/OudBoxPage'
import OudBoxBanner from '../components/menu/OudBoxBanner'
import BestSellersPage from '../components/menu/BestSellersPage'
import MenuSearch from '../components/menu/MenuSearch'
import FloatingMusicPlayer from '../components/menu/FloatingMusicPlayer'
import CategorySwitcher from '../components/menu/CategorySwitcher'
import ItemSheet from '../components/menu/ItemSheet'
import OpenBadge from '../components/menu/OpenBadge'
import TeaLoader from '../components/menu/TeaLoader'
import './menu.css'

/* ── Hero ──────────────────────────────────────────────── */
function HeroSection({ settings, settingsLoading }) {
  const heroBg = settings?.heroBg ?? {}
  const hasPhoto = !!heroBg.imageUrl

  return (
    <section className="relative bg-white overflow-hidden -mt-14 h-80">
      {!settingsLoading && (
        hasPhoto ? (
          <>
            <img
              src={heroBg.imageUrl}
              alt=""
              fetchpriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ objectPosition: `${heroBg.imagePosition?.x ?? 50}% ${heroBg.imagePosition?.y ?? 50}%` }}
            />
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
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

      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-6 px-8" style={{ fontFamily: 'Philosopher, serif' }}>
        <OpenBadge />
        <h1 className="text-white text-3xl font-normal mb-0 leading-none">
          Welcome To OUD
        </h1>
        <h1 className="text-white text-2xl font-normal mt-0 ml-1 leading-tight">
          Beirut Coffee Lounge
        </h1>
      </div>

    </section>
  )
}

/* ── Category home (carousel) ──────────────────────────── */
function CategoryHome({ categories, loading, onSelect }) {
  return (
    <div className="pb-8 bg-white">
      <p className="text-center text-xs tracking-widest uppercase mb-5 mt-6 font-lato" style={{ color: '#5f6430' }}>
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
function ItemCard({ item, index, highlighted, onOpenSheet }) {
  const { format } = useCurrency()
  const isUnavailable = item.status === 'unavailable'
  const isComingSoon = item.status === 'coming_soon'
  const hasVariants = item.variants?.length > 0
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [isHighlighted, setIsHighlighted] = useState(false)

  useEffect(() => {
    if (!highlighted) return
    setIsHighlighted(true)
    const t = setTimeout(() => setIsHighlighted(false), 1500)
    return () => clearTimeout(t)
  }, [highlighted])

  const active = hasVariants ? item.variants[selectedVariant] : null
  const imageUrl = active ? active.imageUrl : item.imageUrl
  const imagePosition = active ? active.imagePosition : item.imagePosition
  const price = active ? active.price : item.price
  const priceCurrency = active ? active.priceCurrency : item.priceCurrency

  return (
    <motion.div
      id={`item-${item.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.07 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-surface-2 flex flex-col ${isUnavailable ? 'opacity-40' : ''}`}
      onClick={onOpenSheet ? () => onOpenSheet(item, selectedVariant) : undefined}
      style={{
        cursor: onOpenSheet ? 'pointer' : undefined,
        ...(isHighlighted ? { outline: '2.5px solid #C9A84C', outlineOffset: '2px' } : {}),
      }}
    >
      <div className="w-full aspect-square bg-surface-2 flex-shrink-0 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {imageUrl ? (
            <motion.img
              key={selectedVariant}
              src={imageUrl}
              alt={item.name_en}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: `${imagePosition?.x ?? 50}% ${imagePosition?.y ?? 50}%` }}
            />
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <span className="text-3xl opacity-20">☕</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-text font-semibold text-sm leading-snug font-playfair line-clamp-2">
          {item.name_en}
        </p>
        {item.description_en && (
          <p className="text-text-muted text-xs mt-1 leading-relaxed line-clamp-2">
            {item.description_en}
          </p>
        )}

        {hasVariants && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.variants.map((v, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSelectedVariant(i) }}
                className={`text-xs px-2 py-0.5 rounded-full border transition-all ${selectedVariant === i ? 'bg-brown text-white border-brown' : 'border-brown/30 text-brown hover:bg-brown/5'}`}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2">
          {isComingSoon ? (
            <span className="text-xs text-gold border border-gold/30 rounded-full px-2 py-0.5">
              Coming Soon
            </span>
          ) : (
            <motion.p
              key={selectedVariant}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="text-brown font-bold text-sm"
            >
              {format(price, priceCurrency)}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Category items page ───────────────────────────────── */
function CategoryPage({ category, items, onBack, highlightId, onHighlightDone, onOpenSheet }) {
  useEffect(() => {
    if (!highlightId) return
    const t = setTimeout(() => {
      document.getElementById(`item-${highlightId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      onHighlightDone?.()
    }, 350)
    return () => clearTimeout(t)
  }, [highlightId])

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
              <ItemCard key={item.id} item={item} index={i} highlighted={item.id === highlightId} onOpenSheet={onOpenSheet} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Search results ────────────────────────────────────── */
function SearchResults({ query, items, categories, onSelectItem, onClearSearch }) {
  const { format } = useCurrency()
  const q = query.trim().toLowerCase()

  const results = items.filter((item) => {
    if (item.status === 'unavailable') return false
    const cat = categories.find((c) => c.id === item.categoryId)
    return [item.name_en, item.name_ar, item.description_en, cat?.name_en, cat?.name_ar]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(q))
  })

  return (
    <div style={{ padding: '12px 16px 80px' }}>
      <p style={{ fontSize: 13, color: '#5F6430', fontFamily: 'Lato, sans-serif', margin: '0 0 12px' }}>
        {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query.trim()}&rdquo;
      </p>

      {results.length === 0 ? (
        <div style={{ textAlign: 'center', paddingTop: 32 }}>
          <p style={{ color: '#5F6430', fontSize: 14, fontFamily: 'Lato, sans-serif', margin: '0 0 12px' }}>
            Nothing found for &ldquo;{query.trim()}&rdquo;. Try another word.
          </p>
          <button
            onClick={onClearSearch}
            style={{ color: '#5C7249', fontSize: 14, fontFamily: 'Lato, sans-serif', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Clear search
          </button>
        </div>
      ) : results.map((item) => {
        const cat = categories.find((c) => c.id === item.categoryId)
        const first = item.variants?.[0]
        const imageUrl = first ? first.imageUrl : item.imageUrl
        const imagePosition = first ? first.imagePosition : item.imagePosition
        const price = first ? first.price : item.price
        const priceCurrency = first ? first.priceCurrency : item.priceCurrency

        return (
          <button
            key={item.id}
            onClick={() => onSelectItem(item)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              width: '100%',
              minHeight: 64,
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '8px 14px',
              marginBottom: 10,
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div style={{ width: 56, height: 56, borderRadius: 12, overflow: 'hidden', background: '#CED8C7', flexShrink: 0 }}>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={item.name_en}
                  loading="lazy"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    objectPosition: `${imagePosition?.x ?? 50}% ${imagePosition?.y ?? 50}%`,
                    display: 'block',
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: 'Georgia, serif', fontSize: 15, color: '#3D2B1F',
                margin: '0 0 3px', overflow: 'hidden', fontWeight: 'normal',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>
                {item.name_en}
              </p>
              {cat && (
                <p style={{ fontSize: 12, color: '#5C7249', margin: 0, fontFamily: 'Lato, sans-serif' }}>
                  {cat.name_en}
                </p>
              )}
            </div>
            <p style={{ fontWeight: 'bold', fontSize: 13, color: '#2D1E14', margin: 0, flexShrink: 0, fontFamily: 'Lato, sans-serif' }}>
              {format(price, priceCurrency)}
            </p>
          </button>
        )
      })}
    </div>
  )
}

/* ── Main ──────────────────────────────────────────────── */
export default function Menu() {
  const { categories, items, loading: itemsLoading, categoriesLoading, settingsLoading, itemsByCategory, settings } = useMenu()
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [pendingHighlight, setPendingHighlight] = useState(null)
  const [sheetItem, setSheetItem] = useState(null)
  const [sheetVariant, setSheetVariant] = useState(0)

  const selectedCategoryIdRef = useRef(null)
  const switcherOpenRef = useRef(false)
  const sheetItemRef = useRef(null)
  useEffect(() => { selectedCategoryIdRef.current = selectedCategoryId }, [selectedCategoryId])
  useEffect(() => { switcherOpenRef.current = switcherOpen }, [switcherOpen])
  useEffect(() => { sheetItemRef.current = sheetItem }, [sheetItem])

  // Open from main page — push a history entry
  const openCategory = (id) => {
    history.pushState({ categoryId: id }, '')
    setSelectedCategoryId(id)
  }

  // Switch via the switcher — replace current entry so back always goes home
  const switchCategory = (id) => {
    history.replaceState({ categoryId: id }, '')
    setSelectedCategoryId(id)
    window.scrollTo(0, 0)
  }

  // Back button in category pages
  const goBack = () => history.back()

  const openSheet = (item, variantIndex = 0) => {
    history.pushState({ sheet: item.id }, '')
    setSheetItem(item)
    setSheetVariant(variantIndex)
  }
  const closeSheet = () => history.back()

  // Clear search when returning home
  useEffect(() => {
    if (selectedCategoryId === null) setQuery('')
  }, [selectedCategoryId])

  // Open a category from a search result and schedule a highlight
  const handleSelectItem = (item) => {
    setPendingHighlight(item.id)
    setQuery('')
    openCategory(item.categoryId)
  }

  // Handle Android/browser back
  useEffect(() => {
    const handler = () => {
      if (sheetItemRef.current) {
        setSheetItem(null)
      } else if (switcherOpenRef.current) {
        setSwitcherOpen(false)
        if (selectedCategoryIdRef.current) {
          history.pushState({ categoryId: selectedCategoryIdRef.current }, '')
        }
      } else {
        setSelectedCategoryId(null)
      }
    }
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)

  return (
    <div className="min-h-screen bg-white">
      <TeaLoader
        categoriesLoading={categoriesLoading}
        itemsLoading={itemsLoading}
        settingsLoading={settingsLoading}
      />
      <MenuHeader />
      {!selectedCategoryId && <HeroSection settings={settings} settingsLoading={settingsLoading} />}
      {!selectedCategoryId && <MenuSearch query={query} setQuery={setQuery} />}

      <div id="menu-section" className="menu-content">
        <AnimatePresence mode="wait">
          {selectedCategoryId === '__bestsellers__' ? (
            <div className="min-h-screen bg-[#D8DFD2]">
              <BestSellersPage
                key="bestsellers"
                items={items}
                categories={categories}
                onBack={goBack}
                onOpenSheet={openSheet}
              />
            </div>
          ) : selectedCategoryId === '__oudbox__' ? (
            <div className="min-h-screen bg-[#D8DFD2]">
              <OudBoxPage
                key="oudbox"
                categories={categories}
                items={items}
                loading={itemsLoading}
                onBack={goBack}
                onOpenSheet={openSheet}
              />
            </div>
          ) : selectedCategoryId && selectedCategory ? (
            <div className="min-h-screen bg-[#D8DFD2]">
              <CategoryPage
                key="category"
                category={selectedCategory}
                items={itemsByCategory(selectedCategoryId)}
                onBack={goBack}
                highlightId={pendingHighlight}
                onHighlightDone={() => setPendingHighlight(null)}
                onOpenSheet={openSheet}
              />
            </div>
          ) : query ? (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <SearchResults
                query={query}
                items={items}
                categories={categories}
                onSelectItem={handleSelectItem}
                onClearSearch={() => setQuery('')}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <BestSellers items={items} onSeeAll={() => openCategory('__bestsellers__')} />
              <OudBoxBanner items={items} onOpen={() => openCategory('__oudbox__')} />
              <CategoryHome
                categories={categories}
                loading={categoriesLoading}
                onSelect={openCategory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!selectedCategoryId && !query && <AboutSection afterAbout={<VisitSection />} />}

      {selectedCategoryId && (
        <CategorySwitcher
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          open={switcherOpen}
          setOpen={setSwitcherOpen}
          onSwitch={switchCategory}
        />
      )}

      <FloatingMusicPlayer />

      <AnimatePresence>
        {sheetItem && (
          <ItemSheet
            key="item-sheet"
            item={sheetItem}
            initialVariant={sheetVariant}
            items={items}
            onClose={closeSheet}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
