export default function CategoryCarousel({ categories, onSelect }) {
  if (!categories.length) return null

  return (
    <div style={{ padding: '0 16px' }}>

      {/* SVG defs — rendered once, referenced by every button */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <pattern id="rugBand" patternUnits="userSpaceOnUse" width="107.6" height="80">
            <image href="/rug-band.png" width="107.6" height="80" preserveAspectRatio="none" />
          </pattern>
          <path
            id="rugFrame"
            d="M100,1 C106,1 109,9 116,9 L166,9 C166,18 172,23 182,23 C184,31 192,36 199,40
               C192,44 184,49 182,57 C172,57 166,62 166,71 L116,71 C109,71 106,79 100,79
               C94,79 91,71 84,71 L34,71 C34,62 28,57 18,57 C16,49 8,44 1,40
               C8,36 16,31 18,23 C28,23 34,18 34,9 L84,9 C91,9 94,1 100,1Z"
          />
        </defs>
      </svg>

      {/* 2-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        justifyItems: 'center',
      }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '240px',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: 0,
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.2))',
              transition: 'transform .15s, filter .15s',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'
              e.currentTarget.style.filter = 'drop-shadow(0 5px 7px rgba(0,0,0,.25)) brightness(1.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.filter = 'drop-shadow(0 2px 3px rgba(0,0,0,.2))'
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(.97)' }}
            onMouseUp={e => { e.currentTarget.style.transform = '' }}
          >
            <svg viewBox="-2 -2 204 84" aria-hidden="true" style={{ display: 'block', width: '100%', height: 'auto' }}>
              <use href="#rugFrame" fill="url(#rugBand)" stroke="none" />
              <use href="#rugFrame" transform="translate(100 40) scale(.9 .76) translate(-100 -40)" fill="#f7f2e2" />
              <use href="#rugFrame" transform="translate(100 40) scale(.95 .87) translate(-100 -40)" fill="none" stroke="#fffaf0" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Label */}
            <span style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 22px',
              textAlign: 'center',
            }}>
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(13px, 3.5vw, 18px)',
                color: '#5f6430',
                lineHeight: 1.2,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {cat.name_en}
              </span>
            </span>
          </button>
        ))}

        {/* OUD BOX — hardcoded special category */}
        <button
          onClick={() => onSelect('__oudbox__')}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '240px',
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            padding: 0,
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.2))',
            transition: 'transform .15s, filter .15s',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'
            e.currentTarget.style.filter = 'drop-shadow(0 5px 7px rgba(0,0,0,.25)) brightness(1.06)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.filter = 'drop-shadow(0 2px 3px rgba(0,0,0,.2))'
          }}
          onMouseDown={e => { e.currentTarget.style.transform = 'scale(.97)' }}
          onMouseUp={e => { e.currentTarget.style.transform = '' }}
        >
          <svg viewBox="-2 -2 204 84" aria-hidden="true" style={{ display: 'block', width: '100%', height: 'auto' }}>
            <use href="#rugFrame" fill="url(#rugBand)" stroke="none" />
            <use href="#rugFrame" transform="translate(100 40) scale(.9 .76) translate(-100 -40)" fill="#f7f2e2" />
            <use href="#rugFrame" transform="translate(100 40) scale(.95 .87) translate(-100 -40)" fill="none" stroke="#fffaf0" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          </svg>
          <span style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 22px',
            textAlign: 'center',
          }}>
            <span style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(13px, 3.5vw, 18px)',
              color: '#5f6430',
              lineHeight: 1.2,
              fontWeight: 'bold',
              letterSpacing: '0.05em',
            }}>
              OUD BOX
            </span>
          </span>
        </button>
      </div>
    </div>
  )
}
