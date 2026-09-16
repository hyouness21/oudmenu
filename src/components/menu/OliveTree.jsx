import { motion } from 'framer-motion'

function Leaf({ x, y, r, delay, size = 1 }) {
  return (
    <motion.ellipse
      cx={x} cy={y} rx={4 * size} ry={2.2 * size}
      fill="#7B956A"
      transform={`rotate(${r} ${x} ${y})`}
      animate={{ rotate: [r - 3, r + 3, r - 3] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

export default function OliveTree({ className = '', flip = false }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={flip ? { transform: 'scaleX(-1)' } : {}}
    >
      <svg viewBox="0 0 160 280" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* Planter box (like in the shop) */}
        <rect x="52" y="240" width="56" height="30" rx="4" fill="#E8D5B7" />
        <rect x="48" y="236" width="64" height="10" rx="3" fill="#D4BC99" />
        <line x1="80" y1="240" x2="80" y2="270" stroke="#C9A57A" strokeWidth="1" opacity="0.5" />

        {/* Soil */}
        <ellipse cx="80" cy="240" rx="28" ry="5" fill="#8B6B3D" opacity="0.4" />

        {/* Main trunk */}
        <path
          d="M80 238 C78 220 75 200 78 180 C80 165 77 150 80 130"
          stroke="#6B4E2A"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Trunk texture */}
        <path
          d="M80 238 C79 220 76 200 79 180 C81 165 78 150 80 130"
          stroke="#8B6B3D"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Branch left */}
        <path d="M78 185 C65 178 50 170 40 158" stroke="#6B4E2A" strokeWidth="4.5" strokeLinecap="round" />
        {/* Branch right */}
        <path d="M79 175 C92 165 108 155 118 145" stroke="#6B4E2A" strokeWidth="4" strokeLinecap="round" />
        {/* Branch mid-left */}
        <path d="M79 155 C68 148 55 142 48 132" stroke="#6B4E2A" strokeWidth="3.5" strokeLinecap="round" />
        {/* Branch mid-right */}
        <path d="M80 145 C90 136 102 128 108 118" stroke="#6B4E2A" strokeWidth="3" strokeLinecap="round" />

        {/* Canopy - layered leaf clusters */}
        {/* Main canopy blob */}
        <motion.ellipse
          cx="80" cy="100" rx="52" ry="45"
          fill="#7B956A"
          animate={{ scaleX: [1, 1.02, 1], scaleY: [1, 0.98, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '80px 100px' }}
        />

        {/* Secondary blobs for organic shape */}
        <ellipse cx="50" cy="115" rx="30" ry="26" fill="#6B8A5A" />
        <ellipse cx="112" cy="108" rx="28" ry="24" fill="#6B8A5A" />
        <ellipse cx="72" cy="70" rx="32" ry="28" fill="#8BA978" />
        <ellipse cx="100" cy="75" rx="28" ry="25" fill="#7B956A" />
        <ellipse cx="60" cy="88" rx="26" ry="22" fill="#8BA978" />
        <ellipse cx="95" cy="125" rx="25" ry="20" fill="#6B8A5A" />

        {/* Highlight on canopy */}
        <ellipse cx="70" cy="75" rx="20" ry="16" fill="#A8BF97" opacity="0.35" />
        <ellipse cx="95" cy="68" rx="14" ry="12" fill="#A8BF97" opacity="0.25" />

        {/* Individual leaves scattered */}
        <Leaf x={45} y={100} r={-30} delay={0} />
        <Leaf x={52} y={78} r={20} delay={0.3} />
        <Leaf x={115} y={95} r={45} delay={0.6} />
        <Leaf x={108} y={118} r={-20} delay={0.9} />
        <Leaf x={78} y={55} r={10} delay={0.4} />
        <Leaf x={95} y={52} r={-15} delay={0.7} />
        <Leaf x={62} y={128} r={35} delay={1.1} />
        <Leaf x={100} y={135} r={-40} delay={0.2} />
        <Leaf x={35} y={110} r={-50} delay={0.8} />
        <Leaf x={120} y={105} r={60} delay={0.5} />

        {/* Small olives */}
        <circle cx="55" cy="108" r="3" fill="#9CAD6E" opacity="0.8" />
        <circle cx="105" cy="100" r="2.5" fill="#9CAD6E" opacity="0.8" />
        <circle cx="75" cy="125" r="2.5" fill="#9CAD6E" opacity="0.7" />
        <circle cx="88" cy="85" r="2" fill="#9CAD6E" opacity="0.7" />
        <circle cx="68" cy="92" r="2" fill="#7A9055" opacity="0.8" />
        <circle cx="98" cy="118" r="2.5" fill="#9CAD6E" opacity="0.7" />

        {/* Subtle shadow */}
        <ellipse cx="80" cy="244" rx="32" ry="5" fill="#2D1E14" opacity="0.08" />
      </svg>
    </motion.div>
  )
}
