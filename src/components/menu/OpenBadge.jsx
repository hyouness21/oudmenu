import { useState, useEffect } from 'react'

function getIsOpen() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Beirut',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const hour = parseInt(parts.find((p) => p.type === 'hour').value, 10)
  const minute = parseInt(parts.find((p) => p.type === 'minute').value, 10)
  const total = hour * 60 + minute
  return total >= 10 * 60 || total < 2 * 60 // 10:00 to 02:00
}

export default function OpenBadge() {
  const [isOpen, setIsOpen] = useState(getIsOpen)

  useEffect(() => {
    const id = setInterval(() => setIsOpen(getIsOpen()), 60_000)
    return () => clearInterval(id)
  }, [])

  const color = isOpen ? '#5C7249' : '#5F6430'
  const dotColor = isOpen ? '#5C7249' : '#C0392B'

  return (
    <span
      aria-live="polite"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'flex-start',
        background: '#FFFAF0',
        borderRadius: 999,
        padding: '5px 12px',
        fontFamily: 'Lato, sans-serif',
        fontWeight: 700,
        fontSize: 12,
        color,
        boxShadow: '0 2px 6px rgba(0,0,0,.15)',
        marginBottom: 10,
      }}
    >
      <span style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: dotColor,
        flexShrink: 0,
      }} />
      {isOpen ? 'Open now · until 2 am' : 'Closed · opens at 10 am'}
    </span>
  )
}
