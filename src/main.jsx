import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { languages, translations } from './content.js'
import './styles.css'

const LANGUAGE_STORAGE_KEY = 'natalija-language'
const pages = ['home', 'gallery', 'about', 'contact']

function getPage() {
  const page = window.location.hash.replace(/^#\/?/, '').split('/')[0]
  return pages.includes(page) ? page : 'home'
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
  const [page, setPage] = useState(getPage)
  const copy = translations[language]

  useEffect(() => {
    const updatePage = () => {
      setPage(getPage())
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

  return (
    <>
      <SiteHeader
        language={language}
        page={page}
        copy={copy}
        onLanguageChange={changeLanguage}
      />
      <main className="wrap info-page shell-content">
        <section>
          <p className="eyebrow">{copy.home.eyebrow}</p>
          <h1>{copy.home.title.split('\n').map((line, index) => (
            <span key={line}>{index > 0 && <br />}{line}</span>
          ))}</h1>
          <p className="info-lead">{copy.home.intro}</p>
        </section>
      </main>
      <SiteFooter copy={copy} />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <App />,
)
