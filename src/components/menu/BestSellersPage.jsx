import { motion } from 'framer-motion'
import { useCurrency } from '../../contexts/CurrencyContext'

function TopCard({ item, categories, onOpenSheet }) {
  const { format } = useCurrency()
  const first = item.variants?.[0]
  const imageUrl = first ? first.imageUrl : item.imageUrl
  const imagePosition = first ? first.imagePosition : item.imagePosition
  const price = first ? first.price : item.price
  const priceCurrency = first ? first.priceCurrency : item.priceCurrency

  return (
    <button
      onClick={() => onOpenSheet?.(item, 0)}
      style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        marginBottom: 12,
        width: '100%',
        border: 'none',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        textAlign: 'left',
        padding: 0,
        display: 'block',
      }}>
      <div style={{ position: 'relative', height: 260, background: '#CED8C7', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
        {imageUrl && (
          <>
            <img
              src={imageUrl}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: `${imagePosition?.x ?? 50}% ${imagePosition?.y ?? 50}%`,
                filter: 'blur(18px)',
                transform: 'scale(1.15)',
                display: 'block',
              }}
            />
            <img
              src={imageUrl}
              alt={item.name_en}
              loading="lazy"
              decoding="async"
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
        )}
        <div style={{
          position: 'absolute',
          bottom: 10,
          left: 12,
          background: '#C9A84C',
          color: '#fff',
          fontFamily: 'Georgia, serif',
          fontWeight: 'bold',
          fontSize: 12,
          padding: '4px 12px',
          borderRadius: 999,
        }}>
          #1 Most loved
        </div>
      </div>
      <div style={{ padding: '12px 16px 14px' }}>
        <p style={{
          fontFamily: 'Georgia, serif',
          fontSize: 18,
          color: '#5F6430',
          margin: '0 0 6px',
          fontWeight: 'normal',
        }}>
          {item.name_en}
        </p>
        <p style={{ fontWeight: 'bold', fontSize: 14, color: '#2D1E14', margin: 0 }}>
          {format(price, priceCurrency)}
        </p>
      </div>
    </button>
  )
}

function RowCard({ item, rank, categories, onOpenSheet }) {
  const { format } = useCurrency()
  const first = item.variants?.[0]
  const imageUrl = first ? first.imageUrl : item.imageUrl
  const imagePosition = first ? first.imagePosition : item.imagePosition
  const price = first ? first.price : item.price
  const priceCurrency = first ? first.priceCurrency : item.priceCurrency
  const category = categories.find((c) => c.id === item.categoryId)

  return (
    <button
      onClick={() => onOpenSheet?.(item, 0)}
      style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        marginBottom: 10,
        width: '100%',
        border: 'none',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        textAlign: 'left',
      }}>
      <span style={{
        fontFamily: 'Georgia, serif',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#C9A84C',
        minWidth: 28,
        textAlign: 'center',
        flexShrink: 0,
      }}>
        {rank}
      </span>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 12,
        overflow: 'hidden',
        background: '#CED8C7',
        flexShrink: 0,
      }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={item.name_en}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: `${imagePosition?.x ?? 50}% ${imagePosition?.y ?? 50}%`,
              display: 'block',
            }}
          />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'Georgia, serif',
          fontSize: 15,
          color: '#5F6430',
          margin: '0 0 3px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          fontWeight: 'normal',
        }}>
          {item.name_en}
        </p>
        {category && (
          <p style={{ fontSize: 12, color: '#5C7249', margin: 0 }}>
            {category.name_en}
          </p>
        )}
      </div>
      <p style={{ fontWeight: 'bold', fontSize: 13, color: '#2D1E14', margin: 0, flexShrink: 0 }}>
        {format(price, priceCurrency)}
      </p>
    </button>
  )
}

export default function BestSellersPage({ items, categories, onBack, onOpenSheet }) {
  const bestSellers = items
    .filter((i) => i.isBestSeller && i.status !== 'unavailable')
    .sort((a, b) => {
      const catA = categories.find((c) => c.id === a.categoryId)?.order ?? 999
      const catB = categories.find((c) => c.id === b.categoryId)?.order ?? 999
      if (catA !== catB) return catA - catB
      return (a.order ?? 0) - (b.order ?? 0)
    })

  const [top, ...rest] = bestSellers

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
    >
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        position: 'sticky',
        top: 56,
        zIndex: 10,
        background: '#D8DFD2',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <button
          onClick={onBack}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.08)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: '#2D1E14',
            flexShrink: 0,
          }}
        >
          ←
        </button>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 20,
          color: '#5F6430',
          margin: 0,
          fontWeight: 'normal',
        }}>
          Best Sellers
        </h2>
      </div>

      {/* Rug band strip */}
      <div style={{
        height: 10,
        backgroundImage: 'url("/rug-band.png")',
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 10px',
        backgroundPosition: 'center',
      }} />

      {/* Content */}
      <div style={{ padding: '16px 16px 80px' }}>
        <p style={{
          fontSize: 13,
          color: '#5F6430',
          margin: '0 0 16px',
          textAlign: 'center',
          fontFamily: 'Lato, sans-serif',
        }}>
          What our guests order most
        </p>

        {top && <TopCard item={top} categories={categories} onOpenSheet={onOpenSheet} />}

        {rest.map((item, i) => (
          <RowCard key={item.id} item={item} rank={i + 2} categories={categories} onOpenSheet={onOpenSheet} />
        ))}

        {!bestSellers.length && (
          <p style={{ textAlign: 'center', color: '#7D6358', fontSize: 14, paddingTop: 32, fontFamily: 'Lato, sans-serif' }}>
            No best sellers yet.
          </p>
        )}
      </div>
    </motion.div>
  )
}
