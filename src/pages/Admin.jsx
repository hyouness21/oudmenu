import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import AdminSidebar from '../components/admin/AdminSidebar'
import CategoryManager from '../components/admin/CategoryManager'
import ItemManager from '../components/admin/ItemManager'
import ExchangeRate from '../components/admin/ExchangeRate'
import QRCodeSection from '../components/admin/QRCodeSection'
import PasswordChange from '../components/admin/PasswordChange'

export default function Admin() {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user) return <Navigate to="/admin" replace />

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 min-h-screen sticky top-0">
        <AdminSidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden"
            >
              <AdminSidebar onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-4 px-4 py-3 bg-surface border-b border-surface-2 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-brown text-2xl font-bold"
          >
            ☰
          </button>
          <h1 className="font-playfair text-brown font-bold text-lg">Oud Admin</h1>
        </div>

        <Routes>
          <Route index element={<Navigate to="categories" replace />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="items" element={<ItemManager />} />
          <Route path="rate" element={<ExchangeRate />} />
          <Route path="qr" element={<QRCodeSection />} />
          <Route path="password" element={<PasswordChange />} />
        </Routes>
      </main>
    </div>
  )
}
