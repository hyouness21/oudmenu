export default function MenuSearch({ query, setQuery }) {
  return (
    <div style={{ padding: '16px 16px 0', background: '#fff' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 46,
        background: '#F7F2E2',
        border: '1px solid #D8DFD2',
        borderRadius: 999,
        padding: '0 14px',
      }}>
        {/* Magnifying glass */}
        <svg
          width="18" height="18" viewBox="0 0 18 18"
          fill="none" stroke="#5F6430" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0 }}
          aria-hidden="true"
        >
          <circle cx="7.5" cy="7.5" r="5" />
          <line x1="11.5" y1="11.5" x2="16" y2="16" />
        </svg>

        <label
          htmlFor="menu-search"
          style={{
            position: 'absolute',
            width: 1, height: 1,
            padding: 0, margin: -1,
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          Search menu items
        </label>

        <input
          id="menu-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search: latte, mojito, shisha…"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          style={{
            flex: 1,
            minWidth: 0,
            background: 'none',
            border: 'none',
            outline: 'none',
            fontFamily: 'Lato, sans-serif',
            fontSize: 16,
            color: '#3D2B1F',
          }}
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: '#D8DFD2',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              padding: 0,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#5F6430" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <line x1="1" y1="1" x2="9" y2="9" />
              <line x1="9" y1="1" x2="1" y2="9" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
