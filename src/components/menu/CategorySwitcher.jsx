import { motion, AnimatePresence } from 'framer-motion'

export default function CategorySwitcher({ categories, selectedCategoryId, open, setOpen, onSwitch }) {
  const allItems = [
    ...categories.map((c) => ({ id: c.id, name: c.name_en })),
    { id: '__oudbox__', name: 'OUD BOX' },
  ]

  const handleSelect = (id) => {
    onSwitch(id)
    setOpen(false)
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(45,30,20,0.35)' }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed z-50" style={{ left: 16, bottom: 24 }}>

        {/* Panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                bottom: 72,
                left: 0,
                width: 230,
                background: '#FBF5EB',
                borderRadius: 20,
                padding: 8,
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                maxHeight: '60vh',
                overflowY: 'auto',
              }}
            >
              <p style={{
                fontSize: 11,
                letterSpacing: '0.12em',
                color: '#7D6358',
                textTransform: 'uppercase',
                padding: '4px 8px 8px',
                fontFamily: 'Lato, sans-serif',
              }}>
                Categories
              </p>

              {allItems.map((item) => {
                const isActive = item.id === selectedCategoryId
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    style={{
                      width: '100%',
                      minHeight: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 12,
                      border: 'none',
                      cursor: 'pointer',
                      background: isActive ? '#D8DFD2' : 'transparent',
                      color: '#2D1E14',
                      fontFamily: isActive ? '"Playfair Display", serif' : 'Lato, sans-serif',
                      fontWeight: isActive ? 'bold' : 'normal',
                      fontSize: 14,
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#2D1E14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <polyline points="2,8 6,12 14,4" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close categories' : 'Categories'}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'rgba(52, 71, 47, 0.75)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            transition: 'transform 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = '' }}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round">
              <line x1="4" y1="4" x2="18" y2="18" />
              <line x1="18" y1="4" x2="4" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="12" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="12" width="7" height="7" rx="1.5" />
              <rect x="12" y="12" width="7" height="7" rx="1.5" />
            </svg>
          )}
        </button>
      </div>
    </>
  )
}
