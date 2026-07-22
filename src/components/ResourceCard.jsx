import { useState } from 'react'
import { FileText, Star, Link2, Check } from 'lucide-react'
import DownloadButton from './DownloadButton'
import { getFileUrl } from '../utils/paths'
import { useFavorites } from '../hooks/useFavorites'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import './ResourceCard.css'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function ResourceCard({ file }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addRecent } = useRecentlyViewed()
  const [copied, setCopied] = useState(false)
  const favorited = isFavorite(file.filename)
  const fileUrl = getFileUrl(file.folder, file.filename)

  const handleDownload = () => addRecent(file.filename)

  const handleCopyLink = async () => {
    const absoluteUrl = new URL(fileUrl, window.location.href).toString()
    try {
      await navigator.clipboard.writeText(absoluteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable — silently ignore, link is still visible via download.
    }
  }

  return (
    <article className="resource-card">
      <div className="resource-card__icon">
        <FileText size={20} />
      </div>

      <div className="resource-card__body">
        <div className="resource-card__title-row">
          <h4>{file.title}</h4>
          <button
            className={`resource-card__fav ${favorited ? 'is-active' : ''}`}
            onClick={() => toggleFavorite(file.filename)}
            aria-pressed={favorited}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            title={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star size={16} fill={favorited ? 'currentColor' : 'none'} />
          </button>
        </div>

        {file.description && <p className="resource-card__desc">{file.description}</p>}

        <div className="resource-card__meta">
          <span>{file.size}</span>
          <span className="resource-card__dot" aria-hidden="true">·</span>
          <span>{formatDate(file.date)}</span>
          {file.categoryName && (
            <>
              <span className="resource-card__dot" aria-hidden="true">·</span>
              <span>{file.categoryName}</span>
            </>
          )}
        </div>
      </div>

      <div className="resource-card__actions">
        <button
          className="resource-card__copy"
          onClick={handleCopyLink}
          aria-label="Copy link to this resource"
          title="Copy link"
        >
          {copied ? <Check size={15} /> : <Link2 size={15} />}
        </button>
        <DownloadButton href={fileUrl} filename={file.filename} onClick={handleDownload} />
      </div>
    </article>
  )
}
