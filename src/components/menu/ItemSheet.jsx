import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCurrency } from '../../contexts/CurrencyContext'

export default function ItemSheet({ item, initialVariant = 0, items = [], onClose }) {
  const { format } = useCurrency()
  const [current, setCurrent] = useState(item)
  const [selectedVariant, setSelectedVariant] = useState(initialVariant)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    setCurrent(item)
    setSelectedVariant(initialVariant)
  }, [item, initialVariant])

  const active = current.variants?.length > 0 ? current.variants[selectedVariant] : null
  const imageUrl = active ? active.imageUrl : current.imageUrl
  const imagePosition = active ? active.imagePosition : current.imagePosition
  const price = active ? active.price : current.price
  const priceCurrency = active ? active.priceCurrency : current.priceCurrency
  const isComingSoon = current.status === 'coming_soon'

  const pairedItems = (current.pairIds ?? [])
    .map((id) => items.find((i) => i.id === id))
    .filter(Boolean)
    .filter((i) => i.status !== 'unavailable')

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 100 || info.velocity.y > 400) onClose()
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(45,30,20,0.45)', zIndex: 200 }}
      />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: '88vh',
          background: '#FFFAF0',
          borderRadius: '26px 26px 0 0',
          zIndex: 201,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Photo area — drag surface */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          maxHeight: '55vh',
          background: '#CED8C7',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          {imageUrl ? (
            <>
              {/* Blurred fill — covers letterbox bars on short screens */}
              <img
                src={imageUrl}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: `${imagePosition?.x ?? 50}% ${imagePosition?.y ?? 50}%`,
                  filter: 'blur(20px)',
                  transform: 'scale(1.1)',
                  display: 'block',
                }}
              />
              {/* Foreground — contain so the full photo is never cropped */}
              <img
                src={imageUrl}
                alt={current.name_en}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: '50% 50%',
                  display: 'block',
                }}
              />
            </>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 48, opacity: 0.2 }}>☕</span>
            </div>
          )}

          <div style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 48,
            height: 5,
            borderRadius: 999,
            background: 'rgba(255,250,240,0.85)',
            pointerEvents: 'none',
          }} />

          <button
            onClick={onClose}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 8,
              right: 12,
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(255,250,240,0.85)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              lineHeight: 1,
              color: '#2D1E14',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            ×
          </button>
        </div>

        {/* Rug band */}
        <div style={{
          height: 12,
          backgroundImage: 'url("/rug-band.png")',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 12px',
          backgroundPosition: 'center',
          flexShrink: 0,
        }} />

        {/* Scrollable content — stopPropagation prevents drag from starting here */}
        <div
          style={{ overflowY: 'auto', flex: 1 }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div style={{ padding: '16px 20px 32px' }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 26,
              color: '#5F6430',
              margin: '0 0 10px',
              fontWeight: 'normal',
              lineHeight: 1.25,
            }}>
              {current.name_en}
            </h2>

            {(current.isBestSeller || current.isOudBox || isComingSoon || current.status === 'unavailable') && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {current.isBestSeller && (
                  <span style={{ background: '#5C7249', color: '#fff', fontSize: 11, fontFamily: 'Lato, sans-serif', fontWeight: 'bold', padding: '3px 10px', borderRadius: 999 }}>
                    Popular
                  </span>
                )}
                {current.isOudBox && (
                  <span style={{ background: '#C9A84C', color: '#fff', fontSize: 11, fontFamily: 'Lato, sans-serif', fontWeight: 'bold', padding: '3px 10px', borderRadius: 999 }}>
                    OUD BOX
                  </span>
                )}
                {isComingSoon && (
                  <span style={{ background: '#FFFAF0', color: '#C9A84C', fontSize: 11, fontFamily: 'Lato, sans-serif', border: '1px solid #C9A84C', padding: '3px 10px', borderRadius: 999 }}>
                    Coming Soon
                  </span>
                )}
                {current.status === 'unavailable' && (
                  <span style={{ background: '#CED8C7', color: '#5F6430', fontSize: 11, fontFamily: 'Lato, sans-serif', padding: '3px 10px', borderRadius: 999 }}>
                    Unavailable
                  </span>
                )}
              </div>
            )}

            {current.description_en && (
              <p style={{ fontSize: 14, color: '#5F6430', lineHeight: 1.6, margin: '0 0 16px', fontFamily: 'Lato, sans-serif' }}>
                {current.description_en}
              </p>
            )}

            {current.variants?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, letterSpacing: '2px', fontFamily: 'Lato, sans-serif', color: '#879E76', textTransform: 'uppercase', margin: '0 0 8px' }}>
                  Size
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {current.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(i)}
                      style={{
                        minHeight: 44,
                        padding: '0 18px',
                        borderRadius: 999,
                        border: '1.5px solid',
                        borderColor: selectedVariant === i ? '#2D1E14' : '#879E76',
                        background: selectedVariant === i ? '#2D1E14' : '#fff',
                        color: selectedVariant === i ? '#fff' : '#5F6430',
                        fontSize: 14,
                        fontFamily: 'Lato, sans-serif',
                        cursor: 'pointer',
                        WebkitTapHighlightColor: 'transparent',
                      }}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {pairedItems.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, letterSpacing: '2px', fontFamily: 'Lato, sans-serif', color: '#879E76', textTransform: 'uppercase', margin: '0 0 8px' }}>
                  Goes well with
                </p>
                <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
                  {pairedItems.map((paired) => {
                    const pFirst = paired.variants?.[0]
                    const pImg = pFirst ? pFirst.imageUrl : paired.imageUrl
                    const pPos = pFirst ? pFirst.imagePosition : paired.imagePosition
                    return (
                      <button
                        key={paired.id}
                        onClick={() => { setCurrent(paired); setSelectedVariant(0) }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 6,
                          background: '#fff',
                          border: '1.5px solid #D8DFD2',
                          borderRadius: 14,
                          padding: '8px 10px',
                          cursor: 'pointer',
                          flexShrink: 0,
                          WebkitTapHighlightColor: 'transparent',
                          minWidth: 80,
                        }}
                      >
                        <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', background: '#CED8C7' }}>
                          {pImg && (
                            <img
                              src={pImg}
                              alt={paired.name_en}
                              loading="lazy"
                              style={{
                                width: '100%', height: '100%', objectFit: 'cover',
                                objectPosition: `${pPos?.x ?? 50}% ${pPos?.y ?? 50}%`,
                                display: 'block',
                              }}
                            />
                          )}
                        </div>
                        <p style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: 12,
                          color: '#5F6430',
                          margin: 0,
                          textAlign: 'center',
                          maxWidth: 72,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}>
                          {paired.name_en}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #D8DFD2',
              paddingTop: 16,
              marginTop: 4,
            }}>
              <span style={{ fontSize: 13, color: '#5F6430', fontFamily: 'Lato, sans-serif' }}>
                Price
              </span>
              {isComingSoon ? (
                <span style={{ fontSize: 14, color: '#C9A84C', fontFamily: 'Georgia, serif' }}>
                  Coming soon
                </span>
              ) : (
                <span style={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold', fontSize: 22, color: '#2D1E14' }}>
                  {format(price, priceCurrency)}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
