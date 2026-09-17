import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMenu } from '../contexts/MenuContext'
import MenuHeader from '../components/menu/MenuHeader'
import CategoryTabs from '../components/menu/CategoryTabs'
import CategorySection from '../components/menu/CategorySection'
import FloatingCurrencyToggle from '../components/menu/FloatingCurrencyToggle'
import './menu.css'

function LoadingSkeleton() {
  return (
    <div className="px-4 pt-4 flex flex-col gap-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 border border-surface-2 animate-pulse">
          <div className="flex justify-between">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-surface-2 rounded w-2/3" />
              <div className="h-3 bg-surface-2 rounded w-1/2" />
            </div>
            <div className="h-4 bg-surface-2 rounded w-16 ml-4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Menu() {
  const { categories, loading, categoriesLoading, itemsByCategory } = useMenu()
  const [activeCategory, setActiveCategory] = useState('all')
  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const headerWrapperRef = useRef(null)
  const headerVisibleRef = useRef(true)
  const lastToggleRef = useRef(0)

  useEffect(() => {
    const el = headerWrapperRef.current
    if (!el) return
    const update = () => {
      document.documentElement.style.setProperty('--header-h', el.scrollHeight + 'px')
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const currentY = window.scrollY
        const diff = currentY - lastScrollY.current
        if (Math.abs(diff) < 10) { ticking = false; return }

        const now = Date.now()
        const atBottom = currentY + window.innerHeight >= document.body.scrollHeight - 80

        let next = headerVisibleRef.current
        if (currentY < 80) next = true
        else if (diff > 0 && !atBottom) next = false
        else if (diff < 0 && !atBottom) next = true

        if (next !== headerVisibleRef.current && now - lastToggleRef.current > 350) {
          headerVisibleRef.current = next
          lastToggleRef.current = now
          setHeaderVisible(next)
        }

        lastScrollY.current = currentY
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visibleCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter((c) => c.id === activeCategory)

  return (
    <div className="min-h-screen" style={{ background: '#FBF5EB' }}>

      {/* Sticky top block: header collapses, tabs always visible */}
      <div className="menu-sticky sticky top-0 z-30">
        <div ref={headerWrapperRef} className={`menu-header-wrapper${headerVisible ? '' : ' header-hidden'}`}>
          <MenuHeader />
        </div>

        {!categoriesLoading && categories.length > 0 && (
          <CategoryTabs
            categories={categories}
            activeId={activeCategory}
            onSelect={setActiveCategory}
          />
        )}
      </div>

      {/* Content */}
      <div className="menu-content">
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <AnimatePresence mode="wait">
          <motion.main
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="pt-5 pb-20"
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

      <footer className="fixed bottom-0 left-0 right-0 bg-brown/95 backdrop-blur-sm py-2 text-center z-20">
        <p className="text-white/40 text-xs font-lato tracking-widest uppercase">Oud · عود</p>
      </footer>
    </div>
  )
}
