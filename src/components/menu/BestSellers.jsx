import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCurrency } from '../../contexts/CurrencyContext'

function BestSellerCard({ item, index }) {
  const { format, currency } = useCurrency()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.07 }}
      className="bg-white rounded-2xl p-4 flex flex-col items-center text-center shadow-sm border border-surface-2 flex-shrink-0 w-40"
    >
      <div className="w-28 h-28 rounded-full overflow-hidden bg-surface mb-3 flex-shrink-0">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name_en}
            className="w-full h-full object-cover"
            style={{ objectPosition: `${item.imagePosition?.x ?? 50}% ${item.imagePosition?.y ?? 50}%` }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-2">
            <span className="text-2xl opacity-20">☕</span>
          </div>
        )}
      </div>

      <h3 className="font-semibold text-brown text-xs leading-snug mb-1 line-clamp-2 font-playfair">
        {item.name_en}
      </h3>

      {item.description_en && (
        <p className="text-text-muted text-xs leading-relaxed line-clamp-2 mb-2">
          {item.description_en}
        </p>
      )}

      <AnimatePresence mode="wait">
        <motion.p
          key={currency}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-brown font-bold text-xs mt-auto"
        >
          {format(item.price, item.priceCurrency)}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}

export default function BestSellers({ items }) {
  const [showAll, setShowAll] = useState(false)
  const bestSellers = items.filter((i) => i.isBestSeller).slice(0, 6)
  const visible = showAll ? bestSellers : bestSellers.slice(0, 2)
  const hasMore = bestSellers.length > 2

  if (!bestSellers.length) return null

  return (
    <section className="bg-[#FBF5EB] py-10 px-5">
      <div className="text-center mb-6">
        <p className="text-text-muted text-xs tracking-widest uppercase font-lato mb-1">— Best Sellers —</p>
        <p className="text-text-light text-xs mt-1 font-lato">Our most popular picks loved by everyone</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {visible.map((item, i) => (
          <BestSellerCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="text-brown text-xs font-semibold border border-brown/30 rounded-full px-5 py-2 hover:bg-brown hover:text-white transition-all font-lato tracking-wide"
          >
            {showAll ? 'Show Less' : 'View More'}
          </button>
        </div>
      )}
    </section>
  )
}
