import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { Compass } from 'lucide-react'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="container not-found page-enter">
      <EmptyState icon={Compass} title="Page not found" message="That page doesn't exist — let's get you back on track." />
      <Link to="/" className="not-found__link">← Back to home</Link>
    </div>
  )
}
