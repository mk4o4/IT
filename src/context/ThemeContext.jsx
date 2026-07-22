import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ThemeContext = createContext(null)

// Dark mode is the default experience; visitors can switch to light
// and it's remembered locally. The accent color itself lives in CSS
// variables (see src/index.css) so it can be changed in one spot.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('archive:theme', 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
