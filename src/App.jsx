import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import SearchPage from './pages/SearchPage'
import FavoritesPage from './pages/FavoritesPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import { ThemeProvider } from './context/ThemeContext'
import { useResources } from './hooks/useResources'

function ScrollRestoration() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  // Loaded once at the top level and passed down — every page reads
  // from this single source of truth, which itself comes straight
  // from public/data/resources.json.
  const resources = useResources()

  return (
    <ThemeProvider>
      <ScrollRestoration />
      <Navbar siteTitle={resources.siteTitle} />
      <main>
        <Routes>
          <Route path="/" element={<Home resources={resources} />} />
          <Route path="/category/:categoryId" element={<CategoryPage resources={resources} />} />
          <Route path="/search" element={<SearchPage resources={resources} />} />
          <Route path="/favorites" element={<FavoritesPage resources={resources} />} />
          <Route path="/about" element={<AboutPage resources={resources} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer siteTitle={resources.siteTitle} author={resources.author} institute={resources.institute} />
      <ScrollToTop />
    </ThemeProvider>
  )
}
