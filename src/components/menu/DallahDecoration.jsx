import { motion } from 'framer-motion'

export default function DallahDecoration({ className = '' }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Lid */}
        <ellipse cx="100" cy="42" rx="28" ry="8" fill="#7B956A" opacity="0.9" />
        <rect x="88" y="28" width="24" height="16" rx="12" fill="#7B956A" opacity="0.9" />
        {/* Knob */}
        <circle cx="100" cy="24" r="7" fill="#A8BF97" />

        {/* Body */}
        <path
          d="M60 50 Q55 80 52 110 Q48 145 55 175 Q65 210 100 218 Q135 210 145 175 Q152 145 148 110 Q145 80 140 50 Z"
          fill="#7B956A"
          opacity="0.9"
        />

        {/* Body highlight */}
        <path
          d="M72 55 Q68 85 66 115 Q63 148 68 175 Q72 192 83 204"
          stroke="#A8BF97"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Spout */}
        <path
          d="M52 95 Q30 88 22 75 Q16 65 20 55 Q24 46 34 50 Q42 53 48 68"
          stroke="#7B956A"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M52 95 Q30 88 22 75 Q16 65 20 55 Q24 46 34 50 Q42 53 48 68"
          stroke="#A8BF97"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />

        {/* Handle */}
        <path
          d="M145 85 Q175 85 178 110 Q181 135 155 138"
          stroke="#7B956A"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />

        {/* Base */}
        <ellipse cx="100" cy="218" rx="46" ry="10" fill="#5C7249" opacity="0.8" />
        <rect x="70" y="218" width="60" height="10" rx="5" fill="#5C7249" opacity="0.9" />
        <ellipse cx="100" cy="228" rx="38" ry="7" fill="#4a5e39" opacity="0.7" />

        {/* Decorative band */}
        <path
          d="M62 130 Q100 126 138 130"
          stroke="#A8BF97"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M60 138 Q100 134 140 138"
          stroke="#A8BF97"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />

        {/* Islamic geometric pattern on body */}
        <g opacity="0.25" stroke="#FFF8EB" strokeWidth="1" fill="none">
          <polygon points="100,95 108,104 100,113 92,104" />
          <polygon points="85,104 93,113 85,122 77,113" />
          <polygon points="115,104 123,113 115,122 107,113" />
        </g>

        {/* Steam/pour drops */}
        <motion.g
          animate={{ opacity: [0, 1, 0], y: [0, -15, -30] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <circle cx="21" cy="48" r="2.5" fill="#C9A84C" opacity="0.7" />
          <circle cx="26" cy="38" r="1.8" fill="#C9A84C" opacity="0.5" />
          <circle cx="17" cy="35" r="1.5" fill="#C9A84C" opacity="0.4" />
        </motion.g>
      </svg>
    </motion.div>
  )
}
