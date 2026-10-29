import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCurrency } from '../../contexts/CurrencyContext'

function Drawer({ group, isOpen, onToggle, onOpenSheet }) {
  const { format } = useCurrency()
  const { category, items } = group

  const getPrice = (item) => {
    if (item.variants?.length > 0) {
      const v = item.variants[0]
      return format(v.price, v.priceCurrency)
    }
    return format(item.price, item.priceCurrency)
  }

  return (
    <motion.div
      animate={{ marginLeft: isOpen ? -6 : 0, marginRight: isOpen ? -6 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      style={{
        background: isOpen ? '#FFFAF0' : '#F7F2E2',
        border: '1.5px solid #FFFAF0',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: isOpen
          ? '0 8px 24px rgba(0,0,0,0.18)'
          : 'inset 0 -3px 8px rgba(0,0,0,0.08)',
        transition: 'background 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          minHeight: 58,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 14px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          textAlign: 'left',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: 18,
            color: '#5F6430',
            margin: '0 0 2px',
            fontWeight: isOpen ? 'bold' : 'normal',
            lineHeight: 1.2,
          }}>
            {category.name_en || category.name || 'Category'}
          </p>
          <p style={{ fontSize: 12, color: '#5C7249', margin: 0, fontFamily: 'Lato, sans-serif' }}>
            {isOpen ? 'Close' : `${items.length} item${items.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Gold knob */}
        <div style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: '#C9A84C',
          border: '3px solid #FFFAF0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          flexShrink: 0,
        }} />
      </button>

      {/* Animated drawer content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ height: '1.5px', background: '#C9A84C', margin: '0 14px' }} />
            <div style={{ padding: '10px 14px 14px' }}>
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onOpenSheet?.(item, 0)}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    marginBottom: 8,
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    WebkitTapHighlightColor: 'transparent',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 16,
                    color: '#3D2B1F',
                    whiteSpace: 'nowrap',
                    flexShrink: 1,
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {item.name_en}
                  </span>
                  <span style={{
                    flex: 1,
                    display: 'block',
                    borderBottom: '1.5px dotted #879E76',
                    margin: '0 6px 3px',
                    minWidth: 12,
                  }} />
                  <span style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: '#2D1E14',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    fontFamily: 'Lato, sans-serif',
                  }}>
                    {getPrice(item)}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function OudBoxPage({ categories, items, loading, onBack, onOpenSheet }) {
  const oudBoxItems = items.filter((i) => i.isOudBox && i.status !== 'unavailable')

  const groups = categories
    .map((cat) => ({
      category: cat,
      items: oudBoxItems.filter((i) => i.categoryId === cat.id),
    }))
    .filter((g) => g.items.length > 0)

  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-4 sticky top-14 z-10 bg-[#D8DFD2] border-b border-black/10">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-brown hover:bg-black/20 transition-colors text-sm"
        >
          ←
        </button>
        <h2 className="text-brown font-bold text-lg font-playfair tracking-wide">OUD BOX</h2>
      </div>

      {/* Heading */}
      <div style={{ textAlign: 'center', padding: '24px 20px 0' }}>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 'bold',
          fontSize: 26,
          color: '#2D1E14',
          margin: '0 0 6px',
          lineHeight: 1.3,
        }}>
          Our favourites,<br />
          <em style={{ color: '#5C7249', fontStyle: 'italic' }}>kept in a box.</em>
        </h2>
        <p style={{
          fontSize: 13,
          color: '#5F6430',
          fontFamily: 'Lato, sans-serif',
          margin: 0,
        }}>
          Open a drawer to see what's inside
        </p>
      </div>

      {/* Cabinet */}
      <div style={{ margin: '20px 18px 0' }}>
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-brown/20 border-t-brown animate-spin" />
          </div>
        ) : groups.length === 0 ? (
          <p className="text-text-muted text-sm text-center py-12">No items added yet.</p>
        ) : (
          <>
            {/* Lid */}
            <div style={{
              background: '#5C7249',
              borderRadius: '18px 18px 6px 6px',
              padding: '8px 8px 0',
            }}>
              <div style={{
                height: 26,
                backgroundImage: 'url("/rug-band.png")',
                backgroundRepeat: 'repeat-x',
                backgroundSize: 'auto 26px',
                backgroundPosition: 'center',
                borderRadius: '10px 10px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 16px',
              }}>
                <div style={{
                  background: '#FFFAF0',
                  border: '1.5px solid #C9A84C',
                  borderRadius: 8,
                  padding: '3px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: 'Georgia, serif',
                    fontWeight: 'bold',
                    fontSize: 14,
                    letterSpacing: '4px',
                    color: '#5F6430',
                    lineHeight: 1,
                  }}>
                    OUD BOX
                  </span>
                  <span style={{
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: 12,
                    color: '#5C7249',
                    lineHeight: 1,
                  }}>
                    صندوق عود
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{
              background: '#879E76',
              borderRadius: '0 0 18px 18px',
              padding: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            }}>
              {groups.map((group, i) => (
                <Drawer
                  key={group.category.id}
                  group={group}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                  onOpenSheet={onOpenSheet}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
