export default function IslamicPattern({ opacity = 0.06, color = '#C9A84C' }) {
  const o = opacity * 16
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="arabesque" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="0.85" opacity={o}>
            {/* Four interlocking arches — classic arabesque petal tile */}
            <path d="M0,30 C15,0 45,0 60,30" />
            <path d="M0,30 C15,60 45,60 60,30" />
            <path d="M30,0 C60,15 60,45 30,60" />
            <path d="M30,0 C0,15 0,45 30,60" />
            {/* Center diamond accent */}
            <polygon points="30,21 39,30 30,39 21,30" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#arabesque)" />
    </svg>
  )
}
