import { useRef, useEffect } from 'react'

const REPS = 6
const SPEED = 0.6

export default function CategoryCarousel({ categories, onSelect }) {
  const trackRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef(null)
  const oneSetWidthRef = useRef(0)
  const dragRef = useRef(null) // { lastX, moved }

  const track = Array(REPS).fill(categories).flat()

  const wrap = (pos) => {
    const w = oneSetWidthRef.current
    if (w <= 0) return pos
    pos = pos % w
    if (pos < 0) pos += w
    return pos
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el || !categories.length) return

    requestAnimationFrame(() => {
      oneSetWidthRef.current = el.scrollWidth / REPS
    })

    const animate = () => {
      if (!pausedRef.current && oneSetWidthRef.current > 0) {
        posRef.current += SPEED
        if (posRef.current >= oneSetWidthRef.current) posRef.current -= oneSetWidthRef.current
        el.style.transform = `translateX(-${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    /* ── Mouse ── */
    const onMouseDown = (e) => {
      dragRef.current = { lastX: e.clientX, moved: false }
      pausedRef.current = true
      el.style.cursor = 'grabbing'
    }
    const onMouseMove = (e) => {
      if (!dragRef.current) return
      const dx = dragRef.current.lastX - e.clientX
      dragRef.current.lastX = e.clientX
      if (Math.abs(dx) > 2) dragRef.current.moved = true
      posRef.current = wrap(posRef.current + dx)
      el.style.transform = `translateX(-${posRef.current}px)`
    }
    const onMouseUp = () => {
      if (!dragRef.current) return
      el.style.cursor = 'grab'
      dragRef.current = null
      setTimeout(() => { pausedRef.current = false }, 400)
    }
    const onMouseLeave = () => {
      if (dragRef.current) { dragRef.current = null; el.style.cursor = 'grab' }
      pausedRef.current = false
    }

    /* ── Touch ── */
    const onTouchStart = (e) => {
      dragRef.current = { lastX: e.touches[0].clientX, startX: e.touches[0].clientX, moved: false }
      pausedRef.current = true
    }
    const onTouchMove = (e) => {
      if (!dragRef.current) return
      const dx = dragRef.current.lastX - e.touches[0].clientX
      dragRef.current.lastX = e.touches[0].clientX
      if (Math.abs(e.touches[0].clientX - dragRef.current.startX) > 5) dragRef.current.moved = true
      posRef.current = wrap(posRef.current + dx)
      el.style.transform = `translateX(-${posRef.current}px)`
    }
    const onTouchEnd = (e) => {
      if (!dragRef.current) return
      const wasTap = !dragRef.current.moved
      dragRef.current = null
      if (wasTap) {
        const btn = e.target.closest('[data-catid]')
        if (btn) onSelect(btn.dataset.catid)
      }
      setTimeout(() => { pausedRef.current = false }, 500)
    }

    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd)

    return () => {
      cancelAnimationFrame(rafRef.current)
      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [categories])

  if (!categories.length) return null

  return (
    <div className="overflow-hidden w-full" style={{ cursor: 'grab' }} dir="ltr">
      <div ref={trackRef} className="flex" style={{ willChange: 'transform' }}>
        {track.map((cat, i) => {
          const name = cat.name_en
          return (
            <button
              key={`${cat.id}-${i}`}
              data-catid={cat.id}
              onClick={() => {
                if (dragRef.current?.moved) return
                onSelect(cat.id)
              }}
              className="flex-shrink-0 w-44 h-56 relative rounded-2xl overflow-hidden mx-2 focus:outline-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {cat.imageUrl ? (
                <img
                  src={cat.imageUrl}
                  alt={name}
                  className="w-full h-full object-cover pointer-events-none"
                  style={{ objectPosition: `${cat.imagePosition?.x ?? 50}% ${cat.imagePosition?.y ?? 50}%` }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#2D1E14] to-[#120C05]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center pointer-events-none">
                <p className="text-white font-bold text-sm drop-shadow-lg font-playfair">
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
