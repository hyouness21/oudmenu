export default function IslamicPattern({ opacity = 0.06, color = '#C9A84C' }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="islamic" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          {/* 8-pointed star */}
          <g fill="none" stroke={color} strokeWidth="0.8" opacity={opacity * 16}>
            <polygon points="30,10 34,22 46,18 38,28 46,38 34,34 30,46 26,34 14,38 22,28 14,18 26,22" />
            <rect x="18" y="18" width="24" height="24" transform="rotate(45 30 30)" />
            <rect x="15" y="15" width="30" height="30" />
            <circle cx="30" cy="30" r="8" />
            {/* Corner decorations */}
            <circle cx="0" cy="0" r="3" />
            <circle cx="60" cy="0" r="3" />
            <circle cx="0" cy="60" r="3" />
            <circle cx="60" cy="60" r="3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic)" />
    </svg>
  )
}
