import { useEffect, useRef, useState } from 'react'

function getLocalizedError(error, authCopy) {
  const code = String(error?.code ?? '').toLowerCase()
  const message = String(error?.message ?? '').toLowerCase()

  if (code.includes('invalid_credentials') || message.includes('invalid login credentials')) {
    return authCopy.invalidCredentials
  }
  if (code.includes('email_not_confirmed') || message.includes('email not confirmed')) {
    return authCopy.emailNotConfirmed
  }
  if (code.includes('weak_password') || message.includes('password should be')) {
    return authCopy.weakPassword
  }
  if (code.includes('rate_limit') || code.includes('over_') || message.includes('rate limit') || message.includes('too many requests')) {
    return authCopy.tooManyRequests
  }
  if (code === 'email_address_invalid') return authCopy.invalidEmail
  return authCopy.genericError
}

export function AuthPanel({ copy, isSubmitting, onAuthenticated, onClose, signIn, signUp }) {
  const authCopy = copy.auth
  const [mode, setMode] = useState('signIn')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState(null)
  const dialogRef = useRef(null)
  const emailInputRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    emailInputRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
    }
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return

    const focusable = [...dialogRef.current.querySelectorAll('button:not([disabled]), input:not([disabled])')]
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFeedback(null)

    const normalizedEmail = email.trim()
    if (!normalizedEmail || !password) {
      setFeedback({ type: 'error', text: authCopy.requiredFields })
      return
    }
    if (!emailInputRef.current?.checkValidity()) {
      setFeedback({ type: 'error', text: authCopy.invalidEmail })
      emailInputRef.current?.focus()
      return
    }

    const result = mode === 'signUp'
      ? await signUp(normalizedEmail, password)
      : await signIn(normalizedEmail, password)

    if (result.error) {
      setFeedback({ type: 'error', text: getLocalizedError(result.error, authCopy) })
      return
    }

    if (mode === 'signUp' && !result.data?.session) {
      setFeedback({ type: 'success', text: authCopy.confirmEmail })
      return
    }

    if (!result.data?.session) {
      setFeedback({ type: 'error', text: authCopy.genericError })
      return
    }

    onAuthenticated()
  }

  const switchMode = () => {
    setMode((currentMode) => currentMode === 'signIn' ? 'signUp' : 'signIn')
    setFeedback(null)
  }

  return (
    <div
      className="auth-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={dialogRef}
        id="auth-dialog"
        className="auth-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-dialog-title"
        aria-describedby="auth-dialog-hint"
        onKeyDown={handleKeyDown}
      >
        <button className="auth-close" type="button" aria-label={authCopy.close} onClick={onClose}>×</button>
        <p className="eyebrow">{copy.brand}</p>
        <h2 id="auth-dialog-title">{mode === 'signUp' ? authCopy.signUpTitle : authCopy.signInTitle}</h2>
        <p id="auth-dialog-hint" className="auth-hint">
          {mode === 'signUp' ? authCopy.signUpHint : authCopy.signInHint}
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="auth-email">{authCopy.email}</label>
          <input
            ref={emailInputRef}
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            required
            disabled={isSubmitting}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="auth-password">{authCopy.password}</label>
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete={mode === 'signUp' ? 'new-password' : 'current-password'}
            value={password}
            required
            disabled={isSubmitting}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? authCopy.loading : mode === 'signUp' ? authCopy.signUp : authCopy.signIn}
          </button>
        </form>

        {feedback && (
          <p className={`auth-feedback is-${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
            {feedback.text}
          </p>
        )}

        <button className="auth-mode-toggle" type="button" disabled={isSubmitting} onClick={switchMode}>
          {mode === 'signUp' ? authCopy.haveAccount : authCopy.noAccount}
        </button>
      </section>
    </div>
  )
}

export { getLocalizedError }
