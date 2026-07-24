import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon, Search } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar({ siteTitle }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes via a link click
  const close = () => setOpen(false)

  const handleQuickSearch = (e) => {
    e.preventDefault()
    const q = e.target.elements.q.value.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
    close()
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} glass`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={close}>
          <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="" className="navbar__logo" />
          {siteTitle}
        </Link>

        <nav className="navbar__links navbar__links--desktop" aria-label="Primary">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/about">About</Link>
        </nav>

        <form className="navbar__quicksearch" onSubmit={handleQuickSearch} role="search">
          <Search size={15} aria-hidden="true" />
          <input name="q" type="text" placeholder="Quick search…" aria-label="Search resources" />
        </form>

        <div className="navbar__actions">
          <button
            className="navbar__icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="navbar__icon-btn navbar__menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="navbar__mobile glass">
          <form className="navbar__quicksearch navbar__quicksearch--mobile" onSubmit={handleQuickSearch} role="search">
            <Search size={15} aria-hidden="true" />
            <input name="q" type="text" placeholder="Search resources…" aria-label="Search resources" />
          </form>
          <Link to="/" onClick={close}>Home</Link>
          <Link to="/search" onClick={close}>Search</Link>
          <Link to="/favorites" onClick={close}>Favorites</Link>
          <Link to="/about" onClick={close}>About</Link>
        </div>
      )}
    </header>
  )
}
