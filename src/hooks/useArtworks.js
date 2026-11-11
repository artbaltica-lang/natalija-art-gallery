import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const ARTWORK_COLUMNS = 'id, title, type, year, description, image_url, created_at'

export function useArtworks() {
  const [artworks, setArtworks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const requestVersion = useRef(0)

  const loadArtworks = useCallback(async () => {
    const version = ++requestVersion.current
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: queryError } = await supabase
        .from('artworks')
        .select(ARTWORK_COLUMNS)
        .order('created_at', { ascending: false })

      if (version !== requestVersion.current) return { error: null }
      if (queryError) {
        setError(queryError)
        return { error: queryError }
      }

      setArtworks(data ?? [])
      return { error: null }
    } catch (queryError) {
      if (version === requestVersion.current) setError(queryError)
      return { error: queryError }
    } finally {
      if (version === requestVersion.current) setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadArtworks()
    return () => { requestVersion.current += 1 }
  }, [loadArtworks])

  return { artworks, isLoading, error, retry: loadArtworks }
}
