import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import SearchBar from '../components/SearchBar'
import ResourceCard from '../components/ResourceCard'
import EmptyState from '../components/EmptyState'
import LoadingSpinner from '../components/LoadingSpinner'
import './SearchPage.css'

// All filtering happens client-side against the already-loaded JSON —
// there is no server round-trip, so results update instantly as you type.
export default function SearchPage({ resources }) {
  const { status, allFiles } = resources
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    // Keep the URL in sync so results are shareable/bookmarkable.
    const next = new URLSearchParams(searchParams)
    if (query) next.set('q', query)
    else next.delete('q')
    setSearchParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allFiles.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.categoryName.toLowerCase().includes(q) ||
        f.description?.toLowerCase().includes(q)
    )
  }, [allFiles, query])

  if (status === 'loading') return <LoadingSpinner />

  return (
    <div className="container page-enter search-page">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />

      <h1 className="search-page__title">Search the library</h1>
      <div className="search-page__bar">
        <SearchBar
          value={query}
          onChange={setQuery}
          autoFocus
          large
          placeholder="Search by name, topic, or category…"
        />
      </div>

      {!query.trim() && (
        <EmptyState
          title="Start typing to search"
          message="Search matches file names, descriptions, and category names."
        />
      )}

      {query.trim() && results.length === 0 && (
        <EmptyState
          title={`No results for "${query}"`}
          message="Try a broader term, or check the category pages directly."
        />
      )}

      {results.length > 0 && (
        <>
          <p className="search-page__count">
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </p>
          <div className="resource-list">
            {results.map((file) => (
              <ResourceCard key={`${file.folder}/${file.filename}`} file={file} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
