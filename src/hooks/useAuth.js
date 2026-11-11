import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

export function useAuth() {
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initializationError, setInitializationError] = useState(null)

  useEffect(() => {
    let active = true
    let authEventVersion = 0

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      authEventVersion += 1
      setSession(nextSession ?? null)
      setInitializationError(null)
      setIsLoading(false)
    })

    const initialVersion = authEventVersion
    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!active) return
        if (authEventVersion === initialVersion) {
          setSession(data?.session ?? null)
          if (error) setInitializationError(error)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        if (!active) return
        if (authEventVersion === initialVersion) setInitializationError(error)
        setIsLoading(false)
      })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const runAuthRequest = useCallback(async (request) => {
    setIsSubmitting(true)
    try {
      return await request()
    } catch (error) {
      return { data: null, error }
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const signUp = useCallback((email, password) => runAuthRequest(() => (
    supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    })
  )), [runAuthRequest])

  const signIn = useCallback((email, password) => runAuthRequest(() => (
    supabase.auth.signInWithPassword({ email, password })
  )), [runAuthRequest])

  const signOut = useCallback(async () => {
    const result = await runAuthRequest(() => supabase.auth.signOut({ scope: 'local' }))
    if (!result.error) setSession(null)
    return result
  }, [runAuthRequest])

  return {
    session,
    user: session?.user ?? null,
    isLoading,
    isSubmitting,
    initializationError,
    signUp,
    signIn,
    signOut,
  }
}
