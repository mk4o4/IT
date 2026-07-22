import { useLocalStorage } from './useLocalStorage'

const MAX_ITEMS = 8

// Tracks the last few resources the visitor opened/downloaded,
// most-recent first, capped at MAX_ITEMS.
export function useRecentlyViewed() {
  const [recent, setRecent] = useLocalStorage('archive:recently-viewed', [])

  const addRecent = (filename) => {
    setRecent((prev) => {
      const withoutDupe = prev.filter((f) => f !== filename)
      return [filename, ...withoutDupe].slice(0, MAX_ITEMS)
    })
  }

  return { recent, addRecent }
}
