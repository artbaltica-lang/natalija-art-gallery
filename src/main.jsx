import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { artworks, languages, translations } from './content.js'
import './styles.css'

const LANGUAGE_STORAGE_KEY = 'natalija-language'
const pages = ['home', 'gallery', 'artwork', 'about', 'contact']

function getPage() {
  const [requestedPage = 'home', encodedId] = window.location.hash.replace(/^#\/?/, '').split('/')
  const page = pages.includes(requestedPage) ? requestedPage : 'home'
  return { page, id: page === 'artwork' && encodedId ? decodeURIComponent(encodedId) : undefined }
}

const artworkUrl = (id) => `#/artwork/${encodeURIComponent(id)}`

function ArtworkCard({ artwork, index, featured = false, language, copy }) {
  const url = artworkUrl(artwork.id)
  return (
    <article className={`art-card${featured ? ' art-card-featured' : ''} art-card-${index + 1}`}>
      <a className="art-image" href={url}>
        <img src={artwork.image} alt={artwork.alt[language]} loading="lazy" />
        <span className="image-index">0{index + 1}</span>
      </a>
      <div className="art-caption">
        <div>
          <span className="art-category">{copy.categories[artwork.category]}</span>
          <h3><a href={url}>{artwork.title[language]}</a></h3>
        </div>
        <a className="arrow-link" href={url} aria-label={`${copy.artwork.details}: ${artwork.title[language]}`}>↗</a>
      </div>
    </article>
  )
}

function HomePage({ language, copy }) {
  return (
    <main>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span />{copy.home.eyebrow}</p>
          <h1>{copy.home.title.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1>
          <p className="hero-intro">{copy.home.intro}</p>
          <a className="text-link" href="#/gallery">{copy.home.explore}<span>↗</span></a>
        </div>
        <figure className="hero-art">
          <img src={artworks[0].image} alt={artworks[0].alt[language]} />
          <figcaption><span>01 / 04</span>{copy.demo}</figcaption>
        </figure>
        <div className="hero-side-note"><span className="vertical-rule" /><span>{copy.home.note}</span></div>
        <div className="hero-stamp" aria-hidden="true"><span>ART</span><span>IS</span><span>ALIVE</span><i>✳</i></div>
      </section>
      <section className="selected-section wrap">
        <div className="section-heading">
          <div><p className="eyebrow">{copy.home.selected}</p><h2>{copy.gallery.title}</h2></div>
          <a className="text-link" href="#/gallery">{copy.home.viewAll}<span>↗</span></a>
        </div>
        <div className="art-grid home-grid">
          <ArtworkCard artwork={artworks[1]} index={1} featured language={language} copy={copy} />
          <ArtworkCard artwork={artworks[2]} index={2} language={language} copy={copy} />
          <ArtworkCard artwork={artworks[3]} index={3} language={language} copy={copy} />
        </div>
      </section>
      <div className="demo-banner">✳ &nbsp; {copy.demo.toUpperCase()} &nbsp; ✳</div>
    </main>
  )
}

function GalleryPage({ language, copy, selectedCategory, onCategoryChange }) {
  const categories = ['all', ...Object.keys(copy.categories)]
  const visibleArtworks = selectedCategory === 'all'
    ? artworks
    : artworks.filter((artwork) => artwork.category === selectedCategory)
  return (
    <main className="wrap page-main">
      <div className="page-intro">
        <p className="eyebrow">{copy.gallery.eyebrow}</p>
        <h1>{copy.gallery.title}</h1>
        <p>{copy.gallery.intro}</p>
      </div>
      <div className="filter-row" aria-label={copy.gallery.title}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-chip${selectedCategory === category ? ' selected' : ''}`}
            aria-pressed={selectedCategory === category}
            onClick={() => onCategoryChange(category)}
          >
            {category === 'all' ? copy.gallery.all : copy.categories[category]}
          </button>
        ))}
      </div>
      <div className="art-grid gallery-grid">
        {visibleArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={artworks.indexOf(artwork)} featured language={language} copy={copy} />
        ))}
      </div>
      <p className="demo-caption">{copy.demo}</p>
    </main>
  )
}

function ArtworkPage({ id, language, copy }) {
  const artwork = artworks.find((item) => item.id === id)
  if (!artwork) {
    return <main className="wrap page-main"><a className="text-link" href="#/gallery">← {copy.artwork.back}</a><h1>{copy.gallery.title}</h1></main>
  }
  return (
    <main className="wrap detail-page">
      <a className="back-link" href="#/gallery">← {copy.artwork.back}</a>
      <div className="detail-layout">
        <figure className="detail-image">
          <img src={artwork.image} alt={artwork.alt[language]} />
          <figcaption>{copy.artwork.sample}</figcaption>
        </figure>
        <section className="detail-copy">
          <p className="eyebrow">{copy.categories[artwork.category]} · {copy.artwork.sample}</p>
          <h1>{artwork.title[language]}</h1>
          <p className="detail-description">{artwork.description[language]}</p>
          <dl>
            <div><dt>{copy.artwork.technique}</dt><dd>{artwork.technique[language]}</dd></div>
            <div><dt>{copy.artwork.year}</dt><dd>{artwork.year}</dd></div>
          </dl>
          <span className="detail-number">№ 0{artworks.indexOf(artwork) + 1}</span>
        </section>
      </div>
    </main>
  )
}

function InfoPage({ page, copy }) {
  const content = copy[page]
  return (
    <main className="wrap info-page">
      <div className="info-decoration" aria-hidden="true">✳</div>
      <section>
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className="info-lead">{content.demo}</p>
        <p className="info-note">{content.note}</p>
      </section>
    </main>
  )
}

function LanguageSwitcher({ language, onChange, copy }) {
  return (
    <div className="language-switch" aria-label={copy.language}>
      {languages.map((code, index) => (
        <span className="language-option" key={code}>
          {index > 0 && <span aria-hidden="true">|</span>}
          <button
            className={language === code ? 'active' : ''}
            type="button"
            aria-pressed={language === code}
            onClick={() => onChange(code)}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}

function MobileNavigation({ open, page, copy, onNavigate }) {
  const links = ['home', 'gallery', 'about', 'contact']
  return (
    <nav id="site-navigation" className={`main-nav${open ? ' is-open' : ''}`} aria-label={copy.nav.home}>
      {links.map((item) => (
        <a
          key={item}
          href={`#/${item}`}
          className={page === item ? 'active' : ''}
          onClick={onNavigate}
        >
          {copy.nav[item]}
        </a>
      ))}
    </nav>
  )
}

