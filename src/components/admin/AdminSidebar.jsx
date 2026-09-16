import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import Logo from '../shared/Logo'

const navItems = [
  { label: 'Categories', icon: '◈', path: '/admin/dashboard/categories' },
  { label: 'Items', icon: '☕', path: '/admin/dashboard/items' },
  { label: 'Exchange Rate', icon: '↕', path: '/admin/dashboard/rate' },
  { label: 'QR Code', icon: '⊞', path: '/admin/dashboard/qr' },
  { label: 'Password', icon: '🔑', path: '/admin/dashboard/password' },
]

export default function AdminSidebar({ onClose }) {
  const { logout } = useAuth()

  return (
    <div className="flex flex-col h-full bg-brown text-white">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Logo variant="light" className="w-28" />
        <p className="text-white/40 text-xs mt-2 font-lato tracking-widest uppercase">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gold text-brown'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <span>↩</span> Logout
        </button>
      </div>
    </div>
  )
}
