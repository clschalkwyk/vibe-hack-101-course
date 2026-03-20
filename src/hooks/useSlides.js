import { useState, useEffect, useCallback } from 'react'
import { parseSlide } from '../utils/markdown.js'

export function useSlides() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadSlides() {
      try {
        setLoading(true)
        // Load the manifest
        const manifestRes = await fetch('/slides/slides.json')
        if (!manifestRes.ok) throw new Error('Could not load slides.json manifest')
        const filenames = await manifestRes.json()

        // Load each slide file
        const loaded = await Promise.all(
          filenames.map(async (filename, index) => {
            const res = await fetch(`/slides/${filename}`)
            if (!res.ok) throw new Error(`Could not load slide: ${filename}`)
            const raw = await res.text()
            const parsed = parseSlide(raw)
            return {
              id: index,
              filename,
              ...parsed,
            }
          })
        )

        setSlides(loaded)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadSlides()
  }, [])

  return { slides, loading, error }
}
