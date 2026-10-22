import { useCurrency } from '../../contexts/CurrencyContext'

export default function OudBoxPage({ categories, items, loading, onBack }) {
  const { format } = useCurrency()

  // Only items marked isOudBox, grouped by categoryId
  const oudBoxItems = items.filter((i) => i.isOudBox && i.status !== 'unavailable')

  // Build groups: [{category, items}] in category order
  const groups = categories
    .map((cat) => ({
      category: cat,
      items: oudBoxItems.filter((i) => i.categoryId === cat.id),
    }))
    .filter((g) => g.items.length > 0)

  const getPrice = (item) => {
    if (item.variants?.length > 0) {
      const v = item.variants[0]
      return format(v.price, v.priceCurrency)
    }
    return format(item.price, item.priceCurrency)
  }

  return (
    <div className="pb-8">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-4 sticky top-14 z-10 bg-[#D8DFD2] border-b border-black/10">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-brown hover:bg-black/20 transition-colors text-sm"
        >
          ←
        </button>
        <h2 className="text-brown font-bold text-lg font-playfair tracking-wide">OUD BOX</h2>
      </div>

      <div className="px-5 mt-6 flex flex-col gap-8">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-brown/20 border-t-brown animate-spin" />
          </div>
        ) : groups.length === 0 ? (
          <p className="text-text-muted text-sm text-center py-12">No items added yet.</p>
        ) : null}
        {groups.map(({ category, items: catItems }) => (
          <div key={category.id}>
            {/* Section header */}
            <div className="mb-3 pb-1 border-b-2 border-brown/30">
              <span className="text-brown font-bold text-base font-playfair uppercase tracking-wider">
                {category.name_en || category.name || 'Category'}
              </span>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-2">
              {catItems.map((item) => (
                <div key={item.id} className="flex items-baseline justify-between gap-4">
                  <span className="text-text text-sm font-lato">{item.name_en}</span>
                  <span className="text-brown font-semibold text-sm font-lato whitespace-nowrap">
                    {getPrice(item)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
