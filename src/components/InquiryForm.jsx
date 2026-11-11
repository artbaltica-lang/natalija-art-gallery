import { useEffect, useState } from 'react'

export function InquiryForm({ copy, user, artworks, artworksLoading, artworksError, retryArtworks, isSubmitting, onSubmit }) {
  const text = copy.inquiries
  const [name, setName] = useState('')
  const [email, setEmail] = useState(user.email ?? '')
  const [message, setMessage] = useState('')
  const [artworkId, setArtworkId] = useState('')
  const [urgency, setUrgency] = useState('normal')
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    setEmail(user.email ?? '')
  }, [user.email])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFeedback(null)

    if (!name.trim()) return setFeedback({ type: 'error', message: text.nameRequired })
    if (!email.trim()) return setFeedback({ type: 'error', message: text.emailRequired })
    if (!event.currentTarget.elements.email.checkValidity()) {
      return setFeedback({ type: 'error', message: text.emailInvalid })
    }
    if (!message.trim()) return setFeedback({ type: 'error', message: text.messageRequired })

    const result = await onSubmit({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      artworkId,
      urgency,
    })

    if (result.error) {
      setFeedback({ type: 'error', message: text.submitError })
      return
    }

    setName('')
    setMessage('')
    setArtworkId('')
    setUrgency('normal')
    setFeedback({ type: 'success', message: text.submitSuccess })
  }

  return (
    <section className="inquiry-section" aria-labelledby="inquiry-form-title">
      <h2 id="inquiry-form-title">{text.formTitle}</h2>
      <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="inquiry-name">{text.name}</label>
        <input id="inquiry-name" name="name" autoComplete="name" value={name} required disabled={isSubmitting} onChange={(event) => setName(event.target.value)} />

        <label htmlFor="inquiry-email">{text.email}</label>
        <input id="inquiry-email" name="email" type="email" autoComplete="email" inputMode="email" value={email} required disabled={isSubmitting} onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor="inquiry-artwork">{text.artwork}</label>
        <select id="inquiry-artwork" name="artwork" value={artworkId} disabled={isSubmitting || artworksLoading} onChange={(event) => setArtworkId(event.target.value)}>
          <option value="">{artworksLoading ? text.loadingArtworks : text.generalInquiry}</option>
          {artworks.map((artwork) => (
            <option key={artwork.id} value={artwork.id}>
              {artwork.title} · {copy.categories[artwork.type] ?? artwork.type}
            </option>
          ))}
        </select>
        {artworksError && (
          <p className="inquiry-inline-error" role="alert">
            {text.artworksError} <button className="inquiry-retry" type="button" onClick={retryArtworks}>{text.retry}</button>
          </p>
        )}

        <label htmlFor="inquiry-urgency">{text.urgency}</label>
        <select id="inquiry-urgency" name="urgency" value={urgency} disabled={isSubmitting} onChange={(event) => setUrgency(event.target.value)}>
          <option value="normal">{text.normal}</option>
          <option value="high">{text.high}</option>
        </select>

        <label htmlFor="inquiry-message">{text.message}</label>
        <textarea id="inquiry-message" name="message" rows="5" value={message} required disabled={isSubmitting} onChange={(event) => setMessage(event.target.value)} />

        <button className="auth-submit inquiry-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? text.sending : text.send}
        </button>
      </form>
      {feedback && <p className={`inquiry-feedback is-${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.message}</p>}
    </section>
  )
}