function SiteHeader({ language, page, copy, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    closeMenu()
  }, [page])

  return (
    <header className="site-header">
      <a className="brand" href="#/home" aria-label={`${copy.brand} — ${copy.nav.home}`}>
        <span>{copy.brand}</span>
        <small>{copy.subtitle}</small>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={copy.menu}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? '×' : '+'}
      </button>
      <MobileNavigation open={menuOpen} page={page} copy={copy} onNavigate={closeMenu} />
      <LanguageSwitcher language={language} onChange={onLanguageChange} copy={copy} />
    </header>
  )
}

function SiteFooter({ copy }) {
  return (
    <footer className="site-footer wrap">
      <a className="brand footer-brand" href="#/home">
        <span>{copy.brand}</span>
        <small>{copy.subtitle}</small>
      </a>
      <span>{copy.footer}</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  )
}

function App() {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return languages.includes(savedLanguage) ? savedLanguage : 'en'
  })
  const [route, setRoute] = useState(getPage)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { page, id } = route
  const copy = translations[language]

  useEffect(() => {
    const updatePage = () => {
      setRoute(getPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', updatePage)
    if (!window.location.hash) window.location.hash = '#/home'
    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.title = `${copy.brand} — ${copy.subtitle}`
  }, [language, copy])

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage)
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
  }

  const artwork = page === 'artwork' ? artworks.find((item) => item.id === id) : undefined
  const title = artwork?.title[language]
    || (page === 'about' ? copy.about.title
      : page === 'contact' ? copy.contact.title
        : page === 'gallery' || page === 'artwork' ? copy.gallery.title
          : copy.brand)
  useEffect(() => {
    document.title = `${title} — ${copy.brand}`
  }, [title, copy.brand])

  let content
  if (page === 'home') content = <HomePage language={language} copy={copy} />
  else if (page === 'gallery') content = <GalleryPage language={language} copy={copy} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
  else if (page === 'artwork') content = <ArtworkPage id={id} language={language} copy={copy} />
  else content = <InfoPage page={page} copy={copy} />

  return (
    <>
      <SiteHeader
        language={language}
        page={page}
        copy={copy}
        onLanguageChange={changeLanguage}
      />
      {content}
      <SiteFooter copy={copy} />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <App />,
)
