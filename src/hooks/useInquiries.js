import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const INQUIRY_COLUMNS = 'id, artwork_id, message, urgency, created_at, artwork:artworks(title)'

export function useInquiries(user) {
  const [inquiries, setInquiries] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean(user?.id))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const requestVersion = useRef(0)
  const userId = user?.id

  const loadInquiries = useCallback(async () => {
    const version = ++requestVersion.current
    if (!userId) {
      setInquiries([])
      setError(null)
      setIsLoading(false)
      return { error: null }
    }

    setIsLoading(true)
    setError(null)
    try {
      const { data, error: queryError } = await supabase
        .from('inquiries')
        .select(INQUIRY_COLUMNS)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (version !== requestVersion.current) return { error: null }
      if (queryError) {
        setError(queryError)
        return { error: queryError }
      }

      setInquiries(data ?? [])
      return { error: null }
    } catch (queryError) {
      if (version === requestVersion.current) setError(queryError)
      return { error: queryError }
    } finally {
      if (version === requestVersion.current) setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    void loadInquiries()
    return () => { requestVersion.current += 1 }
  }, [loadInquiries])

  const submitInquiry = useCallback(async ({ name, email, message, artworkId, urgency }) => {
    if (!userId) return { error: new Error('An authenticated user is required.') }

    setIsSubmitting(true)
    try {
      const { error: insertError } = await supabase.from('inquiries').insert({
        user_id: userId,
        name,
        email,
        message,
        artwork_id: artworkId || null,
        urgency,
      })

      if (insertError) return { error: insertError }
      await loadInquiries()
      return { error: null }
    } catch (insertError) {
      return { error: insertError }
    } finally {
      setIsSubmitting(false)
    }
  }, [loadInquiries, userId])

  return { inquiries, isLoading, isSubmitting, error, retry: loadInquiries, submitInquiry }
}
