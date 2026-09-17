import { useRef, useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

export default function CategoryCarousel({ categories, onSelect }) {
  const { lang } = useLanguage()
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(0)

  if (!categories.length) return null

  // Duplicate for seamless infinite loop
  const track = [...categories, ...categories]
  const duration = Math.max(categories.length * 5, 18)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    setPaused(true)
  }

  const handleTouchEnd = (e) => {
    const dx = Math.abs(e.changedTouches[0].clientX - touchStartX.current)
    // If barely moved = tap, fire select
    if (dx < 8) {
      const el = e.target.closest('[data-catid]')
      if (el) onSelect(el.dataset.catid)
    }
    setTimeout(() => setPaused(false), 600)
  }

  return (
    <div className="overflow-hidden">
      <div
        className={`carousel-track${paused ? ' paused' : ''}`}
        style={{ '--carousel-duration': `${duration}s` }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {track.map((cat, i) => {
          const name = lang === 'ar' ? cat.name_ar : cat.name_en
          return (
            <button
              key={`${cat.id}-${i}`}
              data-catid={cat.id}
              onClick={() => onSelect(cat.id)}
              className="flex-shrink-0 w-40 h-52 relative rounded-2xl overflow-hidden mx-2 focus:outline-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Image or placeholder */}
              {cat.imageUrl ? (
                <img src={cat.imageUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brown/80 to-[#120C05]" />
              )}

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Category name */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                <p className={`text-white font-bold text-sm drop-shadow ${lang === 'ar' ? 'font-cairo' : 'font-playfair'}`}>
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
