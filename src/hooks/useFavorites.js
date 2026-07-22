import { useLocalStorage } from './useLocalStorage'

// Favorites are stored as an array of filenames (unique enough within this
// site's scope) so the list survives reloads without any backend.
export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('archive:favorites', [])

  const isFavorite = (filename) => favorites.includes(filename)

  const toggleFavorite = (filename) => {
    setFavorites((prev) =>
      prev.includes(filename) ? prev.filter((f) => f !== filename) : [...prev, filename]
    )
  }

  return { favorites, isFavorite, toggleFavorite }
}
