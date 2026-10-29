import { useCurrency } from '../../contexts/CurrencyContext'
import { useMenu } from '../../contexts/MenuContext'

function ArchCard({ item, rank, onClick }) {
  const { format } = useCurrency()
  const first = item.variants?.[0]
  const imageUrl = first ? first.imageUrl : item.imageUrl
  const imagePosition = first ? first.imagePosition : item.imagePosition
  const price = first ? first.price : item.price
  const priceCurrency = first ? first.priceCurrency : item.priceCurrency

  return (
    <button
      onClick={onClick}
      style={{
        width: 124,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        scrollSnapAlign: 'start',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Arch frame + medallion */}
      <div style={{ position: 'relative', width: '100%', marginBottom: 24 }}>
        {/* Outer leaf green */}
        <div style={{
          background: '#5C7249',
          padding: 4,
          borderRadius: '62px 62px 14px 14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          {/* Cream mat */}
          <div style={{
            background: '#FFFAF0',
            padding: 5,
            borderRadius: '58px 58px 11px 11px',
          }}>
            {/* Gold line */}
            <div style={{
              border: '1.5px solid #C9A84C',
              padding: 4,
              borderRadius: '53px 53px 8px 8px',
              lineHeight: 0,
            }}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.name_en}
                  loading="lazy"
                  style={{
                    height: 118,
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: `${imagePosition?.x ?? 50}% ${imagePosition?.y ?? 50}%`,
                    borderRadius: '48px 48px 5px 5px',
                    display: 'block',
                  }}
                />
              ) : (
                <div style={{
                  height: 118,
                  background: '#CED8C7',
                  borderRadius: '48px 48px 5px 5px',
                }} />
              )}
            </div>
          </div>
        </div>
        {/* Rank medallion — center aligned with arch bottom edge */}
        <div style={{
          position: 'absolute',
          bottom: -16,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#C9A84C',
          border: '3px solid #FFFAF0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          fontWeight: 'bold',
          color: '#2D1E14',
          fontSize: 13,
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          zIndex: 1,
        }}>
          {rank}
        </div>
      </div>

      {/* Name and price */}
      <div style={{ textAlign: 'center', padding: '0 4px', width: '100%' }}>
        <p style={{
          fontFamily: 'Georgia, serif',
          fontSize: 15,
          color: '#5F6430',
          lineHeight: 1.3,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          margin: '0 0 4px',
          fontWeight: 'normal',
        }}>
          {item.name_en}
        </p>
        <p style={{ fontWeight: 'bold', fontSize: 12, color: '#2D1E14', margin: 0 }}>
          {format(price, priceCurrency)}
        </p>
      </div>
    </button>
  )
}

export default function BestSellers({ items, onSeeAll }) {
  const { categories } = useMenu()

  const bestSellers = items
    .filter((i) => i.isBestSeller && i.status !== 'unavailable')
    .sort((a, b) => {
      const catA = categories.find((c) => c.id === a.categoryId)?.order ?? 999
      const catB = categories.find((c) => c.id === b.categoryId)?.order ?? 999
      if (catA !== catB) return catA - catB
      return (a.order ?? 0) - (b.order ?? 0)
    })
    .slice(0, 6)

  if (!bestSellers.length) return null

  return (
    <section style={{ background: '#ffffff', paddingTop: 20, paddingBottom: 24 }}>
      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 16,
      }}>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 19,
          color: '#5F6430',
          margin: 0,
          fontWeight: 'normal',
        }}>
          Best <em>sellers</em>
        </h2>
        <button
          onClick={onSeeAll}
          style={{
            background: '#5C7249',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 13,
            border: 'none',
            borderRadius: 999,
            minHeight: 34,
            padding: '0 14px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontFamily: 'Lato, sans-serif',
          }}
        >
          See all ›
        </button>
      </div>

      {/* Horizontal scroll row */}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: 14,
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 8,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {bestSellers.map((item, i) => (
          <ArchCard
            key={item.id}
            item={item}
            rank={i + 1}
            onClick={onSeeAll}
          />
        ))}
      </div>
    </section>
  )
}
