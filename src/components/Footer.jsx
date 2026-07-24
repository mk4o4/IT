import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer({ siteTitle, author, institute }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">{siteTitle}</p>
          <p className="footer__note">A free, static library of study materials. No sign-in, no tracking.</p>
          {(author || institute) && (
            <p className="footer__credit">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="" className="footer__logo" />
              Maintained by {author}
              {institute && <> · {institute}</>}
            </p>
          )}
        </div>
        <nav className="footer__links" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
      <div className="container">
        <p className="footer__copy">Built with React + Vite · Hosted for free</p>
      </div>
    </footer>
  )
}
