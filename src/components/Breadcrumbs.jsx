import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import './Breadcrumbs.css'

// items: [{ label, to }] — the last item is rendered as plain text (current page)
export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={item.label} className="breadcrumbs__item">
            {!isLast ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            {!isLast && <ChevronRight size={13} className="breadcrumbs__sep" aria-hidden="true" />}
          </span>
        )
      })}
    </nav>
  )
}
