import { useState, useEffect } from 'react'

// Generic hook to persist any piece of state to localStorage.
// Falls back gracefully if localStorage is unavailable (e.g. private mode).
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore write errors (storage full / disabled)
    }
  }, [key, value])

  return [value, setValue]
}
