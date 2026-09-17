import { useRef, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

const REPS = 6   // enough to fill any screen size
const SPEED = 0.6 // px per frame

export default function CategoryCarousel({ categories, onSelect }) {
  const { lang } = useLanguage()
  const trackRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef(null)
  const oneSetWidthRef = useRef(0)
  const touchStartX = useRef(0)

  const track = Array(REPS).fill(categories).flat()

  useEffect(() => {
    const el = trackRef.current
    if (!el || !categories.length) return

    // Measure width of one set after layout
    requestAnimationFrame(() => {
      oneSetWidthRef.current = el.scrollWidth / REPS
    })

    const animate = () => {
      if (!pausedRef.current && oneSetWidthRef.current > 0) {
        posRef.current += SPEED
        if (posRef.current >= oneSetWidthRef.current) {
          posRef.current -= oneSetWidthRef.current
        }
        el.style.transform = `translateX(-${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    const pause = () => { pausedRef.current = true }
    const resume = () => { pausedRef.current = false }

    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    el.addEventListener('touchstart', (e) => {
      touchStartX.current = e.touches[0].clientX
      pause()
    }, { passive: true })
    el.addEventListener('touchend', (e) => {
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartX.current)
      if (dx < 8) {
        const btn = e.target.closest('[data-catid]')
        if (btn) onSelect(btn.dataset.catid)
      }
      setTimeout(resume, 400)
    }, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
    }
  }, [categories])

  if (!categories.length) return null

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex"
        style={{ willChange: 'transform' }}
      >
        {track.map((cat, i) => {
          const name = lang === 'ar' ? cat.name_ar : cat.name_en
          return (
            <button
              key={`${cat.id}-${i}`}
              data-catid={cat.id}
              onClick={() => onSelect(cat.id)}
              className="flex-shrink-0 w-44 h-56 relative rounded-2xl overflow-hidden mx-2 focus:outline-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {cat.imageUrl ? (
                <img src={cat.imageUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#2D1E14] to-[#120C05]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                <p className={`text-white font-bold text-sm drop-shadow-lg ${lang === 'ar' ? 'font-cairo' : 'font-playfair'}`}>
                  {name}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
