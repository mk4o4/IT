import { useEffect, useState } from 'react'

// Loads /data/resources.json once and exposes it along with
// derived helpers (flattened file list, total counts, etc).
// This is the ONLY place that needs to know about the JSON shape.
export function useResources() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let cancelled = false
    fetch(`${import.meta.env.BASE_URL}data/resources.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load resources.json')
        return res.json()
      })
      .then((json) => {
        if (!cancelled) {
          setData(json)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const categories = data?.categories ?? []

  // Every file, flattened, with its parent category attached —
  // used by search and the "recent uploads" section.
  const allFiles = categories.flatMap((cat) =>
    cat.files.map((file) => ({
      ...file,
      categoryId: cat.id,
      categoryName: cat.name,
      folder: cat.folder,
    }))
  )

  const totalResources = allFiles.length

  const recentFiles = [...allFiles]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)

  return {
    status,
    siteTitle: data?.siteTitle ?? 'Archive',
    siteTagline: data?.siteTagline ?? '',
    author: data?.author ?? '',
    institute: data?.institute ?? '',
    aboutText: data?.aboutText ?? '',
    categories,
    allFiles,
    totalResources,
    recentFiles,
  }
}
