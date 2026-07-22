import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import './SearchBar.css'

// Controlled or uncontrolled search input. If `value`/`onChange` are given
// it behaves controlled (used on the Search page for instant filtering);
// otherwise it manages its own state and calls onSearch on submit (hero use).
export default function SearchBar({
  value,
  onChange,
  onSearch,
  large = false,
  autoFocus = false,
  placeholder = 'Search resources…',
}) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState('')
  const inputRef = useRef(null)
  const current = isControlled ? value : internal

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  const update = (v) => {
    if (isControlled) onChange?.(v)
    else setInternal(v)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(current)
  }

  const clear = () => {
    update('')
    inputRef.current?.focus()
  }

  return (
    <form
      className={`searchbar ${large ? 'searchbar--large' : ''}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <Search className="searchbar__icon" size={large ? 20 : 16} aria-hidden="true" />
      <input
        ref={inputRef}
        type="text"
        value={current}
        onChange={(e) => update(e.target.value)}
        placeholder={placeholder}
        aria-label="Search resources"
      />
      {current && (
        <button type="button" className="searchbar__clear" onClick={clear} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
      {onSearch && <button type="submit" className="visually-hidden">Search</button>}
    </form>
  )
}
