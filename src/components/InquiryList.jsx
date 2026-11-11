export function InquiryList({ copy, language, inquiries, isLoading, error, onRetry }) {
  const text = copy.inquiries
  return (
    <section className="inquiry-section" aria-labelledby="inquiry-list-title">
      <h2 id="inquiry-list-title">{text.listTitle}</h2>
      {isLoading ? (
        <p className="inquiry-state" role="status">{text.loadingInquiries}</p>
      ) : error ? (
        <div className="inquiry-state inquiry-error" role="alert">
          <p>{text.inquiriesError}</p>
          <button className="auth-mode-toggle" type="button" onClick={onRetry}>{text.retry}</button>
        </div>
      ) : inquiries.length === 0 ? (
        <p className="inquiry-state">{text.empty}</p>
      ) : (
        <ul className="inquiry-list">
          {inquiries.map((inquiry) => {
            const artwork = Array.isArray(inquiry.artwork) ? inquiry.artwork[0] : inquiry.artwork
            const createdAt = new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(inquiry.created_at))
            return (
              <li className="inquiry-card" key={inquiry.id}>
                <div className="inquiry-card-heading">
                  <span className="inquiry-artwork">{artwork?.title ?? text.generalInquiry}</span>
                  <span className={`inquiry-urgency is-${inquiry.urgency}`}>{inquiry.urgency === 'high' ? text.high : text.normal}</span>
                </div>
                <p className="inquiry-message">{inquiry.message}</p>
                <p className="inquiry-meta">{createdAt}</p>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
