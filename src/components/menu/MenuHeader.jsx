import { AnimatePresence, motion } from 'framer-motion'
import { useCurrency } from '../../contexts/CurrencyContext'
import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'

export default function MenuHeader() {
  const { currency, toggleCurrency } = useCurrency()

  return (
    <header className="sticky top-0 z-30 bg-[#dbe2d6] border-b border-black/10">
      <div className="flex items-center justify-center px-5 h-14">

        <Link to="/admin">
          <Logo variant="gold" className="h-8 w-auto" />
        </Link>

      </div>
    </header>
  )
}
