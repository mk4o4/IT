import { FileText, FolderOpen, GraduationCap } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import LoadingSpinner from '../components/LoadingSpinner'
import './AboutPage.css'

export default function AboutPage({ resources }) {
  const { status, siteTitle, aboutText, author, institute, totalResources, categories } = resources

  if (status === 'loading') return <LoadingSpinner />

  return (
    <div className="container page-enter about-page">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />

      <div className="about-page__header">
        <img
          src={`${import.meta.env.BASE_URL}logo.jpg`}
          alt=""
          className="about-page__logo"
        />
        <div>
          <h1>About {siteTitle}</h1>
          {institute && <p className="about-page__institute">{institute}</p>}
        </div>
      </div>

      {aboutText && <p className="about-page__text">{aboutText}</p>}

      <div className="about-page__stats">
        <div className="about-page__stat">
          <FileText size={18} aria-hidden="true" />
          <div>
            <strong>{totalResources}</strong>
            <span>resources</span>
          </div>
        </div>
        <div className="about-page__stat">
          <FolderOpen size={18} aria-hidden="true" />
          <div>
            <strong>{categories.length}</strong>
            <span>categories</span>
          </div>
        </div>
      </div>

      {author && (
        <div className="about-page__credit">
          <GraduationCap size={18} aria-hidden="true" />
          <span>Maintained by <strong>{author}</strong>{institute && <> — {institute}</>}</span>
        </div>
      )}
    </div>
  )
}
