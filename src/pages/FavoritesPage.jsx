import { useMemo } from 'react'
import { Star } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import ResourceCard from '../components/ResourceCard'
import EmptyState from '../components/EmptyState'
import LoadingSpinner from '../components/LoadingSpinner'
import { useFavorites } from '../hooks/useFavorites'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import './FavoritesPage.css'

export default function FavoritesPage({ resources }) {
  const { status, allFiles } = resources
  const { favorites } = useFavorites()
  const { recent } = useRecentlyViewed()

  const favoriteFiles = useMemo(
    () => allFiles.filter((f) => favorites.includes(f.filename)),
    [allFiles, favorites]
  )

  const recentFiles = useMemo(
    () =>
      recent
        .map((filename) => allFiles.find((f) => f.filename === filename))
        .filter(Boolean),
    [allFiles, recent]
  )

  if (status === 'loading') return <LoadingSpinner />

  return (
    <div className="container page-enter favorites-page">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Favorites' }]} />

      <div className="favorites-page__header">
        <Star size={22} className="favorites-page__icon" />
        <h1>Your favorites</h1>
      </div>
      <p className="favorites-page__hint">
        Saved locally in this browser — star any resource to add it here.
      </p>

      {favoriteFiles.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No favorites yet"
          message="Tap the star on any resource card to save it for quick access."
        />
      ) : (
        <div className="resource-list favorites-page__list">
          {favoriteFiles.map((file) => (
            <ResourceCard key={`${file.folder}/${file.filename}`} file={file} />
          ))}
        </div>
      )}

      {recentFiles.length > 0 && (
        <section className="favorites-page__recent">
          <h2>Recently viewed</h2>
          <div className="resource-list">
            {recentFiles.map((file) => (
              <ResourceCard key={`recent-${file.folder}/${file.filename}`} file={file} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
