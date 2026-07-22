import { SearchX } from 'lucide-react'
import './EmptyState.css'

export default function EmptyState({
  title = 'Nothing here yet',
  message = 'Try a different search term.',
  icon: Icon = SearchX,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Icon size={22} />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}
