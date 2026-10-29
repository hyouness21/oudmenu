import { useEffect } from 'react'

// The visual loader lives in index.html and starts before the JS bundle loads.
// This component's only job is to tell that loader when all data is ready.
export default function TeaLoader({ categoriesLoading, itemsLoading, settingsLoading }) {
  useEffect(() => {
    if (!categoriesLoading && !itemsLoading && !settingsLoading) {
      window.oudLoaderDone?.()
    }
  }, [categoriesLoading, itemsLoading, settingsLoading])

  return null
}
