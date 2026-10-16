import { AnimatePresence, motion } from 'framer-motion'
import { useCurrency } from '../../contexts/CurrencyContext'
import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'

export default function MenuHeader() {
  const { currency, toggleCurrency } = useCurrency()

  return (
    <header className="sticky top-0 z-30 bg-[#120C05]/25 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-5 h-14">

        {/* Logo — left */}
        <Link to="/admin">
          <Logo variant="gold" className="h-8 w-auto" />
        </Link>

      </div>
    </header>
  )
}
