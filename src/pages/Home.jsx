import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ArrowRight, Clock, GraduationCap } from 'lucide-react'
import Hero from '../components/Hero'
import CategoryCard from '../components/CategoryCard'
import ResourceCard from '../components/ResourceCard'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'
import { getCategoryIcon } from '../utils/categoryIcons'
import './Home.css'

export default function Home({ resources }) {
  const { status, siteTitle, siteTagline, author, institute, categories, totalResources, recentFiles } = resources
  const [expanded, setExpanded] = useState(null)

  if (status === 'loading') return <LoadingSpinner />
  if (status === 'error') {
    return (
      <div className="container">
        <EmptyState
          title="Couldn't load the library"
          message="Check that public/data/resources.json exists and is valid JSON."
        />
      </div>
    )
  }

  const toggleExpand = (id) => setExpanded((prev) => (prev === id ? null : id))

  return (
    <div className="page-enter">
      <Hero
        siteTitle={siteTitle}
        tagline={siteTagline}
        totalResources={totalResources}
        categoryCount={categories.length}
      />

      {(author || institute) && (
        <div className="container">
          <div className="about-strip">
            <GraduationCap size={16} aria-hidden="true" />
            <span>
              Curated by <strong>{author}</strong>
              {institute && <> — {institute}</>}
            </span>
          </div>
        </div>
      )}

      <section className="container section">
        <div className="section__header">
          <h2>Browse by category</h2>
        </div>
        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {recentFiles.length > 0 && (
        <section className="container section">
          <div className="section__header">
            <h2><Clock size={18} aria-hidden="true" className="section__icon" /> Recently added</h2>
          </div>
          <div className="resource-list">
            {recentFiles.map((file) => (
              <ResourceCard key={`${file.folder}/${file.filename}`} file={file} />
            ))}
          </div>
        </section>
      )}

      <section className="container section section--last">
        <div className="section__header">
          <h2>All categories</h2>
          <p className="section__hint">Expand a category to preview its files</p>
        </div>
        <div className="accordion">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.icon)
            const isOpen = expanded === cat.id
            return (
              <div key={cat.id} className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="accordion-item__head"
                  onClick={() => toggleExpand(cat.id)}
                  aria-expanded={isOpen}
                >
                  <span className="accordion-item__label">
                    <Icon size={17} aria-hidden="true" />
                    {cat.name}
                    <span className="accordion-item__count">{cat.files.length}</span>
                  </span>
                  <ChevronDown size={17} className="accordion-item__chevron" aria-hidden="true" />
                </button>
                {isOpen && (
                  <div className="accordion-item__body">
                    <ul>
                      {cat.files.slice(0, 5).map((f) => (
                        <li key={f.filename}>{f.title}</li>
                      ))}
                    </ul>
                    <Link to={`/category/${cat.id}`} className="accordion-item__link">
                      View all in {cat.name} <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
