import { useParams, Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import ResourceCard from '../components/ResourceCard'
import SearchBar from '../components/SearchBar'
import EmptyState from '../components/EmptyState'
import LoadingSpinner from '../components/LoadingSpinner'
import { getCategoryIcon } from '../utils/categoryIcons'
import './CategoryPage.css'

export default function CategoryPage({ resources }) {
  const { categoryId } = useParams()
  const { status, categories } = resources
  const [query, setQuery] = useState('')

  const category = categories.find((c) => c.id === categoryId)
  const Icon = category ? getCategoryIcon(category.icon) : null

  const filteredFiles = useMemo(() => {
    if (!category) return []
    if (!query.trim()) return category.files
    const q = query.toLowerCase()
    return category.files.filter(
      (f) => f.title.toLowerCase().includes(q) || f.description?.toLowerCase().includes(q)
    )
  }, [category, query])

  if (status === 'loading') return <LoadingSpinner />

  if (status === 'ready' && !category) {
    return (
      <div className="container page-enter">
        <EmptyState title="Category not found" message="This category doesn't exist or may have been renamed." />
        <div className="category-page__back">
          <Link to="/">← Back to home</Link>
        </div>
      </div>
    )
  }

  if (!category) return null

  const filesWithFolder = filteredFiles.map((f) => ({ ...f, folder: category.folder }))

  return (
    <div className="container page-enter category-page">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: category.name }]} />

      <div className="category-page__header">
        <div className="category-page__icon">
          <Icon size={22} />
        </div>
        <div>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      </div>

      <div className="category-page__toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={`Search in ${category.name}…`}
        />
        <span className="category-page__count">
          {filteredFiles.length} of {category.files.length} files
        </span>
      </div>

      {filesWithFolder.length === 0 ? (
        <EmptyState title="No matching files" message="Try a different search term, or clear the search." />
      ) : (
        <div className="resource-list">
          {filesWithFolder.map((file) => (
            <ResourceCard key={file.filename} file={file} />
          ))}
        </div>
      )}
    </div>
  )
}
