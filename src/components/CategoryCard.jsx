import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { getCategoryIcon } from '../utils/categoryIcons'
import './CategoryCard.css'

export default function CategoryCard({ category }) {
  const Icon = getCategoryIcon(category.icon)
  const count = category.files.length
  const comingSoon = count === 0

  return (
    <Link to={`/category/${category.id}`} className={`category-card ${comingSoon ? 'category-card--soon' : ''}`}>
      <div className="category-card__icon">
        <Icon size={20} />
      </div>
      <div className="category-card__body">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
      <div className="category-card__footer">
        {comingSoon ? (
          <span className="category-card__badge">Coming soon</span>
        ) : (
          <span>{count} {count === 1 ? 'file' : 'files'}</span>
        )}
        <ArrowUpRight size={16} className="category-card__arrow" aria-hidden="true" />
      </div>
    </Link>
  )
}
