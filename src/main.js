import { artworks, languages, translations } from './content.js';

const app = document.querySelector('#app');
const savedLanguage = localStorage.getItem('natalija-language');
let language = languages.includes(savedLanguage) ? savedLanguage : 'en';
let selectedCategory = 'all';
let mobileMenuOpen = false;

const t = () => translations[language];
const route = () => {
  const [page = 'home', encodedId] = location.hash.replace(/^#\/?/, '').split('/');
  const id = encodedId ? decodeURIComponent(encodedId) : undefined;
  return { page, id };
};
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const artworkUrl = (id) => `#/artwork/${encodeURIComponent(id)}`;

function header() {
  const copy = t();
  const current = route().page;
  const links = [['home', copy.nav.home], ['gallery', copy.nav.gallery], ['about', copy.nav.about], ['contact', copy.nav.contact]];
  return `<header class="site-header">
    <a class="brand" href="#/home" aria-label="${copy.brand} — ${copy.nav.home}"><span>${copy.brand}</span><small>${copy.subtitle}</small></a>
    <button class="menu-toggle" aria-label="${copy.menu}" aria-expanded="${mobileMenuOpen}" data-action="menu">${mobileMenuOpen ? '×' : '＋'}</button>
    <nav class="main-nav ${mobileMenuOpen ? 'is-open' : ''}" aria-label="${copy.nav.home}">${links.map(([id, label]) => `<a href="#/${id}" class="${current === id ? 'active' : ''}">${label}</a>`).join('')}</nav>
    <div class="language-switch" aria-label="${copy.language}">${languages.map((code) => `<button class="${language === code ? 'active' : ''}" data-language="${code}" aria-pressed="${language === code}">${code.toUpperCase()}</button>`).join('<span aria-hidden="true">|</span>')}</div>
  </header>`;
}

function card(artwork, index, featured = false) {
  const copy = t();
  return `<article class="art-card ${featured ? 'art-card-featured' : ''} art-card-${index + 1}">
    <a class="art-image" href="${artworkUrl(artwork.id)}"><img src="${artwork.image}" alt="${escapeHtml(artwork.alt[language])}" loading="lazy"><span class="image-index">0${index + 1}</span></a>
    <div class="art-caption"><div><span class="art-category">${copy.categories[artwork.category]}</span><h3><a href="${artworkUrl(artwork.id)}">${artwork.title[language]}</a></h3></div><a class="arrow-link" href="${artworkUrl(artwork.id)}" aria-label="${copy.artwork.details}: ${artwork.title[language]}">↗</a></div>
  </article>`;
}

function homePage() {
  const copy = t();
  return `<main>
    <section class="hero wrap"><div class="hero-copy"><p class="eyebrow"><span></span>${copy.home.eyebrow}</p><h1>${copy.home.title.split('\n').map(escapeHtml).join('<br>')}</h1><p class="hero-intro">${copy.home.intro}</p><a class="text-link" href="#/gallery">${copy.home.explore}<span>↗</span></a></div>
      <figure class="hero-art"><img src="${artworks[0].image}" alt="${escapeHtml(artworks[0].alt[language])}"><figcaption><span>01 / 04</span>${t().demo}</figcaption></figure>
      <div class="hero-side-note"><span class="vertical-rule"></span><span>${copy.home.note}</span></div>
      <div class="hero-stamp" aria-hidden="true"><span>ART</span><span>IS</span><span>ALIVE</span><i>✳</i></div>
    </section>
    <section class="selected-section wrap"><div class="section-heading"><div><p class="eyebrow">${copy.home.selected}</p><h2>${copy.gallery.title}</h2></div><a class="text-link" href="#/gallery">${copy.home.viewAll}<span>↗</span></a></div><div class="art-grid home-grid">${card(artworks[1], 1, true)}${card(artworks[2], 2)}${card(artworks[3], 3)}</div></section>
    <div class="demo-banner">✳ &nbsp; ${copy.demo.toUpperCase()} &nbsp; ✳</div>
  </main>`;
}

function galleryPage() {
  const copy = t();
  const categories = ['all', ...Object.keys(copy.categories)];
  const visible = selectedCategory === 'all' ? artworks : artworks.filter((artwork) => artwork.category === selectedCategory);
  return `<main class="wrap page-main"><div class="page-intro"><p class="eyebrow">${copy.gallery.eyebrow}</p><h1>${copy.gallery.title}</h1><p>${copy.gallery.intro}</p></div>
    <div class="filter-row" aria-label="${copy.gallery.title}">${categories.map((category) => `<button class="filter-chip ${selectedCategory === category ? 'selected' : ''}" data-category="${category}">${category === 'all' ? copy.gallery.all : copy.categories[category]}</button>`).join('')}</div>
    <div class="art-grid gallery-grid">${visible.map((artwork) => card(artwork, artworks.indexOf(artwork), true)).join('')}</div>
    <p class="demo-caption">${copy.demo}</p>
  </main>`;
}

function artworkPage(id) {
  const copy = t();
  const artwork = artworks.find((item) => item.id === id);
  if (!artwork) return `<main class="wrap page-main"><a class="text-link" href="#/gallery">← ${copy.artwork.back}</a><h1>${copy.gallery.title}</h1></main>`;
  return `<main class="wrap detail-page"><a class="back-link" href="#/gallery">← ${copy.artwork.back}</a><div class="detail-layout"><figure class="detail-image"><img src="${artwork.image}" alt="${escapeHtml(artwork.alt[language])}"><figcaption>${copy.artwork.sample}</figcaption></figure><section class="detail-copy"><p class="eyebrow">${copy.categories[artwork.category]} · ${copy.artwork.sample}</p><h1>${artwork.title[language]}</h1><p class="detail-description">${artwork.description[language]}</p><dl><div><dt>${copy.artwork.technique}</dt><dd>${artwork.technique[language]}</dd></div><div><dt>${copy.artwork.year}</dt><dd>${artwork.year}</dd></div></dl><span class="detail-number">№ 0${artworks.indexOf(artwork) + 1}</span></section></div></main>`;
}

function infoPage(page) {
  const content = t()[page];
  return `<main class="wrap info-page"><div class="info-decoration" aria-hidden="true">✳</div><section><p class="eyebrow">${content.eyebrow}</p><h1>${content.title}</h1><p class="info-lead">${content.demo}</p><p class="info-note">${content.note}</p></section></main>`;
}

function footer() {
  return `<footer class="site-footer wrap"><a class="brand footer-brand" href="#/home"><span>${t().brand}</span><small>${t().subtitle}</small></a><span>${t().footer}</span><span>© ${new Date().getFullYear()}</span></footer>`;
}

function render() {
  const { page, id } = route();
  const content = page === 'home' ? homePage() : page === 'gallery' ? galleryPage() : page === 'artwork' ? artworkPage(id) : ['about', 'contact'].includes(page) ? infoPage(page) : homePage();
  app.innerHTML = `${header()}${content}${footer()}`;
  document.documentElement.lang = language;
  document.title = `${page === 'artwork' ? artworks.find((item) => item.id === id)?.title[language] || t().gallery.title : page === 'about' ? t().about.title : page === 'contact' ? t().contact.title : page === 'gallery' ? t().gallery.title : t().brand} — ${t().brand}`;
}

app.addEventListener('click', (event) => {
  const langButton = event.target.closest('[data-language]');
  if (langButton) {
    language = langButton.dataset.language;
    localStorage.setItem('natalija-language', language);
    render();
    return;
  }
  const categoryButton = event.target.closest('[data-category]');
  if (categoryButton) {
    selectedCategory = categoryButton.dataset.category;
    render();
    return;
  }
  if (event.target.closest('[data-action="menu"]')) {
    mobileMenuOpen = !mobileMenuOpen;
    render();
  }
});

window.addEventListener('hashchange', () => {
  mobileMenuOpen = false;
  window.scrollTo(0, 0);
  render();
});

if (!location.hash) location.hash = '#/home';
render();
