import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { MenuProvider } from './contexts/MenuContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { CurrencyProvider } from './contexts/CurrencyContext'
import Menu from './pages/Menu'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'

export default function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard/*" element={<Admin />} />
            </Routes>
          </CurrencyProvider>
        </LanguageProvider>
      </MenuProvider>
    </AuthProvider>
  )
}
