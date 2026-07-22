import { useNavigate } from 'react-router-dom'
import { FileText, FolderOpen } from 'lucide-react'
import SearchBar from './SearchBar'
import './Hero.css'

// The hero doubles as the site's primary command bar — for a resource
// library, "find the file" is the single most important job on the page.
export default function Hero({ siteTitle, tagline, totalResources, categoryCount }) {
  const navigate = useNavigate()

  const handleSearch = (query) => {
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
  }

  return (
    <section className="hero">
      <div className="container hero__inner">
        <span className="hero__eyebrow">Study materials, indexed</span>
        <h1 className="hero__title">
          {siteTitle}<span className="hero__cursor" aria-hidden="true">_</span>
        </h1>
        <p className="hero__tagline">{tagline}</p>

        <div className="hero__search-wrap">
          <SearchBar onSearch={handleSearch} large placeholder="Search “TCP”, “recursion”, “Networks”…" />
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <FileText size={16} aria-hidden="true" />
            <span><strong>{totalResources}</strong> resources</span>
          </div>
          <div className="hero__stat">
            <FolderOpen size={16} aria-hidden="true" />
            <span><strong>{categoryCount}</strong> categories</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-dot" aria-hidden="true" />
            <span>Free to download, no sign-in</span>
          </div>
        </div>
      </div>
    </section>
  )
}
