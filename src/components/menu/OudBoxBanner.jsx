export default function OudBoxBanner({ items, onOpen }) {
  const hasItems = items.some((i) => i.isOudBox && i.status !== 'unavailable')
  if (!hasItems) return null

  return (
    <div style={{ padding: '20px 16px 0' }}>
      <button
        onClick={onOpen}
        style={{
          width: '100%',
          background: '#5C7249',
          borderRadius: 18,
          padding: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          border: 'none',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          display: 'block',
          textAlign: 'left',
        }}
      >
        {/* Rug band strip */}
        <div style={{
          height: 10,
          backgroundImage: 'url("/rug-band.png")',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 10px',
          backgroundPosition: 'center',
          borderRadius: '10px 10px 0 0',
        }} />

        {/* Cream panel */}
        <div style={{
          background: '#FFFAF0',
          borderRadius: '0 0 10px 10px',
          padding: 6,
        }}>
          {/* Double frame inner box */}
          <div style={{
            border: '1.5px solid #C9A84C',
            boxShadow: '0 0 0 2px #FFFAF0, 0 0 0 3px #C9A84C',
            borderRadius: 8,
            padding: '12px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            {/* Eight-point star */}
            <svg
              width="36" height="36" viewBox="0 0 36 36"
              fill="none" aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <polygon
                points="18,4 20.3,12.5 27.9,8.1 23.5,15.7 32,18 23.5,20.3 27.9,27.9 20.3,23.5 18,32 15.7,23.5 8.1,27.9 12.5,20.3 4,18 12.5,15.7 8.1,8.1 15.7,12.5"
                stroke="#C9A84C"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="18" cy="18" r="4" fill="#5C7249" />
            </svg>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontWeight: 'bold',
                fontSize: 18,
                letterSpacing: '5px',
                color: '#5F6430',
                margin: '0 0 3px',
                lineHeight: 1,
              }}>
                OUD BOX
              </p>
              <p style={{ fontSize: 12, margin: 0, lineHeight: 1.3 }}>
                <span style={{ fontFamily: 'Cairo, sans-serif', color: '#5C7249' }}>صندوق عود</span>
                <span style={{ fontFamily: 'Lato, sans-serif', color: '#5F6430' }}> · Our favourites, chosen for you</span>
              </p>
            </div>

            {/* Open pill (div inside button — no nested button) */}
            <div style={{
              background: '#5C7249',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 13,
              borderRadius: 999,
              minHeight: 36,
              padding: '0 14px',
              whiteSpace: 'nowrap',
              fontFamily: 'Lato, sans-serif',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
            }}>
              Open ›
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}
